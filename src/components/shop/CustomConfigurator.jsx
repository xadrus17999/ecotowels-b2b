import React, { useRef, useMemo, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Ruler, Palette, Hash } from 'lucide-react';
import { parseQuantity } from '@/lib/pricing';
import StepWrapper from '@/components/shop/StepWrapper';
import { useShopConfig } from '@/hooks/useShopConfig';
import { SIZE_FIRST_VARIANTS, VARIANT_SIZE_MIN_QTY, VARIANT_SIZES, CUSTOM_QTY_ONLY_VARIANTS } from '@/lib/shopConfig';

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
  '100x50 cm': 'Handtuch',     '140x70 cm': 'Duschtuch',
  '180x100 cm': 'Strandtuch',
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

export default function CustomConfigurator({ config, onChange, quantity, onQuantityChange, selectedVariant, onIsCustomQty }) {
  const quantitySectionRef = useRef(null);
  const sizeSectionRef = useRef(null);
  const colorSectionRef = useRef(null);
  const shopConfig = useShopConfig();
  const { toast } = useToast();
  const [pickerHex, setPickerHex] = useState('#3b82f6');
  const [customQtyInput, setCustomQtyInput] = useState('');
  const [customQtyError, setCustomQtyError] = useState('');

  const isFreeColorVariant = selectedVariant && FREE_COLOR_VARIANTS.includes(selectedVariant.name);
  const isSizeFirst = selectedVariant && SIZE_FIRST_VARIANTS.includes(selectedVariant.name);
  const isCustomQtyOnly = selectedVariant && CUSTOM_QTY_ONLY_VARIANTS.includes(selectedVariant.name);

  const qty = parseQuantity(quantity);
  const isOnRequest = quantity === 'auf_anfrage';
  const hasQuantity = qty > 0 || isOnRequest;

  // ── Available sizes ──────────────────────────────────────────────────────────
  const sizeCategories = useMemo(() => {
    const variantName = selectedVariant?.name;
    if (!variantName) return [];

    const restrictedSizes = VARIANT_SIZES[variantName];
    const groessen = shopConfig.groessen || [];
    const map = {};

    if (restrictedSizes) {
      // Use the fixed list for restricted variants; no qty filter needed here (qty comes after)
      restrictedSizes.forEach(s => {
        // For non-size-first variants, still filter by global qty
        if (!isSizeFirst && !isOnRequest) {
          const g = groessen.find(x => x.name === s);
          const minQty = g ? (parseInt(String(g.minQuantity).replace(/[^0-9]/g, '')) || 0) : 0;
          if (qty < minQty) return;
        }
        const cat = SIZE_CATEGORY_MAP[s] || 'Sonstige';
        if (!map[cat]) map[cat] = [];
        map[cat].push(s);
      });
    } else {
      // Standard variants: filter sizes by qty
      groessen.forEach(g => {
        if (!isOnRequest) {
          const minQty = parseInt(String(g.minQuantity).replace(/[^0-9]/g, '')) || 0;
          if (qty < minQty) return;
        }
        const cat = SIZE_CATEGORY_MAP[g.name] || 'Sonstige';
        if (!map[cat]) map[cat] = [];
        map[cat].push(g.name);
      });
    }

    return Object.entries(map).map(([category, options]) => ({ category, options }));
  }, [selectedVariant, qty, isOnRequest, shopConfig, isSizeFirst]);

  // ── Quantity options (may depend on selected size for size-first variants) ───
  const quantityOptions = useMemo(() => {
    if (!selectedVariant) return [];
    const rows = shopConfig.staffelpreise?.[selectedVariant.name] || [];
    const hasOnRequest = rows.some(r => String(r.from) === 'auf_anfrage');

    let minQtyForSize = 0;
    if (isSizeFirst && config.length) {
      minQtyForSize = VARIANT_SIZE_MIN_QTY[selectedVariant.name]?.[config.length] ?? 0;
    }

    const numeric = [...new Set(
      rows
        .map(r => parseInt(String(r.from).replace(/[^0-9]/g, '')) || 0)
        .filter(n => n > 0 && n >= minQtyForSize)
        .sort((a, b) => a - b)
    )].map(n => n >= 1000 ? `${(n / 1000).toFixed(0)}.000` : String(n));

    return hasOnRequest ? [...numeric, 'auf_anfrage'] : numeric;
  }, [selectedVariant, shopConfig, isSizeFirst, config.length]);

  // ── Available colors ─────────────────────────────────────────────────────────
  const availableColors = useMemo(() => {
    if (!selectedVariant || !hasQuantity) return [];
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

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleSizeSelect = (opt) => {
    // Reset quantity when size changes in size-first flow
    const newConfig = { ...config, length: opt };
    if (isSizeFirst) {
      onQuantityChange('');
      setCustomQtyInput('');
      setCustomQtyError('');
      onChange({ ...newConfig, color: '' });
      setTimeout(() => quantitySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
    } else {
      onChange(newConfig);
      setTimeout(() => colorSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
    }
  };

  const handleQuantitySelect = (q, isCustom = false) => {
    onQuantityChange(q);
    onIsCustomQty?.(isCustom);
    if (config.color && !isFreeColorVariant) {
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
    if (!isSizeFirst) {
      setTimeout(() => sizeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
    } else {
      setTimeout(() => colorSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
    }
  };

  const handleCustomQtySubmit = () => {
    const val = parseInt(customQtyInput, 10);
    const minForSize = isSizeFirst && config.length
      ? (VARIANT_SIZE_MIN_QTY[selectedVariant?.name]?.[config.length] ?? 1)
      : 1;
    if (isNaN(val) || val < 1) {
      setCustomQtyError('Bitte eine gültige Stückzahl eingeben.');
      return;
    }
    if (val <= minForSize) {
      toast({ variant: 'destructive', title: 'Ungültige Stückzahl', description: `Die Wunschanzahl muss mehr als ${minForSize} Stück betragen.` });
      return;
    }
    setCustomQtyError('');
    handleQuantitySelect(String(val), true);
  };

  // ── Render helpers ────────────────────────────────────────────────────────────
  const sizeStep = isSizeFirst ? 2 : 3;
  const quantityStep = isSizeFirst ? 3 : 2;
  const colorStep = 4;

  const showSizeStep = isSizeFirst ? !!selectedVariant : hasQuantity;
  const showQuantityStep = isSizeFirst ? !!config.length : !!selectedVariant;
  const showColorStep = hasQuantity && !!config.length;

  // Minimum qty label for hint in size-first mode
  const minQtyHint = isSizeFirst && config.length && selectedVariant
    ? VARIANT_SIZE_MIN_QTY[selectedVariant.name]?.[config.length]
    : null;

  const quantityBlock = (
    <StepWrapper step={quantityStep} total={5} visible={showQuantityStep}>
      <div ref={quantitySectionRef} className="rounded-xl border border-border bg-card p-5">
        <SectionHeader icon={Hash} label="Stückzahl" />
        {minQtyHint && (
          <p className="text-xs text-muted-foreground mb-3">
            Für diese Größe ab <span className="font-semibold text-foreground">{minQtyHint.toLocaleString('de-DE')} Stk.</span> bestellbar.
          </p>
        )}
        <div className="flex flex-wrap gap-2 items-center">
          {!isCustomQtyOnly && quantityOptions.filter(q => q !== 'auf_anfrage').map((q) => (
            <button
              key={q}
              onClick={() => handleQuantitySelect(q, false)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm border font-medium transition-all duration-150",
                quantity === q
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-background text-foreground hover:border-primary/50 hover:shadow-sm"
              )}
            >
              {`${q} Stk.`}
            </button>
          ))}

          {isCustomQtyOnly && config.length && minQtyHint && (() => {
            const fixedQty = minQtyHint;
            const fixedQtyStr = String(fixedQty);
            return (
              <button
                onClick={() => handleQuantitySelect(fixedQtyStr)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-sm border font-medium transition-all duration-150",
                  quantity === fixedQtyStr
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border bg-background text-foreground hover:border-primary/50 hover:shadow-sm"
                )}
              >
                {`${fixedQty.toLocaleString('de-DE')} Stk.`}
              </button>
            );
          })()}

          {(isCustomQtyOnly || quantityOptions.includes('auf_anfrage')) && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={customQtyInput}
                onChange={e => {
                  setCustomQtyInput(e.target.value);
                  setCustomQtyError('');
                }}
                onKeyDown={e => e.key === 'Enter' && handleCustomQtySubmit()}
                placeholder="Wunschanzahl"
                className={cn(
                  "flex h-10 w-40 rounded-xl border px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-background",
                  quantity === customQtyInput && customQtyInput !== ''
                    ? "border-primary ring-1 ring-primary"
                    : "border-dashed border-accent"
                )}
              />
              <button
                onClick={handleCustomQtySubmit}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-sm border font-medium transition-all duration-150",
                  quantity === customQtyInput && customQtyInput !== ''
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-dashed border-accent text-accent hover:border-accent hover:bg-accent/5"
                )}
              >
                ✓
              </button>
            </div>
          )}
        </div>
        {customQtyError && <p className="text-xs text-destructive mt-2">{customQtyError}</p>}
      </div>
    </StepWrapper>
  );

  const sizeBlock = (
    <StepWrapper step={sizeStep} total={5} visible={showSizeStep}>
      <div ref={sizeSectionRef} className="rounded-xl border border-border bg-card p-5">
        <SectionHeader icon={Ruler} label="Größe" />
        <div className="flex flex-wrap gap-2">
          {sizeCategories.map((cat) =>
            cat.options.map((opt) => {
              const sizeMin = isSizeFirst && selectedVariant && !isCustomQtyOnly
                ? VARIANT_SIZE_MIN_QTY[selectedVariant.name]?.[opt]
                : null;
              return (
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
                  {sizeMin && (
                    <span className="text-[9px] opacity-50">ab {sizeMin >= 1000 ? `${sizeMin / 1000}.000` : sizeMin} Stk.</span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </StepWrapper>
  );

  return (
    <div className="space-y-6">
      {isSizeFirst ? (
        <>
          {sizeBlock}
          {quantityBlock}
        </>
      ) : (
        <>
          {quantityBlock}
          {sizeBlock}
        </>
      )}

      {/* Color */}
      <StepWrapper step={colorStep} total={5} visible={showColorStep}>
        <div ref={colorSectionRef} className="rounded-xl border border-border bg-card p-5">
          <SectionHeader icon={Palette} label="Farbe" />

          {isFreeColorVariant ? (
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