import React from 'react';
import { Ruler, Palette, Sparkles, Clock, Tag } from 'lucide-react';
import { calculatePricePerPiece, formatPrice } from '@/lib/pricing';

export default function ConfigSummary({ config, logoUrl, variant, quantity }) {
  if (!variant && !config.length && !config.color) return null;

  const isOnRequest = quantity === 'auf_anfrage';
  const pricePerPiece = (!isOnRequest && variant && config.length && quantity)
    ? calculatePricePerPiece(variant.name, config.length, quantity)
    : null;

  const qty = parseInt(String(quantity || '').replace(/[^0-9]/g, '')) || 0;
  const totalPrice = pricePerPiece && qty > 0 ? pricePerPiece * qty : null;

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
        <div className="flex items-center gap-3 text-sm">
          <Clock className="w-4 h-4 text-primary shrink-0" />
          <span className="text-muted-foreground">Lieferzeit:</span>
          <span className="text-foreground font-medium">Lagerware 7 Tage, Anfertigung: 6–7 Wochen</span>
        </div>
        {logoUrl && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 rounded-lg border border-border bg-white overflow-hidden shrink-0">
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain p-1" />
            </div>
            <span className="text-foreground font-medium">Logo hochgeladen</span>
          </div>
        )}
      </div>

      {/* Price on request */}
      {isOnRequest && variant && config.length && (
        <div className="border-t border-border pt-3 mt-2">
          <div className="flex items-center gap-3 text-sm">
            <Tag className="w-4 h-4 text-accent shrink-0" />
            <span className="text-muted-foreground">Preis:</span>
            <span className="font-semibold text-accent">Preis auf Anfrage</span>
          </div>
        </div>
      )}

      {/* Price display */}
      {pricePerPiece && (
        <div className="border-t border-border pt-3 mt-2">
          <div className="flex items-center gap-3 text-sm mb-1">
            <Tag className="w-4 h-4 text-primary shrink-0" />
            <span className="text-muted-foreground">Richtpreis pro Stück:</span>
            <span className="text-foreground font-bold text-base text-primary">{formatPrice(pricePerPiece)}</span>
          </div>
          {totalPrice && qty >= 50 && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-4 h-4 shrink-0" />
              <span className="text-muted-foreground">Gesamt ca.:</span>
              <span className="text-foreground font-semibold">{formatPrice(totalPrice)}</span>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-2 ml-7">
            * Richtpreis zzgl. MwSt. Das finale Angebot erhalten Sie nach Ihrer Anfrage.
          </p>
        </div>
      )}
    </div>
  );
}