import React, { useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Ruler, Palette, Hash } from 'lucide-react';
import { QUANTITY_OPTIONS, parseQuantity, FULL_COLOR_MIN_QUANTITY } from '@/lib/pricing';
import StepWrapper from '@/components/shop/StepWrapper';

import { loadShopConfig } from '@/components/admin/ShopConfig';

const SIZE_CATEGORY_MAP = {
  '30x30 cm': 'Gästehandtuch', '30x50 cm': 'Gästehandtuch',
  '50x90 cm': 'Handtuch',      '50x100 cm': 'Handtuch',
  '70x130 cm': 'Duschtuch',    '70x140 cm': 'Duschtuch',
  '90x180 cm': 'Strandtuch',   '100x200 cm': 'Strandtuch',
  '100x150 cm': 'Badetuch',    '100x160 cm': 'Badetuch',
};

// Lagerfarben = available from 50 pcs
const stockColors = [
  { name: 'Naturweiß',  class: 'bg-amber-50 border border-border' },
  { name: 'Cremeweiß',  class: 'bg-yellow-50 border border-border' },
  { name: 'Hellgrau',   class: 'bg-gray-200' },
  { name: 'Anthrazit',  class: 'bg-gray-700' },
  { name: 'Schwarz',    class: 'bg-black' },
];

// All color categories (available from 100 pcs)
const colorCategories = [
  {
    category: 'Neutral (Lagerware)',
    colors: stockColors,
  },
  {
    category: 'Erdtöne',
    colors: [
      { name: 'Sandbeige',  class: 'bg-amber-200' },
      { name: 'Terrakotta', class: 'bg-orange-600' },
      { name: 'Karamel',    class: 'bg-amber-600' },
      { name: 'Bordeaux',   class: 'bg-red-900' },
      { name: 'Schokolade', class: 'bg-yellow-900' },
    ],
  },
  {
    category: 'Natur',
    colors: [
      { name: 'Salbeigrün', class: 'bg-emerald-300' },
      { name: 'Waldgrün',   class: 'bg-green-700' },
      { name: 'Mintgrün',   class: 'bg-teal-200' },
    ],
  },
  {
    category: 'Klassisch',
    colors: [
      { name: 'Dunkelblau', class: 'bg-blue-900' },
      { name: 'Mittelblau', class: 'bg-blue-600' },
      { name: 'Hellblau',   class: 'bg-blue-200' },
      { name: 'Lila',       class: 'bg-purple-600' },
    ],
  },
];

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

  const qty = parseQuantity(quantity);
  const hasQuantity = qty >= 50;
  const hasFullColors = qty >= FULL_COLOR_MIN_QUANTITY;

  // Load size config and filter by qty
  const sizeCategories = useMemo(() => {
    const shopConfig = loadShopConfig();
    const groessen = shopConfig.groessen || [];
    // Group by category
    const map = {};
    groessen.forEach(g => {
      const minQty = parseInt(String(g.minQuantity).replace(/[^0-9]/g, '')) || 0;
      if (qty < minQty) return;
      const cat = SIZE_CATEGORY_MAP[g.name] || 'Sonstige';
      if (!map[cat]) map[cat] = [];
      map[cat].push(g.name);
    });
    return Object.entries(map).map(([category, options]) => ({ category, options }));
  }, [qty]);

  // Visible color categories based on quantity
  const visibleCategories = hasFullColors
    ? colorCategories
    : hasQuantity
    ? [colorCategories[0]] // only stock colors
    : [];

  const handleQuantitySelect = (q) => {
    onQuantityChange(q);
    // Reset color if it's no longer available
    const newQty = parseQuantity(q);
    if (newQty < FULL_COLOR_MIN_QUANTITY && config.color) {
      const isStockColor = stockColors.some(c => c.name === config.color);
      if (!isStockColor) {
        onChange({ ...config, color: '' });
      }
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
      {/* 2. Quantity — visible once variant is chosen */}
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

      {/* 3. Size — visible once quantity is chosen */}
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

      {/* 4. Color — visible once size is chosen */}
      <StepWrapper step={4} total={5} visible={hasQuantity && !!config.length}>
        <div ref={colorSectionRef} className="rounded-xl border border-border bg-card p-5">
          <SectionHeader icon={Palette} label="Farbe" />

          {!hasFullColors && (
            <p className="text-xs text-muted-foreground mb-4 bg-muted/50 rounded-lg px-3 py-2">
              Ab <span className="font-semibold text-foreground">100 Stück</span> sind alle Farben verfügbar. Für Ihre Stückzahl sind Lagerfarben wählbar:
            </p>
          )}

          <div className="space-y-4">
            {visibleCategories.map((cat) => (
              <div key={cat.category}>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{cat.category}</p>
                <div className="flex flex-wrap gap-3">
                  {cat.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => onChange({ ...config, color: c.name })}
                      title={c.name}
                      className={cn(
                        "w-9 h-9 rounded-full transition-all duration-150",
                        c.class,
                        config.color === c.name
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                          : "hover:scale-105"
                      )}
                    />
                  ))}
                </div>
              </div>
            ))}
            {config.color && (
              <p className="text-sm text-muted-foreground pt-1">
                Gewählt: <span className="font-medium text-foreground">{config.color}</span>
              </p>
            )}
          </div>
        </div>
      </StepWrapper>
    </div>
  );
}