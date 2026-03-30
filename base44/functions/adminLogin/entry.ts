import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

// In-memory rate limiter: ip -> { count, firstAttempt }
const attempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const BASE_DELAY_MS = 1500; // artificial delay per attempt

Deno.serve(async (req) => {
  createClientFromRequest(req); // initialize sdk (required)

  // Extract IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  // Artificial base delay to slow brute-force
  await new Promise(r => setTimeout(r, BASE_DELAY_MS));

  const now = Date.now();
  const entry = attempts.get(ip) || { count: 0, firstAttempt: now };

  // Reset window if expired
  if (now - entry.firstAttempt > WINDOW_MS) {
    entry.count = 0;
    entry.firstAttempt = now;
  }

  if (entry.count >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - entry.firstAttempt)) / 1000);
    return Response.json(
      { error: `Zu viele Versuche. Bitte warten Sie ${retryAfter} Sekunden.` },
      { status: 429 }
    );
  }

  const body = await req.json();
  const { username, password } = body;

  if (!username || !password) {
    return Response.json({ error: 'Fehlende Zugangsdaten' }, { status: 400 });
  }

  const expectedUsername = Deno.env.get('ADMIN_USERNAME');
  const expectedPassword = Deno.env.get('ADMIN_PASSWORD');

  if (username === expectedUsername && password === expectedPassword) {
    // Reset on success
    attempts.delete(ip);
    return Response.json({ success: true });
  }

  // Increment failed attempts
  entry.count += 1;
  attempts.set(ip, entry);

  // Extra delay per failed attempt (exponential feel)
  await new Promise(r => setTimeout(r, entry.count * 500));

  return Response.json({ error: 'Ungültige Zugangsdaten' }, { status: 401 });
});