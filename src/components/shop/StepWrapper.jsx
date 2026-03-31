import React from 'react';
import { cn } from '@/lib/utils';

export default function StepWrapper({ step, total, children, visible = true }) {
  if (!visible) return null;
  const isLast = step === total;

  return (
    <div className="flex gap-4">
      {/* Left: number + dots */}
      <div className="flex flex-col items-center pt-1 select-none">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm">
          <span className="text-sm font-bold text-primary-foreground">{step}</span>
        </div>
        {!isLast && (
          <div className="flex flex-col items-center gap-1.5 mt-2">
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <span className="w-1 h-1 rounded-full bg-primary/30" />
            <span className="w-1 h-1 rounded-full bg-primary/20" />
          </div>
        )}
      </div>

      {/* Right: content */}
      <div className="flex-1 pb-2">{children}</div>
    </div>
  );
}