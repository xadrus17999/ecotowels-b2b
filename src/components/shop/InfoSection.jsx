import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Eye, Heart, Repeat } from 'lucide-react';

const benefits = [
  {
    icon: Leaf,
    title: 'Nachhaltig & Ökologisch',
    text: 'Unsere Handtücher werden aus 100% Bio-Baumwolle hergestellt — GOTS-zertifiziert, frei von Schadstoffen und umweltschonend produziert.'
  },
  {
    icon: Eye,
    title: 'Maximale Sichtbarkeit',
    text: 'Ein Handtuch wird im Schnitt über 300 Mal pro Jahr benutzt. Ihr Logo begleitet den Empfänger im Alltag — zu Hause, im Fitnessstudio, im Urlaub.'
  },
  {
    icon: Heart,
    title: 'Hoher Erinnerungswert',
    text: 'Studien zeigen: Nützliche Werbemittel erzielen eine Erinnerungsrate von über 80%. Handtücher gehören zu den beliebtesten Give-Aways im B2B-Bereich.'
  },
  {
    icon: Repeat,
    title: 'Langlebig & Wertig',
    text: 'Hochwertige Handtücher haben eine Lebensdauer von 3–5 Jahren. Das bedeutet tausende Markenkontakte pro Investition.'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 }
  })
};

export default function InfoSection({ detailImage }) {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Intro */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Warum Handtücher?
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Das Werbemittel,<br />das im Gedächtnis bleibt
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In einer Welt voller digitaler Werbung setzen clevere Unternehmen auf haptische Erlebnisse. 
              Personalisierte Handtücher vereinen Nachhaltigkeit mit höchster Werbewirksamkeit — 
              ein Premium-Produkt, das Ihre Marke täglich in die Hände Ihrer Kunden bringt.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Unsere Öko-Handtücher werden unter fairen Bedingungen aus biologisch angebauter Baumwolle gefertigt. 
              So stärken Sie nicht nur Ihre Marke, sondern auch Ihre Nachhaltigkeitsstrategie.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={detailImage}
              alt="Öko-Handtuch Detail"
              className="w-full h-80 object-cover"
            />
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}