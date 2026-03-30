import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT_BASE_PRICES = {
  'Bestickt':         8.90,
  'HochTief Webung':  10.50,
  'Bordür Einwebung': 9.70,
};

const DEFAULT_SIZE_MULTIPLIERS = {
  '30x30 cm':   0.70,
  '30x50 cm':   0.80,
  '50x90 cm':   1.00,
  '50x100 cm':  1.05,
  '70x130 cm':  1.35,
  '70x140 cm':  1.40,
  '100x150 cm': 1.70,
  '100x160 cm': 1.75,
  '90x180 cm':  1.85,
  '100x200 cm': 1.95,
};

const DEFAULT_TIERS = [
  { min: 10000, discount: 0.42 },
  { min: 5000,  discount: 0.46 },
  { min: 2500,  discount: 0.52 },
  { min: 1000,  discount: 0.58 },
  { min: 500,   discount: 0.65 },
  { min: 250,   discount: 0.73 },
  { min: 100,   discount: 0.82 },
  { min: 50,    discount: 1.00 },
];

const STORAGE_KEY = 'admin_pricing_config';

export function loadPricingConfig() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    basePrices: DEFAULT_BASE_PRICES,
    sizeMultipliers: DEFAULT_SIZE_MULTIPLIERS,
    tiers: DEFAULT_TIERS,
  };
}

function savePricingConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export default function ProductEditor() {
  const [config, setConfig] = useState(loadPricingConfig);

  const updateBasePrice = (variant, value) => {
    setConfig(c => ({ ...c, basePrices: { ...c.basePrices, [variant]: parseFloat(value) || 0 } }));
  };

  const updateSizeMultiplier = (size, value) => {
    setConfig(c => ({ ...c, sizeMultipliers: { ...c.sizeMultipliers, [size]: parseFloat(value) || 0 } }));
  };

  const updateTier = (index, field, value) => {
    setConfig(c => {
      const tiers = [...c.tiers];
      tiers[index] = { ...tiers[index], [field]: parseFloat(value) || 0 };
      return { ...c, tiers };
    });
  };

  const handleSave = () => {
    savePricingConfig(config);
    toast.success('Preiskonfiguration gespeichert.');
  };

  const handleReset = () => {
    const defaults = {
      basePrices: DEFAULT_BASE_PRICES,
      sizeMultipliers: DEFAULT_SIZE_MULTIPLIERS,
      tiers: DEFAULT_TIERS,
    };
    setConfig(defaults);
    savePricingConfig(defaults);
    toast.success('Standardwerte wiederhergestellt.');
  };

  return (
    <div className="space-y-8">
      {/* Base prices */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">Grundpreise pro Stück (Basis bei 50 Stück)</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {Object.entries(config.basePrices).map(([variant, price]) => (
            <div key={variant} className="space-y-1">
              <Label className="text-xs">{variant}</Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={e => updateBasePrice(variant, e.target.value)}
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Size multipliers */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">Größen-Multiplikatoren</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Object.entries(config.sizeMultipliers).map(([size, mult]) => (
            <div key={size} className="space-y-1">
              <Label className="text-xs">{size}</Label>
              <Input
                type="number"
                step="0.01"
                value={mult}
                onChange={e => updateSizeMultiplier(size, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Quantity tiers */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">Mengenrabatt-Stufen</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground uppercase tracking-wide">
                <th className="pb-3 pr-4">Ab Stück</th>
                <th className="pb-3">Rabattfaktor (0–1)</th>
                <th className="pb-3 pl-4 text-muted-foreground/60">Entspricht ca. Rabatt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {config.tiers.map((tier, i) => (
                <tr key={i}>
                  <td className="py-2 pr-4">
                    <Input
                      type="number"
                      value={tier.min}
                      onChange={e => updateTier(i, 'min', e.target.value)}
                      className="w-28 h-8 text-sm"
                    />
                  </td>
                  <td className="py-2">
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={tier.discount}
                      onChange={e => updateTier(i, 'discount', e.target.value)}
                      className="w-28 h-8 text-sm"
                    />
                  </td>
                  <td className="py-2 pl-4 text-muted-foreground/70 text-xs">
                    {Math.round((1 - tier.discount) * 100)}% günstiger
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Speichern
        </Button>
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Zurücksetzen
        </Button>
      </div>
    </div>
  );
}