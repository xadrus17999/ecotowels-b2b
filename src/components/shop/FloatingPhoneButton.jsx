import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, Clock } from 'lucide-react';

function useIsOpen() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 6=Sat
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeInMinutes = hour * 60 + minute;
  const isWeekday = day >= 1 && day <= 5;
  return isWeekday && timeInMinutes >= 8 * 60 && timeInMinutes < 17 * 60;
}

export default function FloatingPhoneButton() {
  const [open, setOpen] = useState(false);
  const isOpen = useIsOpen();

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white border border-border shadow-xl rounded-2xl p-4 w-60"
          >
            <p className="font-semibold text-foreground text-sm mb-1">Absolut Hübbers</p>
            <a
              href="tel:+49000000000"
              className="text-primary font-medium text-sm hover:underline block mb-3"
            >
              +49 (0) 000 000 000
            </a>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>Mo – Fr, 09:00 – 18:00 Uhr</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-md text-xs font-semibold ${isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-white' : 'bg-white'} animate-pulse`} />
        {isOpen ? 'Geöffnet' : 'Geschlossen'}
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition-all active:scale-95"
        aria-label="Telefon"
      >
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {open ? <X className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
        </motion.div>
      </button>
    </div>
  );
}