import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Plus, Trash2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const STORAGE_KEY = 'admin_shop_config';

const VARIANTS = ['Bestickt', 'HochTief Webung', 'Bordür Einwebung', 'Bedruckt'];

const DEFAULT_CONFIG = {
  // Staffelpreise: { variantName: [ { from: number, price: number } ] }
  staffelpreise: {
    'Bestickt':         [{ from: 50, price: 8.90 }, { from: 100, price: 7.30 }, { from: 250, price: 6.50 }, { from: 500, price: 5.78 }, { from: 1000, price: 5.16 }, { from: 2500, price: 4.63 }, { from: 5000, price: 4.83 }, { from: 10000, price: 3.74 }],
    'HochTief Webung':  [{ from: 50, price: 10.50 }, { from: 100, price: 8.61 }, { from: 250, price: 7.67 }, { from: 500, price: 6.83 }, { from: 1000, price: 6.09 }, { from: 2500, price: 5.46 }, { from: 5000, price: 4.84 }, { from: 10000, price: 4.41 }],
    'Bordür Einwebung': [{ from: 50, price: 9.70 }, { from: 100, price: 7.95 }, { from: 250, price: 7.08 }, { from: 500, price: 6.31 }, { from: 1000, price: 5.63 }, { from: 2500, price: 5.04 }, { from: 5000, price: 4.47 }, { from: 10000, price: 4.07 }],
    'Bedruckt':         [{ from: 50, price: 7.50 }, { from: 100, price: 6.15 }, { from: 250, price: 5.48 }, { from: 500, price: 4.88 }, { from: 1000, price: 4.35 }, { from: 2500, price: 3.90 }, { from: 5000, price: 3.45 }, { from: 10000, price: 3.15 }],
  },
  // Größen: array of strings
  groessen: [
    '30x30 cm', '30x50 cm',
    '50x90 cm', '50x100 cm',
    '70x130 cm', '70x140 cm',
    '100x150 cm', '100x160 cm',
    '90x180 cm', '100x200 cm',
  ],
  // Farben: array of { name, class }
  farben: [
    { name: 'Naturweiß',  class: 'bg-amber-50 border border-border' },
    { name: 'Cremeweiß',  class: 'bg-yellow-50 border border-border' },
    { name: 'Hellgrau',   class: 'bg-gray-200' },
    { name: 'Anthrazit',  class: 'bg-gray-700' },
    { name: 'Schwarz',    class: 'bg-black' },
    { name: 'Sandbeige',  class: 'bg-amber-200' },
    { name: 'Terrakotta', class: 'bg-orange-600' },
    { name: 'Karamel',    class: 'bg-amber-600' },
    { name: 'Bordeaux',   class: 'bg-red-900' },
    { name: 'Schokolade', class: 'bg-yellow-900' },
    { name: 'Salbeigrün', class: 'bg-emerald-300' },
    { name: 'Waldgrün',   class: 'bg-green-700' },
    { name: 'Mintgrün',   class: 'bg-teal-200' },
    { name: 'Dunkelblau', class: 'bg-blue-900' },
    { name: 'Mittelblau', class: 'bg-blue-600' },
    { name: 'Hellblau',   class: 'bg-blue-200' },
    { name: 'Lila',       class: 'bg-purple-600' },
  ],
};

export function loadShopConfig() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_CONFIG;
}

function saveShopConfig(cfg) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
}

// ─── Staffelpreise Section ────────────────────────────────────────────────────
function StaffelpreiseSection({ staffelpreise, onChange }) {
  const [activeVariant, setActiveVariant] = useState(VARIANTS[0]);
  const tiers = staffelpreise[activeVariant] || [];

  const updateTier = (i, field, value) => {
    const updated = tiers.map((t, idx) => idx === i ? { ...t, [field]: value } : t);
    onChange({ ...staffelpreise, [activeVariant]: updated });
  };

  const addTier = () => {
    onChange({ ...staffelpreise, [activeVariant]: [...tiers, { from: '', price: '' }] });
  };

  const removeTier = (i) => {
    onChange({ ...staffelpreise, [activeVariant]: tiers.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <h3 className="font-heading font-semibold text-foreground text-lg">Staffelpreise (€ pro Stück)</h3>
      <p className="text-xs text-muted-foreground">Preis pro Stück ab der angegebenen Menge. Gilt für alle Größen und Farben dieser Veredelungs-Art.</p>

      {/* Variant tabs */}
      <div className="flex flex-wrap gap-2">
        {VARIANTS.map(v => (
          <button
            key={v}
            onClick={() => setActiveVariant(v)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              activeVariant === v
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground hover:border-primary/40'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Tiers table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="pb-2 text-xs text-muted-foreground uppercase tracking-wide font-semibold pr-4">Ab Menge (Stk.)</th>
              <th className="pb-2 text-xs text-muted-foreground uppercase tracking-wide font-semibold pr-4">Preis / Stk. (€)</th>
              <th className="pb-2 w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tiers.map((tier, i) => (
              <tr key={i}>
                <td className="py-2 pr-4">
                  <Input
                    type="text"
                    value={tier.from}
                    onChange={e => updateTier(i, 'from', e.target.value)}
                    className="w-36 h-9 text-sm"
                    placeholder="z.B. 50"
                  />
                </td>
                <td className="py-2 pr-4">
                  <div className="relative w-36">
                    <Input
                      type="text"
                      value={tier.price}
                      onChange={e => updateTier(i, 'price', e.target.value)}
                      className="h-9 text-sm pr-6"
                      placeholder="z.B. 8.90"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">€</span>
                  </div>
                </td>
                <td className="py-2">
                  <button onClick={() => removeTier(i)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button variant="outline" size="sm" onClick={addTier} className="gap-2">
        <Plus className="w-4 h-4" /> Staffel hinzufügen
      </Button>
    </div>
  );
}

// ─── Größen Section ───────────────────────────────────────────────────────────
function GroessenSection({ groessen, onChange }) {
  const add = () => onChange([...groessen, '']);
  const update = (i, val) => onChange(groessen.map((g, idx) => idx === i ? val : g));
  const remove = (i) => onChange(groessen.filter((_, idx) => idx !== i));

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <h3 className="font-heading font-semibold text-foreground text-lg">Verfügbare Größen</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {groessen.map((g, i) => (
          <div key={i} className="flex items-center gap-1">
            <Input
              value={g}
              onChange={e => update(i, e.target.value)}
              className="h-9 text-sm"
              placeholder="z.B. 50x100 cm"
            />
            <button onClick={() => remove(i)} className="text-muted-foreground hover:text-destructive shrink-0 p-1">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={add} className="gap-2">
        <Plus className="w-4 h-4" /> Größe hinzufügen
      </Button>
    </div>
  );
}

// ─── Farben Section ───────────────────────────────────────────────────────────
function FarbenSection({ farben, onChange }) {
  const add = () => onChange([...farben, { name: '', class: '' }]);
  const update = (i, field, val) => onChange(farben.map((f, idx) => idx === i ? { ...f, [field]: val } : f));
  const remove = (i) => onChange(farben.filter((_, idx) => idx !== i));

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <h3 className="font-heading font-semibold text-foreground text-lg">Verfügbare Farben</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="pb-2 text-xs text-muted-foreground uppercase tracking-wide font-semibold pr-4">Farbname</th>
              <th className="pb-2 text-xs text-muted-foreground uppercase tracking-wide font-semibold pr-4">Tailwind-Klasse (für Swatch)</th>
              <th className="pb-2 text-xs text-muted-foreground uppercase tracking-wide font-semibold pr-4">Vorschau</th>
              <th className="pb-2 w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {farben.map((f, i) => (
              <tr key={i}>
                <td className="py-2 pr-4">
                  <Input value={f.name} onChange={e => update(i, 'name', e.target.value)} className="h-9 text-sm w-36" placeholder="z.B. Naturweiß" />
                </td>
                <td className="py-2 pr-4">
                  <Input value={f.class} onChange={e => update(i, 'class', e.target.value)} className="h-9 text-sm w-52 font-mono text-xs" placeholder="z.B. bg-amber-50 border border-border" />
                </td>
                <td className="py-2 pr-4">
                  <div className={`w-7 h-7 rounded-full ${f.class}`} />
                </td>
                <td className="py-2">
                  <button onClick={() => remove(i)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button variant="outline" size="sm" onClick={add} className="gap-2">
        <Plus className="w-4 h-4" /> Farbe hinzufügen
      </Button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ShopConfig() {
  const [config, setConfig] = useState(loadShopConfig);

  const handleSave = () => {
    saveShopConfig(config);
    toast.success('Konfiguration gespeichert.');
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    saveShopConfig(DEFAULT_CONFIG);
    toast.success('Standardwerte wiederhergestellt.');
  };

  return (
    <div className="space-y-6">
      <StaffelpreiseSection
        staffelpreise={config.staffelpreise}
        onChange={sp => setConfig(c => ({ ...c, staffelpreise: sp }))}
      />
      <GroessenSection
        groessen={config.groessen}
        onChange={g => setConfig(c => ({ ...c, groessen: g }))}
      />
      <FarbenSection
        farben={config.farben}
        onChange={f => setConfig(c => ({ ...c, farben: f }))}
      />

      <div className="flex gap-3 pt-2">
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" /> Speichern
        </Button>
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw className="w-4 h-4" /> Zurücksetzen
        </Button>
      </div>
    </div>
  );
}