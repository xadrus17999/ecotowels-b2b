import React from 'react';
import { motion } from 'framer-motion';

const photos = [
  {
    url: 'https://media.base44.com/images/public/69c93819dabe2e39886b1787/c92bbdb11_generated_image.png',
    alt: 'Premium Öko-Handtuch mit Logo',
  },
  {
    url: 'https://media.base44.com/images/public/69c93819dabe2e39886b1787/72ea262c8_generated_image.png',
    alt: 'Farbige Werbeartikel-Handtücher',
  },
  {
    url: 'https://media.base44.com/images/public/69c93819dabe2e39886b1787/7d35652c8_generated_image.png',
    alt: 'Stickerei-Detail auf Handtuch',
  },
  {
    url: 'https://media.base44.com/images/public/69c93819dabe2e39886b1787/6a75880c9_generated_image.png',
    alt: 'Gerollte Handtücher mit Logo',
  },
  {
    url: 'https://media.base44.com/images/public/69c93819dabe2e39886b1787/47c980ed6_generated_image.png',
    alt: 'Handtuch-Geschenkset',
  },
  {
    url: 'https://media.base44.com/images/public/69c93819dabe2e39886b1787/7a61c88ad_generated_image.png',
    alt: 'Handtuch mit Branding outdoor',
  },
];

export default function PhotoGallery() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-3">Impressionen</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Qualität, die man sieht
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Hochwertige Verarbeitung, nachhaltige Materialien, bleibende Markenpräsenz.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="overflow-hidden rounded-xl aspect-square bg-muted"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}