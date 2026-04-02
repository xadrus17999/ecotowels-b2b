import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Package, Truck, Paintbrush, BadgeCheck, MessageCircle, Repeat } from 'lucide-react';

const faqs = [
  {
    icon: MessageCircle,
    question: 'Wie kann ich Sie telefonisch erreichen?',
    answer: 'Sie erreichen uns telefonisch Montag bis Freitag von 09:00 bis 18:00 Uhr. Außerhalb der Geschäftszeiten können Sie uns gerne eine Anfrage über das Formular senden — wir melden uns innerhalb von 2–3 Werktagen.'
  },
  {
    icon: Package,
    question: 'Was ist die Mindestbestellmenge?',
    answer: 'Die Mindestbestellmenge beträgt 50 Stück pro Artikel. Bei einem Mindestbestellwert von 400,00 € netto. Für größere Mengen gewähren wir attraktive Staffelpreise — fragen Sie uns gerne an.'
  },
  {
    icon: Truck,
    question: 'Wie lange dauert die Lieferung?',
    answer: 'Lagerware liefern wir innerhalb von ca. 7 Werktagen. Individuelle Sonderanfertigungen mit Ihrem Logo oder Druck benötigen in der Regel 6–7 Wochen ab Auftragsbestätigung und Druckfreigabe.'
  },
  {
    icon: Paintbrush,
    question: 'Welche Veredelungsmöglichkeiten gibt es?',
    answer: 'Wir bieten drei Veredelungsarten: Bestickung (Ihr Logo wird direkt ins Handtuch gestickt), Strukturweben (das Logo wird direkt in die Webstruktur eingearbeitet – besonders langlebig) sowie Bordürenintegration (Logo als dekorative Bordüre am Rand).'
  },
  {
    icon: BadgeCheck,
    question: 'Sind die Handtücher nachhaltig zertifiziert?',
    answer: 'Ja, unsere Öko-Handtücher bestehen aus 100 % biologisch angebauter Baumwolle und sind GOTS-zertifiziert. Das bedeutet: schadstoffgeprüft, fair produziert und umweltschonend hergestellt.'
  },
  {
    icon: BadgeCheck,
    question: 'Was bedeutet Öko-Tex 100 Zertifizierung?',
    answer: 'Das OEKO-TEX® Standard 100 Zertifikat bestätigt, dass unsere Handtücher auf Schadstoffe geprüft wurden und keine gesundheitsschädlichen Substanzen enthalten. Jeder Bestandteil des Produkts – vom Garn bis zum Fertigartikel – wird unabhängig getestet. Das Zertifikat steht für höchste Produktsicherheit und ist ein verlässliches Qualitätsmerkmal für Ihr Unternehmen und Ihre Kunden.'
  },
  {
    icon: MessageCircle,
    question: 'Wie läuft der Bestellprozess ab?',
    answer: 'Sie stellen Ihre Konfiguration zusammen und senden uns eine Anfrage über dieses Formular. Wir erstellen Ihnen daraufhin ein individuelles Angebot. Nach Auftragserteilung erhalten Sie eine Druckfreigabe zur Prüfung. Erst nach Ihrer Freigabe beginnen wir mit der Produktion.'
  },
  {
    icon: Repeat,
    question: 'Kann ich Muster vor der Bestellung anfordern?',
    answer: 'Ja, wir stellen Ihnen gerne Warenproben zur Verfügung, damit Sie Qualität und Haptik vorab prüfen können. Sprechen Sie uns einfach über das Kontaktformular an und wir kümmern uns darum.'
  }
];

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-muted/40 transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <span className="flex-1 font-medium text-foreground text-sm">{item.question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-16 md:py-24 bg-secondary/40">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-3">FAQ</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Häufige Fragen
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Hier finden Sie Antworten auf die häufigsten Fragen rund um unsere Produkte und den Bestellprozess.
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}