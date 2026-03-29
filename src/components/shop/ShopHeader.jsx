import React from 'react';
import { motion } from 'framer-motion';

export default function ShopHeader({ heroImage }) {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium Öko-Handtücher"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary-foreground/70 text-sm font-body tracking-[0.3em] uppercase mb-4">
            Premium B2B Werbemittel
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary-foreground font-bold leading-tight mb-6">
            Personalisierte<br />Öko-Handtücher
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Nachhaltige Handtücher mit Ihrem Logo — das Werbemittel, das täglich benutzt wird.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10"
        >
          <a
            href="#konfigurator"
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            Jetzt konfigurieren
          </a>
        </motion.div>
      </div>
    </header>
  );
}