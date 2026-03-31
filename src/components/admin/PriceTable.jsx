import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

const VARIANTS = ['Bestickt', 'HochTief Webung', 'Bordür Einwebung', 'Bedruckt'];

const SIZES = [
  '30x30 cm', '30x50 cm',
  '50x90 cm', '50x100 cm',
  '70x130 cm', '70x140 cm',
  '100x150 cm', '100x160 cm',
  '90x180 cm', '100x200 cm',
];

const COLORS = [
  'Naturweiß', 'Cremeweiß', 'Hellgrau', 'Anthrazit', 'Schwarz',
  'Sandbeige', 'Terrakotta', 'Karamel', 'Bordeaux', 'Schokolade',
  'Salbeigrün', 'Waldgrün', 'Mintgrün',
  'Dunkelblau', 'Mittelblau', 'Hellblau', 'Lila',
];

const STORAGE_KEY = 'admin_price_table';

export function loadPriceTable() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
}

function savePriceTable(table) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(table));
}

function makeKey(variant, size, color) {
  return `${variant}__${size}__${color}`;
}

export default function PriceTable() {
  const [table, setTable] = useState(loadPriceTable);
  const [filterVariant, setFilterVariant] = useState(VARIANTS[0]);
  const [filterSize, setFilterSize] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [search, setSearch] = useState('');

  const handleChange = (variant, size, color, value) => {
    const key = makeKey(variant, size, color);
    setTable(t => ({ ...t, [key]: value }));
  };

  const handleSave = () => {
    savePriceTable(table);
    toast.success('Preistabelle gespeichert.');
  };

  // Build rows to display
  const rows = [];
  VARIANTS.forEach(variant => {
    SIZES.forEach(size => {
      COLORS.forEach(color => {
        rows.push({ variant, size, color, key: makeKey(variant, size, color) });
      });
    });
  });

  const filtered = rows.filter(r => {
    if (filterVariant && r.variant !== filterVariant) return false;
    if (filterSize && r.size !== filterSize) return false;
    if (filterColor && r.color !== filterColor) return false;
    if (search && ![r.variant, r.size, r.color].some(v => v.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Veredelung</label>
          <select
            className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground"
            value={filterVariant}
            onChange={e => setFilterVariant(e.target.value)}
          >
            <option value="">Alle</option>
            {VARIANTS.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Größe</label>
          <select
            className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground"
            value={filterSize}
            onChange={e => setFilterSize(e.target.value)}
          >
            <option value="">Alle</option>
            {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Farbe</label>
          <select
            className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground"
            value={filterColor}
            onChange={e => setFilterColor(e.target.value)}
          >
            <option value="">Alle</option>
            {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-40">
          <label className="block text-xs text-muted-foreground mb-1">Suche</label>
          <Input
            placeholder="Suchbegriff..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="text-sm"
          />
        </div>
        <Button onClick={handleSave} className="gap-2 shrink-0">
          <Save className="w-4 h-4" />
          Speichern
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} Kombinationen angezeigt</p>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Veredelung</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Größe</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Farbe</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Preis (€/Stk.)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(({ variant, size, color, key }) => (
              <tr key={key} className="bg-card hover:bg-muted/30 transition-colors">
                <td className="px-4 py-2 text-foreground whitespace-nowrap">{variant}</td>
                <td className="px-4 py-2 text-foreground whitespace-nowrap">{size}</td>
                <td className="px-4 py-2 text-foreground whitespace-nowrap">{color}</td>
                <td className="px-4 py-2">
                  <div className="relative w-32">
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="—"
                      value={table[key] ?? ''}
                      onChange={e => handleChange(variant, size, color, e.target.value)}
                      className="h-8 text-sm pr-6"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">€</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}