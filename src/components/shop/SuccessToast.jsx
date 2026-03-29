import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

const DURATION = 10; // seconds

export default function SuccessToast({ visible, onClose }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!visible) {
      setElapsed(0);
      return;
    }

    const interval = setInterval(() => {
      setElapsed((prev) => {
        if (prev >= DURATION) {
          clearInterval(interval);
          onClose();
          return DURATION;
        }
        return prev + 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [visible]);

  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = elapsed / DURATION;
  const dashOffset = circumference * progress;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex items-start gap-3 bg-white border border-border shadow-xl rounded-2xl px-5 py-4 max-w-sm"
        >
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle className="w-5 h-5 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm">Anfrage gesendet!</p>
            <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
              Wir melden uns innerhalb von 24 Stunden mit Ihrem Angebot.
            </p>
          </div>

          {/* Close button with countdown ring */}
          <button
            onClick={onClose}
            className="relative w-6 h-6 shrink-0 flex items-center justify-center mt-0.5 group"
            aria-label="Schließen"
          >
            <svg
              className="absolute inset-0 w-6 h-6 -rotate-90"
              viewBox="0 0 26 26"
            >
              {/* Track */}
              <circle
                cx="13" cy="13" r={radius}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="2"
              />
              {/* Progress */}
              <circle
                cx="13" cy="13" r={radius}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>
            <X className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors relative z-10" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}