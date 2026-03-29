import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const presets = [
  {
    id: 'sport',
    name: 'Sport-Handtuch',
    length: '50x100 cm',
    color: 'Anthrazit',
    material: 'Mikrofaser-Baumwoll-Mix',
    description: 'Kompakt & schnelltrocknend — ideal für sportliche Events.'
  },
  {
    id: 'wellness',
    name: 'Wellness-Handtuch',
    length: '70x140 cm',
    color: 'Naturweiß',
    material: 'Bio-Frottee 500g/m²',
    description: 'Flauschig & luxuriös — perfekt für Spa & Hotel.'
  },
  {
    id: 'strand',
    name: 'Strandtuch',
    length: '90x180 cm',
    color: 'Sandbeige',
    material: 'Bio-Baumwolle 400g/m²',
    description: 'Großzügig & leicht — der Begleiter für Sommer-Kampagnen.'
  },
  {
    id: 'gaeste',
    name: 'Gästehandtuch',
    length: '30x50 cm',
    color: 'Salbeigrün',
    material: 'Bio-Frottee 450g/m²',
    description: 'Klein & fein — ideal als elegantes Werbegeschenk.'
  },
  {
    id: 'premium',
    name: 'Premium-Badetuch',
    length: '100x150 cm',
    color: 'Dunkelblau',
    material: 'ägyptische Bio-Baumwolle 600g/m²',
    description: 'Höchste Qualität für Ihre wichtigsten Kunden.'
  }
];

const colorMap = {
  'Anthrazit': 'bg-gray-700',
  'Naturweiß': 'bg-amber-50 border border-border',
  'Sandbeige': 'bg-amber-200',
  'Salbeigrün': 'bg-emerald-300',
  'Dunkelblau': 'bg-blue-900'
};

export default function PresetSelector({ selected, onSelect }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {presets.map((preset, i) => (
        <motion.button
          key={preset.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          onClick={() => onSelect(preset)}
          className={cn(
            "relative text-left p-5 rounded-xl border-2 transition-all duration-200",
            selected?.id === preset.id
              ? "border-primary bg-primary/5 shadow-md"
              : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
          )}
        >
          {selected?.id === preset.id && (
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
          )}

          <div className="flex items-center gap-3 mb-3">
            <div className={cn("w-8 h-8 rounded-full shrink-0", colorMap[preset.color] || 'bg-muted')} />
            <h4 className="font-heading font-semibold text-foreground">{preset.name}</h4>
          </div>

          <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{preset.description}</p>

          <div className="space-y-1 text-xs text-muted-foreground">
            <p><span className="font-medium text-foreground">Größe:</span> {preset.length}</p>
            <p><span className="font-medium text-foreground">Stoff:</span> {preset.material}</p>
            <p><span className="font-medium text-foreground">Farbe:</span> {preset.color}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

export { presets };