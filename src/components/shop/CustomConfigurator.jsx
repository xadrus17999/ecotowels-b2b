import React, { useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Ruler, Palette, Hash } from 'lucide-react';
import { QUANTITY_OPTIONS, parseQuantity } from '@/lib/pricing';
import StepWrapper from '@/components/shop/StepWrapper';
import { useShopConfig } from '@/hooks/useShopConfig';

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

  const qty = parseQuantity(quantity);
  const hasQuantity = qty >= 50;

  // Load size config and filter by qty
  const sizeCategories = useMemo(() => {
    const groessen = shopConfig.groessen || [];
    const map = {};
    groessen.forEach(g => {
      const minQty = parseInt(String(g.minQuantity).replace(/[^0-9]/g, '')) || 0;
      if (qty < minQty) return;
      const cat = SIZE_CATEGORY_MAP[g.name] || 'Sonstige';
      if (!map[cat]) map[cat] = [];
      map[cat].push(g.name);
    });
    return Object.entries(map).map(([category, options]) => ({ category, options }));
  }, [qty, shopConfig]);

  // Load available colors from admin config for the selected variant, filtered by qty
  const availableColors = useMemo(() => {
    if (!selectedVariant || !hasQuantity) return [];
    const rows = shopConfig.staffelpreise?.[selectedVariant.name] || [];
    // Filter by minQuantity, collect unique color entries (by name)
    const seen = new Set();
    const colors = [];
    rows.forEach(row => {
      const minQty = parseInt(String(row.from).replace(/[^0-9]/g, '')) || 0;
      if (qty < minQty) return;
      if (row.color && !seen.has(row.color)) {
        seen.add(row.color);
        colors.push({ name: row.color, hex: row.colorHex || '#ffffff' });
      }
    });
    return colors;
  }, [selectedVariant, qty, hasQuantity, shopConfig]);

  const handleQuantitySelect = (q) => {
    onQuantityChange(q);
    // Reset color if it's no longer available at the new qty
    const newQty = parseQuantity(q);
    if (config.color) {
      const rows = shopConfig.staffelpreise?.[selectedVariant?.name] || [];
      const stillAvailable = rows.some(row => {
        const minQty = parseInt(String(row.from).replace(/[^0-9]/g, '')) || 0;
        return row.color === config.color && newQty >= minQty;
      });
      if (!stillAvailable) onChange({ ...config, color: '' });
    }
    setTimeout(() => {
      sizeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
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
            {QUANTITY_OPTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleQuantitySelect(q)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-sm border font-medium transition-all duration-150",
                  quantity === q
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border bg-background text-foreground hover:border-primary/50 hover:shadow-sm"
                )}
              >
                {q} Stk.
              </button>
            ))}
          </div>
        </div>
      </StepWrapper>

      {/* 3. Size */}
      <StepWrapper step={3} total={5} visible={hasQuantity}>
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
      <StepWrapper step={4} total={5} visible={hasQuantity && !!config.length}>
        <div ref={colorSectionRef} className="rounded-xl border border-border bg-card p-5">
          <SectionHeader icon={Palette} label="Farbe" />

          {availableColors.length === 0 ? (
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