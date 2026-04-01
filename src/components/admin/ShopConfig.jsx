import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Plus, Trash2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const STORAGE_KEY = 'admin_shop_config';

const VARIANTS = ['Bestickt', 'HochTief Webung', 'Bordür Einwebung', 'Bedruckt'];

const DEFAULT_CONFIG = {
  // Artikel: { variantName: [ { from, price, size, color, colorHex } ] }
  staffelpreise: {
    'Bestickt':         [
      { from: 50,    price: 8.90,  size: '',           color: 'Naturweiß',  colorHex: '#fdf8ef' },
      { from: 50,    price: 8.90,  size: '',           color: 'Cremeweiß',  colorHex: '#fefce8' },
      { from: 50,    price: 8.90,  size: '',           color: 'Hellgrau',   colorHex: '#e5e7eb' },
      { from: 50,    price: 8.90,  size: '',           color: 'Anthrazit',  colorHex: '#374151' },
      { from: 50,    price: 8.90,  size: '',           color: 'Schwarz',    colorHex: '#000000' },
      { from: 100,   price: 7.30,  size: '',           color: 'Sandbeige',  colorHex: '#fcd34d' },
      { from: 100,   price: 7.30,  size: '',           color: 'Terrakotta', colorHex: '#ea580c' },
      { from: 100,   price: 7.30,  size: '',           color: 'Karamel',    colorHex: '#d97706' },
      { from: 100,   price: 7.30,  size: '',           color: 'Bordeaux',   colorHex: '#7f1d1d' },
      { from: 100,   price: 7.30,  size: '',           color: 'Schokolade', colorHex: '#78350f' },
      { from: 100,   price: 7.30,  size: '',           color: 'Salbeigrün', colorHex: '#6ee7b7' },
      { from: 100,   price: 7.30,  size: '',           color: 'Waldgrün',   colorHex: '#15803d' },
      { from: 100,   price: 7.30,  size: '',           color: 'Mintgrün',   colorHex: '#99f6e4' },
      { from: 100,   price: 7.30,  size: '',           color: 'Dunkelblau', colorHex: '#1e3a8a' },
      { from: 100,   price: 7.30,  size: '',           color: 'Mittelblau', colorHex: '#2563eb' },
      { from: 100,   price: 7.30,  size: '',           color: 'Hellblau',   colorHex: '#bfdbfe' },
      { from: 100,   price: 7.30,  size: '',           color: 'Lila',       colorHex: '#9333ea' },
    ],
    'HochTief Webung':  [
      { from: 50, price: 10.50, size: '', color: 'Naturweiß', colorHex: '#fdf8ef' },
      { from: 100, price: 8.61, size: '', color: 'Sandbeige', colorHex: '#fcd34d' },
    ],
    'Bordür Einwebung': [
      { from: 50, price: 9.70, size: '', color: 'Naturweiß', colorHex: '#fdf8ef' },
      { from: 100, price: 7.95, size: '', color: 'Sandbeige', colorHex: '#fcd34d' },
    ],
    'Bedruckt': [
      { from: 50, price: 7.50, size: '', color: 'Naturweiß', colorHex: '#fdf8ef' },
      { from: 100, price: 6.15, size: '', color: 'Sandbeige', colorHex: '#fcd34d' },
    ],
  },
  // Größen bleiben für den Konfigurator (Mindestmenge pro Größe)
  groessen: [
    { name: '30x30 cm',   minQuantity: 50 },
    { name: '30x50 cm',   minQuantity: 50 },
    { name: '50x90 cm',   minQuantity: 50 },
    { name: '50x100 cm',  minQuantity: 50 },
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

// ─── Color Cell with picker + hex input + swatch ─────────────────────────────
function ColorCell({ colorName, colorHex, onNameChange, onHexChange }) {
  return (
    <div className="flex items-center gap-2">
      {/* Color picker */}
      <div className="relative shrink-0">
        <input
          type="color"
          value={colorHex || '#ffffff'}
          onChange={e => onHexChange(e.target.value)}
          className="w-9 h-9 rounded-lg border border-border cursor-pointer p-0.5 bg-transparent"
          title="Farbe wählen"
        />
      </div>
      {/* Hex code field */}
      <Input
        type="text"
        value={colorHex || ''}
        onChange={e => onHexChange(e.target.value)}
        className="h-9 text-sm w-24 font-mono text-xs"
        placeholder="#ffffff"
        maxLength={7}
      />
      {/* Color name */}
      <Input
        type="text"
        value={colorName || ''}
        onChange={e => onNameChange(e.target.value)}
        className="h-9 text-sm w-32"
        placeholder="z.B. Naturweiß"
      />
      {/* Swatch preview */}
      <div
        className="w-7 h-7 rounded-full border border-border shrink-0"
        style={{ backgroundColor: colorHex || '#ffffff' }}
      />
    </div>
  );
}

// ─── Artikel-Konfiguration Section ───────────────────────────────────────────
function ArtikelSection({ staffelpreise, onChange }) {
  const [activeVariant, setActiveVariant] = useState(VARIANTS[0]);
  const rows = staffelpreise[activeVariant] || [];

  const updateRow = (i, field, value) => {
    const updated = rows.map((r, idx) => idx === i ? { ...r, [field]: value } : r);
    onChange({ ...staffelpreise, [activeVariant]: updated });
  };

  const addRow = () => {
    onChange({ ...staffelpreise, [activeVariant]: [...rows, { from: '', price: '', size: '', color: '', colorHex: '#ffffff' }] });
  };

  const removeRow = (i) => {
    onChange({ ...staffelpreise, [activeVariant]: rows.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <h3 className="font-heading font-semibold text-foreground text-lg">Artikel-Konfiguration</h3>
      <p className="text-xs text-muted-foreground">
        Jede Zeile definiert einen Artikel mit Mindestmenge, Preis, Größe und Farbe.
        Leere Felder gelten für alle Werte dieser Kategorie.
      </p>

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

      {/* Rows table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-muted/40">
              <th className="py-2 px-3 text-xs text-muted-foreground uppercase tracking-wide font-semibold">Ab Menge (Stk.)</th>
              <th className="py-2 px-3 text-xs text-muted-foreground uppercase tracking-wide font-semibold">Preis / Stk. (€)</th>
              <th className="py-2 px-3 text-xs text-muted-foreground uppercase tracking-wide font-semibold">Größe</th>
              <th className="py-2 px-3 text-xs text-muted-foreground uppercase tracking-wide font-semibold">Farbe (Picker · Hex · Name · Vorschau)</th>
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
                    className="w-28 h-9 text-sm"
                    placeholder="z.B. 50"
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
                <td className="py-2 px-3">
                  <Input
                    type="text"
                    value={row.size || ''}
                    onChange={e => updateRow(i, 'size', e.target.value)}
                    className="w-36 h-9 text-sm"
                    placeholder="z.B. 50x100 cm"
                  />
                </td>
                <td className="py-2 px-3">
                  <ColorCell
                    colorName={row.color || ''}
                    colorHex={row.colorHex || '#ffffff'}
                    onNameChange={v => updateRow(i, 'color', v)}
                    onHexChange={v => updateRow(i, 'colorHex', v)}
                  />
                </td>
                <td className="py-2 px-3">
                  <button onClick={() => removeRow(i)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-muted-foreground text-sm">
                  Noch keine Artikel. Klicke auf „Artikel hinzufügen".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Button variant="outline" size="sm" onClick={addRow} className="gap-2">
        <Plus className="w-4 h-4" /> Artikel hinzufügen
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
      <ArtikelSection
        staffelpreise={config.staffelpreise}
        onChange={sp => setConfig(c => ({ ...c, staffelpreise: sp }))}
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