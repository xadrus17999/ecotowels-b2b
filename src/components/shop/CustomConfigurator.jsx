import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const lengths = [
  '30x50 cm (Gästehandtuch)',
  '50x100 cm (Handtuch)',
  '70x140 cm (Duschtuch)',
  '90x180 cm (Strandtuch)',
  '100x150 cm (Badetuch)'
];

const colors = [
  { name: 'Naturweiß', class: 'bg-amber-50 border border-border' },
  { name: 'Anthrazit', class: 'bg-gray-700' },
  { name: 'Dunkelblau', class: 'bg-blue-900' },
  { name: 'Salbeigrün', class: 'bg-emerald-300' },
  { name: 'Sandbeige', class: 'bg-amber-200' },
  { name: 'Terrakotta', class: 'bg-orange-600' },
  { name: 'Schwarz', class: 'bg-black' },
  { name: 'Bordeaux', class: 'bg-red-900' },
];

const materials = [
  'Bio-Baumwolle 400g/m²',
  'Bio-Frottee 450g/m²',
  'Bio-Frottee 500g/m²',
  'Ägyptische Bio-Baumwolle 600g/m²',
  'Mikrofaser-Baumwoll-Mix',
  'Bambus-Baumwoll-Mix'
];

export default function CustomConfigurator({ config, onChange }) {
  return (
    <div className="space-y-8">
      {/* Length */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Größe</Label>
        <Select value={config.length} onValueChange={(v) => onChange({ ...config, length: v })}>
          <SelectTrigger className="bg-card">
            <SelectValue placeholder="Größe wählen" />
          </SelectTrigger>
          <SelectContent>
            {lengths.map((l) => (
              <SelectItem key={l} value={l}>{l}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Color */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">Farbe</Label>
        <div className="flex flex-wrap gap-3">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => onChange({ ...config, color: c.name })}
              className={cn(
                "w-10 h-10 rounded-full transition-all duration-200 relative",
                c.class,
                config.color === c.name
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                  : "hover:scale-105"
              )}
              title={c.name}
            />
          ))}
        </div>
        {config.color && (
          <p className="text-sm text-muted-foreground">Gewählt: {config.color}</p>
        )}
      </div>

      {/* Material */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Stoff</Label>
        <Select value={config.material} onValueChange={(v) => onChange({ ...config, material: v })}>
          <SelectTrigger className="bg-card">
            <SelectValue placeholder="Stoff wählen" />
          </SelectTrigger>
          <SelectContent>
            {materials.map((m) => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}