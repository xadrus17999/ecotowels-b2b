import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Ruler, Palette } from 'lucide-react';

const sizeCategories = [
  {
    category: 'Gästehandtuch',
    options: ['30x50 cm', '30x30 cm']
  },
  {
    category: 'Handtuch',
    options: ['50x100 cm', '50x90 cm']
  },
  {
    category: 'Duschtuch',
    options: ['70x140 cm', '70x130 cm']
  },
  {
    category: 'Strandtuch',
    options: ['90x180 cm', '100x200 cm']
  },
  {
    category: 'Badetuch',
    options: ['100x150 cm', '100x160 cm']
  }
];

const colorCategories = [
  {
    category: 'Neutral',
    colors: [
      { name: 'Naturweiß', class: 'bg-amber-50 border border-border' },
      { name: 'Cremeweiß', class: 'bg-yellow-50 border border-border' },
      { name: 'Hellgrau', class: 'bg-gray-200' },
      { name: 'Anthrazit', class: 'bg-gray-700' },
      { name: 'Schwarz', class: 'bg-black' },
    ]
  },
  {
    category: 'Erdtöne',
    colors: [
      { name: 'Sandbeige', class: 'bg-amber-200' },
      { name: 'Terrakotta', class: 'bg-orange-600' },
      { name: 'Karamel', class: 'bg-amber-600' },
      { name: 'Bordeaux', class: 'bg-red-900' },
      { name: 'Schokolade', class: 'bg-yellow-900' },
    ]
  },
  {
    category: 'Natur',
    colors: [
      { name: 'Salbeigrün', class: 'bg-emerald-300' },
      { name: 'Waldgrün', class: 'bg-green-700' },
      { name: 'Mintgrün', class: 'bg-teal-200' },
    ]
  },
  {
    category: 'Klassisch',
    colors: [
      { name: 'Dunkelblau', class: 'bg-blue-900' },
      { name: 'Mittelblau', class: 'bg-blue-600' },
      { name: 'Hellblau', class: 'bg-blue-200' },
      { name: 'Lila', class: 'bg-purple-600' },
    ]
  }
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

export default function CustomConfigurator({ config, onChange }) {
  const colorSectionRef = useRef(null);

  const handleSizeSelect = (opt) => {
    onChange({ ...config, length: opt });
    setTimeout(() => {
      colorSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <div className="space-y-8">
      {/* Size */}
      <div className="rounded-xl border border-border bg-card p-5">
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

      {/* Color */}
      <div ref={colorSectionRef} className="rounded-xl border border-border bg-card p-5">
        <SectionHeader icon={Palette} label="Farbe" />
        <div className="space-y-4">
          {colorCategories.map((cat) => (
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
            <p className="text-sm text-muted-foreground pt-1">Gewählt: <span className="font-medium text-foreground">{config.color}</span></p>
          )}
        </div>
      </div>
    </div>
  );
}