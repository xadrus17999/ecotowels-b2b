import React from 'react';
import { motion } from 'framer-motion';
import { Check, Scissors, Layers, Ribbon } from 'lucide-react';
import { cn } from '@/lib/utils';

const presets = [
  {
    id: 'bestickt',
    name: 'Bestickt',
    icon: Scissors,
    description: 'Ihr Logo wird direkt in den Stoff eingestickt — langlebig, hochwertig und waschbeständig. Ideal für Premiumprodukte.',
    highlight: 'Klassisch & langlebig'
  },
  {
    id: 'hochtief',
    name: 'HochTief Webung',
    icon: Layers,
    description: 'Durch verschiedene Florschlingen entsteht ein dreidimensionales Relief-Muster im Stoff selbst — ohne Farbauftrag, rein strukturell.',
    highlight: 'Edel & strukturiert'
  },
  {
    id: 'borduer',
    name: 'Bordür Einwebung',
    icon: Ribbon,
    description: 'Ein farbiger Streifen mit eingewebtem Logo oder Muster wird als umlaufende Bordüre in das Handtuch integriert — auffällig und elegant.',
    highlight: 'Auffällig & elegant'
  }
];

export default function PresetSelector({ selected, onSelect }) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.15em]">
        Veredelungs-Variante wählen
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        {presets.map((preset, i) => {
          const Icon = preset.icon;
          const isSelected = selected?.id === preset.id;
          return (
            <motion.button
              key={preset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => onSelect(preset)}
              className={cn(
                "relative text-left p-5 rounded-xl border-2 transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
              )}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              )}

              <div className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors",
                isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                <Icon className="w-5 h-5" />
              </div>

              <h4 className="font-heading font-semibold text-foreground mb-1">{preset.name}</h4>
              <p className="text-xs font-medium text-primary mb-2">{preset.highlight}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{preset.description}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export { presets };