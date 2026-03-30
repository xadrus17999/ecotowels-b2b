import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const { username, password } = await req.json();

  const expectedUsername = Deno.env.get('ADMIN_USERNAME');
  const expectedPassword = Deno.env.get('ADMIN_PASSWORD');

  if (!username || !password) {
    return Response.json({ error: 'Fehlende Zugangsdaten' }, { status: 400 });
  }

  if (username === expectedUsername && password === expectedPassword) {
    return Response.json({ success: true, token: btoa(`${username}:${Date.now()}`) });
  }

  return Response.json({ error: 'Ungültige Zugangsdaten' }, { status: 401 });
});