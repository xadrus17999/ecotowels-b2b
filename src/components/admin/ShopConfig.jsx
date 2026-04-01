import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Plus, Trash2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const STORAGE_KEY = 'admin_shop_config';

const VARIANTS = ['Bestickt', 'HochTief Webung', 'Bordür Einwebung', 'Bedruckt'];
// These variants use a free color picker on the frontend — no color config needed in admin
const FREE_COLOR_VARIANTS = ['HochTief Webung', 'Bordür Einwebung', 'Bedruckt'];

const DEFAULT_CONFIG = {
  staffelpreise: {
    'Bestickt': [
      { from: 50,  price: 8.90, color: 'Naturweiß',  colorHex: '#fdf8ef' },
      { from: 50,  price: 8.90, color: 'Cremeweiß',  colorHex: '#fefce8' },
      { from: 50,  price: 8.90, color: 'Hellgrau',   colorHex: '#e5e7eb' },
      { from: 50,  price: 8.90, color: 'Anthrazit',  colorHex: '#374151' },
      { from: 50,  price: 8.90, color: 'Schwarz',    colorHex: '#000000' },
      { from: 100, price: 7.30, color: 'Sandbeige',  colorHex: '#fcd34d' },
      { from: 100, price: 7.30, color: 'Terrakotta', colorHex: '#ea580c' },
      { from: 100, price: 7.30, color: 'Karamel',    colorHex: '#d97706' },
      { from: 100, price: 7.30, color: 'Bordeaux',   colorHex: '#7f1d1d' },
      { from: 100, price: 7.30, color: 'Schokolade', colorHex: '#78350f' },
      { from: 100, price: 7.30, color: 'Salbeigrün', colorHex: '#6ee7b7' },
      { from: 100, price: 7.30, color: 'Waldgrün',   colorHex: '#15803d' },
      { from: 100, price: 7.30, color: 'Mintgrün',   colorHex: '#99f6e4' },
      { from: 100, price: 7.30, color: 'Dunkelblau', colorHex: '#1e3a8a' },
      { from: 100, price: 7.30, color: 'Mittelblau', colorHex: '#2563eb' },
      { from: 100, price: 7.30, color: 'Hellblau',   colorHex: '#bfdbfe' },
      { from: 100, price: 7.30, color: 'Lila',       colorHex: '#9333ea' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Naturweiß',  colorHex: '#fdf8ef' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Cremeweiß',  colorHex: '#fefce8' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Hellgrau',   colorHex: '#e5e7eb' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Anthrazit',  colorHex: '#374151' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Schwarz',    colorHex: '#000000' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Sandbeige',  colorHex: '#fcd34d' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Terrakotta', colorHex: '#ea580c' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Karamel',    colorHex: '#d97706' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Bordeaux',   colorHex: '#7f1d1d' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Schokolade', colorHex: '#78350f' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Salbeigrün', colorHex: '#6ee7b7' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Waldgrün',   colorHex: '#15803d' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Mintgrün',   colorHex: '#99f6e4' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Dunkelblau', colorHex: '#1e3a8a' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Mittelblau', colorHex: '#2563eb' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Hellblau',   colorHex: '#bfdbfe' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Lila',       colorHex: '#9333ea' },
    ],
    'HochTief Webung': [
      { from: 50,  price: 10.50 },
      { from: 100, price: 8.61  },
      { from: 'auf_anfrage', price: 'auf_anfrage' },
    ],
    'Bordür Einwebung': [
      { from: 50,  price: 9.70 },
      { from: 100, price: 7.95 },
      { from: 'auf_anfrage', price: 'auf_anfrage' },
    ],
    'Bedruckt': [
      { from: 50,  price: 7.50 },
      { from: 100, price: 6.15 },
      { from: 'auf_anfrage', price: 'auf_anfrage' },
    ],
  },
  groessen: [
    { name: '30x30 cm',   minQuantity: 50  },
    { name: '30x50 cm',   minQuantity: 50  },
    { name: '50x90 cm',   minQuantity: 50  },
    { name: '50x100 cm',  minQuantity: 50  },
    { name: '70x130 cm',  minQuantity: 100 },
    { name: '70x140 cm',  minQuantity: 100 },
    { name: '100x150 cm', minQuantity: 250 },
    { name: '100x160 cm', minQuantity: 250 },
    { name: '90x180 cm',  minQuantity: 250 },
    { name: '100x200 cm', minQuantity: 500 },
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
  window.dispatchEvent(new Event('shopconfig:saved'));
}

// ─── Color Cell ───────────────────────────────────────────────────────────────
function ColorCell({ colorName, colorHex, onNameChange, onHexChange }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={colorHex || '#ffffff'}
        onChange={e => onHexChange(e.target.value)}
        className="w-9 h-9 rounded-lg border border-border cursor-pointer p-0.5 bg-transparent shrink-0"
      />
      <Input
        type="text"
        value={colorHex || ''}
        onChange={e => onHexChange(e.target.value)}
        className="h-9 text-sm w-24 font-mono text-xs"
        placeholder="#ffffff"
        maxLength={7}
      />
      <Input
        type="text"
        value={colorName || ''}
        onChange={e => onNameChange(e.target.value)}
        className="h-9 text-sm w-32"
        placeholder="z.B. Naturweiß"
      />
      <div className="w-7 h-7 rounded-full border border-border shrink-0" style={{ backgroundColor: colorHex || '#ffffff' }} />
    </div>
  );
}

// ─── Staffelpreise Section ────────────────────────────────────────────────────
function StaffelpreiseSection({ staffelpreise, onChange }) {
  const [activeVariant, setActiveVariant] = useState(VARIANTS[0]);
  const isFreeColor = FREE_COLOR_VARIANTS.includes(activeVariant);
  const rows = staffelpreise[activeVariant] || [];

  const updateRow = (i, field, value) => {
    const updated = rows.map((r, idx) => idx === i ? { ...r, [field]: value } : r);
    onChange({ ...staffelpreise, [activeVariant]: updated });
  };

  const addRow = () => {
    const newRow = isFreeColor
      ? { from: '', price: '' }
      : { from: '', price: '', color: '', colorHex: '#ffffff' };
    onChange({ ...staffelpreise, [activeVariant]: [...rows, newRow] });
  };

  const removeRow = (i) => {
    onChange({ ...staffelpreise, [activeVariant]: rows.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div>
        <h3 className="font-heading font-semibold text-foreground text-lg">Staffelpreise</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Mengen und Preise pro Variante. Bei „Bestickt" auch Farben definieren.
          Für höhere Mengen „auf_anfrage" in das Mengen-Feld eingeben.
        </p>
      </div>

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

      {isFreeColor && (
        <p className="text-xs bg-accent/10 text-accent border border-accent/20 rounded-lg px-3 py-2">
          Diese Variante nutzt einen freien Farbpicker — keine Farben hier nötig.
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-muted/40">
              <th className="py-2 px-3 text-xs text-muted-foreground uppercase tracking-wide font-semibold">Ab Menge (Stk.)</th>
              <th className="py-2 px-3 text-xs text-muted-foreground uppercase tracking-wide font-semibold">Preis / Stk. (€)</th>
              {!isFreeColor && (
                <th className="py-2 px-3 text-xs text-muted-foreground uppercase tracking-wide font-semibold">Farbe (Picker · Hex · Name)</th>
              )}
              <th className="py-2 w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-muted/20">
                <td className="py-2 px-3">
                  <Input
                    type="text"
                    value={row.from}
                    onChange={e => updateRow(i, 'from', e.target.value)}
                    className="w-32 h-9 text-sm"
                    placeholder="z.B. 50 oder auf_anfrage"
                  />
                </td>
                <td className="py-2 px-3">
                  <div className="relative w-32">
                    <Input
                      type="text"
                      value={row.price}
                      onChange={e => updateRow(i, 'price', e.target.value)}
                      className="h-9 text-sm pr-6"
                      placeholder="z.B. 8.90"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">€</span>
                  </div>
                </td>
                {!isFreeColor && (
                  <td className="py-2 px-3">
                    <ColorCell
                      colorName={row.color || ''}
                      colorHex={row.colorHex || '#ffffff'}
                      onNameChange={v => updateRow(i, 'color', v)}
                      onHexChange={v => updateRow(i, 'colorHex', v)}
                    />
                  </td>
                )}
                <td className="py-2 px-3">
                  <button onClick={() => removeRow(i)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={isFreeColor ? 3 : 4} className="py-6 text-center text-muted-foreground text-sm">
                  Noch keine Einträge. Klicke auf „Zeile hinzufügen".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Button variant="outline" size="sm" onClick={addRow} className="gap-2">
        <Plus className="w-4 h-4" /> Zeile hinzufügen
      </Button>
    </div>
  );
}

// ─── Größen Section ───────────────────────────────────────────────────────────
function GroessenSection({ groessen, onChange }) {
  const updateRow = (i, field, value) => {
    const updated = groessen.map((g, idx) => idx === i ? { ...g, [field]: value } : g);
    onChange(updated);
  };

  const addRow = () => onChange([...groessen, { name: '', minQuantity: 50 }]);
  const removeRow = (i) => onChange(groessen.filter((_, idx) => idx !== i));

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div>
        <h3 className="font-heading font-semibold text-foreground text-lg">Verfügbare Größen</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Definiert welche Größen im Konfigurator verfügbar sind und ab welcher Mindestmenge.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-muted/40">
              <th className="py-2 px-3 text-xs text-muted-foreground uppercase tracking-wide font-semibold">Größe (z.B. 50x100 cm)</th>
              <th className="py-2 px-3 text-xs text-muted-foreground uppercase tracking-wide font-semibold">Mindestmenge (Stk.)</th>
              <th className="py-2 w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {groessen.map((g, i) => (
              <tr key={i} className="hover:bg-muted/20">
                <td className="py-2 px-3">
                  <Input
                    type="text"
                    value={g.name}
                    onChange={e => updateRow(i, 'name', e.target.value)}
                    className="w-40 h-9 text-sm"
                    placeholder="z.B. 50x100 cm"
                  />
                </td>
                <td className="py-2 px-3">
                  <Input
                    type="text"
                    value={g.minQuantity}
                    onChange={e => updateRow(i, 'minQuantity', e.target.value)}
                    className="w-28 h-9 text-sm"
                    placeholder="50"
                  />
                </td>
                <td className="py-2 px-3">
                  <button onClick={() => removeRow(i)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {groessen.length === 0 && (
              <tr>
                <td colSpan={3} className="py-6 text-center text-muted-foreground text-sm">
                  Noch keine Größen. Klicke auf „Größe hinzufügen".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Button variant="outline" size="sm" onClick={addRow} className="gap-2">
        <Plus className="w-4 h-4" /> Größe hinzufügen
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
        onChange={gr => setConfig(c => ({ ...c, groessen: gr }))}
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