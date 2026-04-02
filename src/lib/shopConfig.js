export const STORAGE_KEY = 'admin_shop_config';

// Variants where size is selected FIRST, then quantity is filtered by size's minQuantity
export const SIZE_FIRST_VARIANTS = ['Bordür Einwebung', 'HochTief Webung', 'Bedruckt', 'Bestickt'];

// Variants where ONLY the custom quantity input is shown (no preset buttons)
export const CUSTOM_QTY_ONLY_VARIANTS = ['HochTief Webung', 'Bordür Einwebung'];

// Per-variant, per-size minimum quantities
export const VARIANT_SIZE_MIN_QTY = {
  'Bordür Einwebung': {
    '100x50 cm':  500,
    '140x70 cm':  250,
    '180x100 cm': 250,
    '30x50 cm':   1000,
  },
  'HochTief Webung': {
    '100x50 cm':  500,
    '140x70 cm':  250,
    '180x100 cm': 250,
    '30x50 cm':   1000,
  },
  'Bedruckt': {
    '100x50 cm':  100,
    '140x70 cm':  100,
    '180x100 cm': 100,
  },
  'Bestickt': {
    '100x50 cm':  50,
    '140x70 cm':  50,
    '180x100 cm': 50,
  },

};

// Sizes available per variant (for restricted variants)
export const VARIANT_SIZES = {
  'Bordür Einwebung': ['100x50 cm', '140x70 cm', '180x100 cm', '30x50 cm'],
  'HochTief Webung':  ['100x50 cm', '140x70 cm', '180x100 cm', '30x50 cm'],
  'Bedruckt':         ['100x50 cm', '140x70 cm', '180x100 cm'],
  'Bestickt':         ['100x50 cm', '140x70 cm', '180x100 cm'],
};

export const DEFAULT_CONFIG = {
  staffelpreise: {
    'Bestickt': [
      { from: 50,  price: 8.90, color: 'Schwarz',       colorHex: '#1a1a1a' },
      { from: 50,  price: 8.90, color: 'Royal Blau',    colorHex: '#003a9b' },
      { from: 50,  price: 8.90, color: 'Rot',           colorHex: '#c8002f' },
      { from: 50,  price: 8.90, color: 'Weiß',          colorHex: '#f5f5f5' },
      { from: 50,  price: 8.90, color: 'Grau',          colorHex: '#97999b' },
      { from: 50,  price: 8.90, color: 'Gelb',          colorHex: '#f6eb14' },
      { from: 50,  price: 8.90, color: 'Grün',          colorHex: '#44d62c' },
      { from: 50,  price: 8.90, color: 'Orange',        colorHex: '#fa4616' },
      { from: 50,  price: 8.90, color: 'Lila',          colorHex: '#4f2d7f' },
      { from: 50,  price: 8.90, color: 'Rosa',          colorHex: '#e56db1' },
      { from: 50,  price: 8.90, color: 'Navy',          colorHex: '#1b2a4a' },
      { from: 50,  price: 8.90, color: 'Flaschengrün',  colorHex: '#1b3a2d' },
      { from: 50,  price: 8.90, color: 'Dunkelgrau',    colorHex: '#54575a' },
      { from: 50,  price: 8.90, color: 'Hellblau',      colorHex: '#00a3d9' },
      { from: 50,  price: 8.90, color: 'Petrol',        colorHex: '#007b82' },
      { from: 50,  price: 8.90, color: 'Ocean Blue',    colorHex: '#4a7fa5' },
      { from: 50,  price: 8.90, color: 'Sage',          colorHex: '#8faa80' },
      { from: 100, price: 7.30, color: 'Schwarz',       colorHex: '#1a1a1a' },
      { from: 100, price: 7.30, color: 'Royal Blau',    colorHex: '#003a9b' },
      { from: 100, price: 7.30, color: 'Rot',           colorHex: '#c8002f' },
      { from: 100, price: 7.30, color: 'Weiß',          colorHex: '#f5f5f5' },
      { from: 100, price: 7.30, color: 'Grau',          colorHex: '#97999b' },
      { from: 100, price: 7.30, color: 'Gelb',          colorHex: '#f6eb14' },
      { from: 100, price: 7.30, color: 'Grün',          colorHex: '#44d62c' },
      { from: 100, price: 7.30, color: 'Orange',        colorHex: '#fa4616' },
      { from: 100, price: 7.30, color: 'Lila',          colorHex: '#4f2d7f' },
      { from: 100, price: 7.30, color: 'Rosa',          colorHex: '#e56db1' },
      { from: 100, price: 7.30, color: 'Navy',          colorHex: '#1b2a4a' },
      { from: 100, price: 7.30, color: 'Flaschengrün',  colorHex: '#1b3a2d' },
      { from: 100, price: 7.30, color: 'Dunkelgrau',    colorHex: '#54575a' },
      { from: 100, price: 7.30, color: 'Hellblau',      colorHex: '#00a3d9' },
      { from: 100, price: 7.30, color: 'Petrol',        colorHex: '#007b82' },
      { from: 100, price: 7.30, color: 'Ocean Blue',    colorHex: '#4a7fa5' },
      { from: 100, price: 7.30, color: 'Sage',          colorHex: '#8faa80' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Schwarz',       colorHex: '#1a1a1a' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Royal Blau',    colorHex: '#003a9b' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Rot',           colorHex: '#c8002f' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Weiß',          colorHex: '#f5f5f5' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Grau',          colorHex: '#97999b' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Gelb',          colorHex: '#f6eb14' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Grün',          colorHex: '#44d62c' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Orange',        colorHex: '#fa4616' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Lila',          colorHex: '#4f2d7f' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Rosa',          colorHex: '#e56db1' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Navy',          colorHex: '#1b2a4a' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Flaschengrün',  colorHex: '#1b3a2d' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Dunkelgrau',    colorHex: '#54575a' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Hellblau',      colorHex: '#00a3d9' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Petrol',        colorHex: '#007b82' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Ocean Blue',    colorHex: '#4a7fa5' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Sage',          colorHex: '#8faa80' },
    ],
    'HochTief Webung': [
      { from: 500,  price: 5.19  },
      { from: 250,  price: 8.99  },
      { from: 1000, price: 4.20  },
      { from: 'auf_anfrage', price: 'auf_anfrage' },
    ],
    'Bordür Einwebung': [
      { from: 50,  price: 9.70 },
      { from: 100, price: 7.95 },
      { from: 'auf_anfrage', price: 'auf_anfrage' },
    ],
    'Bedruckt': [
      { from: 50,  price: 7.50 },
      { from: 100, price: 6.15 },
      { from: 'auf_anfrage', price: 'auf_anfrage' },
    ],
  },
  groessen: [
    { name: '30x30 cm',   minQuantity: 50  },
    { name: '30x50 cm',   minQuantity: 50  },
    { name: '50x90 cm',   minQuantity: 50  },
    { name: '50x100 cm',  minQuantity: 50  },
    { name: '70x130 cm',  minQuantity: 100 },
    { name: '70x140 cm',  minQuantity: 100 },
    { name: '100x150 cm', minQuantity: 250 },
    { name: '100x160 cm', minQuantity: 250 },
    { name: '90x180 cm',  minQuantity: 250 },
    { name: '100x200 cm', minQuantity: 500 },
    { name: '100x50 cm',  minQuantity: 50  },
    { name: '140x70 cm',  minQuantity: 50  },
    { name: '180x100 cm', minQuantity: 50  },
  ],
};

export function loadShopConfig() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure every variant has an auf_anfrage entry
      const variants = ['Bestickt', 'HochTief Webung', 'Bordür Einwebung', 'Bedruckt'];
      variants.forEach(v => {
        const rows = parsed.staffelpreise?.[v];
        if (rows && !rows.some(r => String(r.from) === 'auf_anfrage')) {
          rows.push({ from: 'auf_anfrage', price: 'auf_anfrage' });
        }
      });
      return parsed;
    }
  } catch {}
  return DEFAULT_CONFIG;
}

export function saveShopConfig(cfg) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  window.dispatchEvent(new Event('shopconfig:saved'));
}