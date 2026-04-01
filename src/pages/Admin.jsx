import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, RefreshCw, ExternalLink, Lock, Loader2, Eye, EyeOff, Trash2 } from 'lucide-react';
const STATUS_LABELS = {
  neu: { label: 'Neu', color: 'bg-blue-100 text-blue-800' },
  in_bearbeitung: { label: 'In Bearbeitung', color: 'bg-yellow-100 text-yellow-800' },
  angebot_gesendet: { label: 'Angebot gesendet', color: 'bg-purple-100 text-purple-800' },
  abgeschlossen: { label: 'Abgeschlossen', color: 'bg-green-100 text-green-800' },
};

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { a, b, answer: a + b };
}

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (parseInt(captchaInput) !== captcha.answer) {
      setError('Captcha-Antwort ist falsch.');
      refreshCaptcha();
      return;
    }

    setLoading(true);
    try {
      const res = await base44.functions.invoke('adminLogin', { username, password });
      if (res.data?.success) {
        onLogin();
      } else {
        setError('Ungültige Zugangsdaten.');
        refreshCaptcha();
      }
    } catch {
      setError('Ungültige Zugangsdaten.');
      refreshCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/40">
      <div className="bg-card border border-border rounded-2xl p-10 max-w-sm w-full mx-4 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Backend-Zugang</h1>
          <p className="text-muted-foreground text-sm">Nur für autorisierte Administratoren</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Benutzername</Label>
            <Input
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Passwort</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="captcha">
              Sicherheitsfrage: Wie viel ist {captcha.a} + {captcha.b}?
            </Label>
            <Input
              id="captcha"
              type="number"
              value={captchaInput}
              onChange={e => setCaptchaInput(e.target.value)}
              placeholder="Ergebnis eingeben"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button type="submit" disabled={loading} className="w-full rounded-xl mt-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Anmelden
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('all');

  const [loggedIn, setLoggedIn] = useState(false);

  const { data: inquiries = [], isLoading, refetch } = useQuery({
    queryKey: ['inquiries'],
    queryFn: () => base44.entities.TowelInquiry.list('-created_date', 100),
    enabled: loggedIn,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.TowelInquiry.update(id, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inquiries'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.TowelInquiry.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inquiries'] }),
  });

  const handleLogin = () => {
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const filtered = filter === 'all' ? inquiries : inquiries.filter(i => i.status === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <h1 className="font-heading text-xl font-bold text-foreground">Admin</h1>
          <span className="text-sm text-muted-foreground">{inquiries.length} Anfragen</span>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Aktualisieren
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <>
            {/* Filter */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {['all', 'neu', 'in_bearbeitung', 'angebot_gesendet', 'abgeschlossen'].map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    filter === s
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  {s === 'all' ? 'Alle' : STATUS_LABELS[s]?.label}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">Keine Anfragen gefunden.</div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      {['Datum', 'Firma', 'Kontakt', 'Konfiguration', 'Stückzahl', 'Logo', 'Status', ''].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filtered.map((inq) => (
                      <tr key={inq.id} className="bg-card hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                          {new Date(inq.created_date).toLocaleDateString('de-DE')}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">{inq.company_name}</div>
                          <div className="text-xs text-muted-foreground">{inq.contact_name}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-xs text-muted-foreground">{inq.contact_email}</div>
                          {inq.contact_phone && <div className="text-xs text-muted-foreground">{inq.contact_phone}</div>}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">{inq.finishing_variant}</div>
                          <div className="text-xs text-muted-foreground">{inq.towel_size} · {inq.towel_color}</div>
                        </td>
                        <td className="px-4 py-3 text-center font-medium">{inq.quantity}</td>
                        <td className="px-4 py-3">
                          {inq.logo_url ? (
                            <a href={inq.logo_url} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1 text-primary hover:underline text-xs">
                              <ExternalLink className="w-3 h-3" /> Ansehen
                            </a>
                          ) : (
                            <span className="text-muted-foreground text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Select
                            value={inq.status}
                            onValueChange={(val) => updateMutation.mutate({ id: inq.id, status: val })}
                          >
                            <SelectTrigger className="h-8 text-xs w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(STATUS_LABELS).map(([val, { label }]) => (
                                <SelectItem key={val} value={val}>{label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => {
                              if (window.confirm(`Anfrage von "${inq.company_name}" wirklich löschen?`)) {
                                deleteMutation.mutate(inq.id);
                              }
                            }}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            title="Löschen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </>
      </div>
    </div>
  );
}