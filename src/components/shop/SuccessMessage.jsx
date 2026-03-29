import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SuccessMessage({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-primary" />
      </div>
      <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
        Anfrage erfolgreich gesendet!
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
        Vielen Dank für Ihr Interesse. Wir haben Ihre Konfiguration erhalten und melden uns
        innerhalb von 24 Stunden mit einem individuellen Angebot bei Ihnen.
      </p>
      <Button
        variant="outline"
        onClick={onReset}
        className="rounded-full px-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Neue Anfrage stellen
      </Button>
    </motion.div>
  );
}