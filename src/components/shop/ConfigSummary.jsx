import React from 'react';
import { Ruler, Palette, Shirt, Sparkles } from 'lucide-react';

export default function ConfigSummary({ config, logoUrl, variant }) {
  if (!variant && !config.length && !config.color && !config.material) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-3">
      <h4 className="font-heading font-semibold text-foreground text-sm">Ihre Konfiguration</h4>

      <div className="space-y-2">
        {variant && (
          <div className="flex items-center gap-3 text-sm">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span className="text-muted-foreground">Veredelung:</span>
            <span className="text-foreground font-medium">{variant.name}</span>
          </div>
        )}
        {config.length && (
          <div className="flex items-center gap-3 text-sm">
            <Ruler className="w-4 h-4 text-primary shrink-0" />
            <span className="text-muted-foreground">Größe:</span>
            <span className="text-foreground font-medium">{config.length}</span>
          </div>
        )}
        {config.color && (
          <div className="flex items-center gap-3 text-sm">
            <Palette className="w-4 h-4 text-primary shrink-0" />
            <span className="text-muted-foreground">Farbe:</span>
            <span className="text-foreground font-medium">{config.color}</span>
          </div>
        )}
        {config.material && (
          <div className="flex items-center gap-3 text-sm">
            <Shirt className="w-4 h-4 text-primary shrink-0" />
            <span className="text-muted-foreground">Stoff:</span>
            <span className="text-foreground font-medium">{config.material}</span>
          </div>
        )}
        {logoUrl && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 rounded-lg border border-border bg-white overflow-hidden shrink-0">
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain p-1" />
            </div>
            <span className="text-foreground font-medium">Logo hochgeladen</span>
          </div>
        )}
      </div>
    </div>
  );
}