import React, { useRef, useMemo, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Ruler, Palette, Hash } from 'lucide-react';
import { parseQuantity } from '@/lib/pricing';
import StepWrapper from '@/components/shop/StepWrapper';
import { useShopConfig } from '@/hooks/useShopConfig';

// Variants that use a free color picker instead of admin-defined swatches
const FREE_COLOR_VARIANTS = ['HochTief Webung', 'Bordür Einwebung', 'Bedruckt'];

function hexToColorLabel(hex) {
  return `Individuelle Farbe (HEX: ${hex.toUpperCase()})`;
}

const SIZE_CATEGORY_MAP = {
  '30x30 cm': 'Gästehandtuch', '30x50 cm': 'Gästehandtuch',
  '50x90 cm': 'Handtuch',      '50x100 cm': 'Handtuch',
  '70x130 cm': 'Duschtuch',    '70x140 cm': 'Duschtuch',
  '90x180 cm': 'Strandtuch',   '100x200 cm': 'Strandtuch',
  '100x150 cm': 'Badetuch',    '100x160 cm': 'Badetuch',
};

function SectionHeader({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </div>
  );
}

export default function CustomConfigurator({ config, onChange, quantity, onQuantityChange, selectedVariant }) {
  const sizeSectionRef = useRef(null);
  const colorSectionRef = useRef(null);
  const shopConfig = useShopConfig();
  const [pickerHex, setPickerHex] = useState('#3b82f6');
  const [customQtyInput, setCustomQtyInput] = useState('');
  const [customQtyError, setCustomQtyError] = useState('');

  const isFreeColorVariant = selectedVariant && FREE_COLOR_VARIANTS.includes(selectedVariant.name);

  const qty = parseQuantity(quantity);
  const isOnRequest = quantity === 'auf_anfrage';
  const hasQuantity = qty > 0 || isOnRequest;

  // Derive available quantity options from the admin config for the selected variant
  const quantityOptions = useMemo(() => {
    if (!selectedVariant) return [];
    const rows = shopConfig.staffelpreise?.[selectedVariant.name] || [];
    const hasOnRequest = rows.some(r => String(r.from) === 'auf_anfrage');
    const numeric = [...new Set(
      rows
        .map(r => parseInt(String(r.from).replace(/[^0-9]/g, '')) || 0)
        .filter(n => n > 0)
        .sort((a, b) => a - b)
    )].map(n => n >= 1000 ? `${(n / 1000).toFixed(0)}.000` : String(n));
    return hasOnRequest ? [...numeric, 'auf_anfrage'] : numeric;
  }, [selectedVariant, shopConfig]);

  // Load size config and filter by qty (show all sizes for "auf_anfrage")
  const sizeCategories = useMemo(() => {
    const groessen = shopConfig.groessen || [];
    const map = {};
    groessen.forEach(g => {
      if (!isOnRequest) {
        const minQty = parseInt(String(g.minQuantity).replace(/[^0-9]/g, '')) || 0;
        if (qty < minQty) return;
      }
      const cat = SIZE_CATEGORY_MAP[g.name] || 'Sonstige';
      if (!map[cat]) map[cat] = [];
      map[cat].push(g.name);
    });
    return Object.entries(map).map(([category, options]) => ({ category, options }));
  }, [qty, isOnRequest, shopConfig]);

  // Load available colors from admin config for the selected variant, filtered by qty
  const availableColors = useMemo(() => {
    if (!selectedVariant || (!hasQuantity && !isOnRequest)) return [];
    const rows = shopConfig.staffelpreise?.[selectedVariant.name] || [];
    const seen = new Set();
    const colors = [];
    rows.forEach(row => {
      const isRowOnRequest = String(row.from) === 'auf_anfrage';
      if (isOnRequest && !isRowOnRequest) return;
      if (!isOnRequest && isRowOnRequest) return;
      const minQty = parseInt(String(row.from).replace(/[^0-9]/g, '')) || 0;
      if (!isOnRequest && qty < minQty) return;
      if (row.color && !seen.has(row.color)) {
        seen.add(row.color);
        colors.push({ name: row.color, hex: row.colorHex || '#ffffff' });
      }
    });
    return colors;
  }, [selectedVariant, qty, hasQuantity, isOnRequest, shopConfig]);

  const handleQuantitySelect = (q) => {
    onQuantityChange(q);
    // Reset color if it's no longer available at the new qty
    if (config.color) {
      const rows = shopConfig.staffelpreise?.[selectedVariant?.name] || [];
      const newIsOnRequest = q === 'auf_anfrage';
      const newQty = parseQuantity(q);
      const stillAvailable = rows.some(row => {
        const rowIsOnRequest = String(row.from) === 'auf_anfrage';
        if (newIsOnRequest) return rowIsOnRequest && row.color === config.color;
        const minQty = parseInt(String(row.from).replace(/[^0-9]/g, '')) || 0;
        return !rowIsOnRequest && row.color === config.color && newQty >= minQty;
      });
      if (!stillAvailable) onChange({ ...config, color: '' });
    }
    setTimeout(() => {
      sizeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleCustomQtySubmit = () => {
    const val = parseInt(customQtyInput, 10);
    if (isNaN(val) || val <= 100) {
      setCustomQtyError('Bitte eine Stückzahl größer als 100 eingeben.');
      return;
    }
    setCustomQtyError('');
    handleQuantitySelect(String(val));
  };

  const handleSizeSelect = (opt) => {
    onChange({ ...config, length: opt });
    setTimeout(() => {
      colorSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <div className="space-y-6">
      {/* 2. Quantity */}
      <StepWrapper step={2} total={5} visible={!!selectedVariant}>
        <div ref={sizeSectionRef} className="rounded-xl border border-border bg-card p-5">
          <SectionHeader icon={Hash} label="Stückzahl" />
          <div className="flex flex-wrap gap-2">
            {quantityOptions.map((q) => (
              <button
                key={q}
                onClick={() => handleQuantitySelect(q)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-sm border font-medium transition-all duration-150",
                  quantity === q
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : q === 'auf_anfrage'
                      ? "border-dashed border-accent text-accent hover:border-accent hover:bg-accent/5"
                      : "border-border bg-background text-foreground hover:border-primary/50 hover:shadow-sm"
                )}
              >
                {q === 'auf_anfrage' ? 'Höhere Stückanzahl auf Anfrage' : `${q} Stk.`}
              </button>
            ))}
          </div>

          {/* Custom quantity input */}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Andere Stückzahl eingeben (mind. 101 Stk.):</p>
            <div className="flex items-center gap-2 flex-wrap">
              <input
                type="number"
                min={101}
                value={customQtyInput}
                onChange={e => {
                  setCustomQtyInput(e.target.value);
                  setCustomQtyError('');
                }}
                onKeyDown={e => e.key === 'Enter' && handleCustomQtySubmit()}
                placeholder="z. B. 250"
                className="flex h-9 w-36 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <button
                onClick={handleCustomQtySubmit}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm border font-medium transition-all duration-150",
                  quantity === customQtyInput && customQtyInput !== '' && parseInt(customQtyInput) > 100
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border bg-background text-foreground hover:border-primary/50 hover:shadow-sm"
                )}
              >
                Übernehmen
              </button>
            </div>
            {customQtyError && <p className="text-xs text-destructive mt-1">{customQtyError}</p>}
          </div>
        </div>
      </StepWrapper>

      {/* 3. Size */}
      <StepWrapper step={3} total={5} visible={hasQuantity || isOnRequest}>
        <div ref={sizeSectionRef} className="rounded-xl border border-border bg-card p-5">
          <SectionHeader icon={Ruler} label="Größe" />
          <div className="flex flex-wrap gap-2">
            {sizeCategories.map((cat) =>
              cat.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSizeSelect(opt)}
                  title={cat.category}
                  className={cn(
                    "w-24 h-20 rounded-xl text-xs border flex flex-col items-center justify-center gap-0.5 transition-all duration-150 font-medium leading-tight text-center px-2",
                    config.length === opt
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border bg-background text-foreground hover:border-primary/50 hover:shadow-sm"
                  )}
                >
                  <span className="font-semibold">{opt}</span>
                  <span className="text-[10px] opacity-60">{cat.category}</span>
                </button>
              ))
            )}
          </div>
        </div>
      </StepWrapper>

      {/* 4. Color */}
      <StepWrapper step={4} total={5} visible={(hasQuantity || isOnRequest) && !!config.length}>
        <div ref={colorSectionRef} className="rounded-xl border border-border bg-card p-5">
          <SectionHeader icon={Palette} label="Farbe" />

          {isFreeColorVariant ? (
            /* Free color picker for HochTief, Bordür, Bedruckt */
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Wählen Sie Ihre Wunschfarbe. Wir konvertieren diese in den nächsten passenden Pantone-Ton.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="relative">
                  <input
                    type="color"
                    value={pickerHex}
                    onChange={e => {
                      const hex = e.target.value;
                      setPickerHex(hex);
                      onChange({ ...config, color: hexToColorLabel(hex), colorHex: hex });
                    }}
                    className="w-16 h-16 rounded-xl border-2 border-border cursor-pointer p-1 bg-transparent"
                    title="Farbe wählen"
                  />
                </div>
                <div className="space-y-1">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-border shadow-sm"
                    style={{ backgroundColor: pickerHex }}
                  />
                </div>
                <div className="flex-1 min-w-[200px] space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Oder HEX-Code eingeben:</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={pickerHex}
                        maxLength={7}
                        placeholder="#3b82f6"
                        onChange={e => {
                          let val = e.target.value;
                          if (!val.startsWith('#')) val = '#' + val.replace('#', '');
                          setPickerHex(val);
                          if (/^#[0-9a-fA-F]{6}$/.test(val)) {
                            onChange({ ...config, color: hexToColorLabel(val), colorHex: val });
                          }
                        }}
                        className="flex h-9 w-36 rounded-md border border-input bg-transparent px-3 py-1 text-sm font-mono shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                      <div className="w-8 h-8 rounded-full border border-border" style={{ backgroundColor: /^#[0-9a-fA-F]{6}$/.test(pickerHex) ? pickerHex : '#fff' }} />
                    </div>
                  </div>
                  <button
                    onClick={() => onChange({ ...config, color: hexToColorLabel(pickerHex), colorHex: pickerHex })}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-150 w-full",
                      config.colorHex === pickerHex
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    )}
                  >
                    {config.colorHex === pickerHex ? '✓ Farbe gewählt' : 'Diese Farbe verwenden'}
                  </button>
                </div>
              </div>
            </div>
          ) : availableColors.length === 0 ? (
            <p className="text-sm text-muted-foreground">Keine Farben für diese Auswahl verfügbar.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {availableColors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => onChange({ ...config, color: c.name })}
                  title={c.name}
                  className={cn(
                    "w-9 h-9 rounded-full border-2 transition-all duration-150",
                    config.color === c.name
                      ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                      : "border-border hover:scale-105"
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}

          {config.color && (
            <p className="text-sm text-muted-foreground pt-3">
              Gewählt: <span className="font-medium text-foreground">{config.color}</span>
            </p>
          )}
        </div>
      </StepWrapper>
    </div>
  );
}