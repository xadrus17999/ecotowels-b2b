import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie_consent', 'all');
    setVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookie_consent', 'necessary');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl p-5 md:p-7">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-foreground text-base mb-2">
                  Diese Website verwendet Cookies
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-1">
                  Wir verwenden Cookies und ähnliche Technologien auf unserer Website. Einige davon sind
                  technisch notwendig, damit die Website korrekt funktioniert. Andere helfen uns, diese
                  Website und Ihre Erfahrung zu verbessern (z.&nbsp;B. Analyse-Cookies).
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sie können selbst entscheiden, welche Kategorien Sie zulassen möchten. Bitte beachten Sie,
                  dass auf Basis Ihrer Einstellungen womöglich nicht mehr alle Funktionalitäten der Seite zur
                  Verfügung stehen. Weitere Informationen finden Sie in unserer{' '}
                  <Link to="/datenschutz" className="underline hover:text-primary transition-colors">
                    Datenschutzerklärung
                  </Link>
                  .
                </p>

                {/* Cookie categories info */}
                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground mb-1">✅ Technisch notwendig</p>
                    <p>Erforderlich für den Betrieb der Website. Können nicht deaktiviert werden (z.&nbsp;B. Session-Cookies, Sicherheits-Cookies).</p>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground mb-1">📊 Analyse &amp; Statistik</p>
                    <p>Helfen uns zu verstehen, wie Besucher mit der Website interagieren, um sie kontinuierlich zu verbessern.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-5">
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                  >
                    Alle akzeptieren
                  </Button>
                  <Button
                    onClick={handleAcceptNecessary}
                    variant="outline"
                    className="rounded-xl"
                  >
                    Nur technisch notwendige
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}