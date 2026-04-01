export const STORAGE_KEY = 'admin_shop_config';

export const DEFAULT_CONFIG = {
  staffelpreise: {
    'Bestickt': [
      { from: 50,  price: 8.90, color: 'Naturweiß',  colorHex: '#fdf8ef' },
      { from: 50,  price: 8.90, color: 'Cremeweiß',  colorHex: '#fefce8' },
      { from: 50,  price: 8.90, color: 'Hellgrau',   colorHex: '#e5e7eb' },
      { from: 50,  price: 8.90, color: 'Anthrazit',  colorHex: '#374151' },
      { from: 50,  price: 8.90, color: 'Schwarz',    colorHex: '#000000' },
      { from: 100, price: 7.30, color: 'Sandbeige',  colorHex: '#fcd34d' },
      { from: 100, price: 7.30, color: 'Terrakotta', colorHex: '#ea580c' },
      { from: 100, price: 7.30, color: 'Karamel',    colorHex: '#d97706' },
      { from: 100, price: 7.30, color: 'Bordeaux',   colorHex: '#7f1d1d' },
      { from: 100, price: 7.30, color: 'Schokolade', colorHex: '#78350f' },
      { from: 100, price: 7.30, color: 'Salbeigrün', colorHex: '#6ee7b7' },
      { from: 100, price: 7.30, color: 'Waldgrün',   colorHex: '#15803d' },
      { from: 100, price: 7.30, color: 'Mintgrün',   colorHex: '#99f6e4' },
      { from: 100, price: 7.30, color: 'Dunkelblau', colorHex: '#1e3a8a' },
      { from: 100, price: 7.30, color: 'Mittelblau', colorHex: '#2563eb' },
      { from: 100, price: 7.30, color: 'Hellblau',   colorHex: '#bfdbfe' },
      { from: 100, price: 7.30, color: 'Lila',       colorHex: '#9333ea' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Naturweiß',  colorHex: '#fdf8ef' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Cremeweiß',  colorHex: '#fefce8' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Hellgrau',   colorHex: '#e5e7eb' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Anthrazit',  colorHex: '#374151' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Schwarz',    colorHex: '#000000' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Sandbeige',  colorHex: '#fcd34d' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Terrakotta', colorHex: '#ea580c' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Karamel',    colorHex: '#d97706' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Bordeaux',   colorHex: '#7f1d1d' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Schokolade', colorHex: '#78350f' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Salbeigrün', colorHex: '#6ee7b7' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Waldgrün',   colorHex: '#15803d' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Mintgrün',   colorHex: '#99f6e4' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Dunkelblau', colorHex: '#1e3a8a' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Mittelblau', colorHex: '#2563eb' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Hellblau',   colorHex: '#bfdbfe' },
      { from: 'auf_anfrage', price: 'auf_anfrage', color: 'Lila',       colorHex: '#9333ea' },
    ],
    'HochTief Webung': [
      { from: 50,  price: 10.50 },
      { from: 100, price: 8.61  },
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
  ],
};

export function loadShopConfig() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_CONFIG;
}

export function saveShopConfig(cfg) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  window.dispatchEvent(new Event('shopconfig:saved'));
}