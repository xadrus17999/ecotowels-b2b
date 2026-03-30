import React from 'react';
import { cn } from '@/lib/utils';
import { Hash } from 'lucide-react';
import { QUANTITY_OPTIONS } from '@/lib/pricing';

export default function QuantitySelector({ value, onChange }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <Hash className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-semibold text-foreground">Stückzahl</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {QUANTITY_OPTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onChange(q)}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm border font-medium transition-all duration-150",
              value === q
                ? "border-primary bg-primary text-primary-foreground shadow-md"
                : "border-border bg-background text-foreground hover:border-primary/50 hover:shadow-sm"
            )}
          >
            {q} Stk.
          </button>
        ))}
      </div>
    </div>
  );
}