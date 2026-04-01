import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Color map: towel color name → CSS background for overlay tinting
const colorMap = {
  'Naturweiß':   '#fdf8ef',
  'Cremeweiß':   '#fefce8',
  'Hellgrau':    '#e5e7eb',
  'Anthrazit':   '#374151',
  'Schwarz':     '#111827',
  'Sandbeige':   '#d6b896',
  'Terrakotta':  '#c2410c',
  'Karamel':     '#b45309',
  'Bordeaux':    '#7f1d1d',
  'Schokolade':  '#713f12',
  'Salbeigrün':  '#6ee7b7',
  'Waldgrün':    '#15803d',
  'Mintgrün':    '#99f6e4',
  'Dunkelblau':  '#1e3a5f',
  'Mittelblau':  '#2563eb',
  'Hellblau':    '#bfdbfe',
  'Lila':        '#7c3aed',
};

// Variant images
const variantImages = {
  'bestickt':  'https://media.base44.com/images/public/69c93819dabe2e39886b1787/a565f369e_generated_image.png',
  'hochtief':  'https://media.base44.com/images/public/69c93819dabe2e39886b1787/43abd22ae_generated_image.png',
  'borduer':   'https://media.base44.com/images/public/69c93819dabe2e39886b1787/9613171c5_generated_image.png',
  'bedruckt':  'https://media.base44.com/images/public/69c93819dabe2e39886b1787/db841458d_generated_image.png',
};

export default function TowelPreview({ variant, color, size }) {
  if (!variant) return null;

  const imgUrl = variantImages[variant.id];
  const overlayColor = colorMap[color] || null;
  // Determine if color is dark to adjust text
  const isDark = ['Anthrazit','Schwarz','Bordeaux','Schokolade','Waldgrün','Dunkelblau'].includes(color);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={variant.id + (color || '') + (size || '')}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl overflow-hidden border border-border shadow-md relative"
      >
        {/* Base image */}
        <img
          src={imgUrl}
          alt={`Vorschau ${variant.name}`}
          className="w-full object-cover aspect-video"
        />

        {/* Color tint overlay */}
        {overlayColor && (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: overlayColor, mixBlendMode: 'multiply', opacity: 0.45, pointerEvents: 'none' }}
          />
        )}

        {/* Info badge */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent flex flex-wrap items-end gap-2">
          <span className="text-white text-sm font-semibold drop-shadow">{variant.name}</span>
          {color && (
            <span className="text-white/80 text-xs drop-shadow">· {color}</span>
          )}
          {size && (
            <span className="text-white/80 text-xs drop-shadow">· {size}</span>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}