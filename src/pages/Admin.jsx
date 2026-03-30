import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, RefreshCw, ExternalLink } from 'lucide-react';

const STATUS_LABELS = {
  neu: { label: 'Neu', color: 'bg-blue-100 text-blue-800' },
  in_bearbeitung: { label: 'In Bearbeitung', color: 'bg-yellow-100 text-yellow-800' },
  angebot_gesendet: { label: 'Angebot gesendet', color: 'bg-purple-100 text-purple-800' },
  abgeschlossen: { label: 'Abgeschlossen', color: 'bg-green-100 text-green-800' },
};

export default function Admin() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('all');

  const { data: inquiries = [], isLoading, refetch } = useQuery({
    queryKey: ['inquiries'],
    queryFn: () => base44.entities.TowelInquiry.list('-created_date', 100),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.TowelInquiry.update(id, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inquiries'] }),
  });

  const filtered = filter === 'all' ? inquiries : inquiries.filter(i => i.status === filter);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <h1 className="font-heading text-xl font-bold text-foreground">Anfragen-Verwaltung</h1>
          <span className="text-sm text-muted-foreground">{inquiries.length} gesamt</span>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Aktualisieren
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
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
                  {['Datum', 'Firma', 'Kontakt', 'Konfiguration', 'Stückzahl', 'Logo', 'Status'].map(h => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}