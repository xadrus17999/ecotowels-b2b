const DEFAULT_BASE_PRICES = {
  'Bestickt':         8.90,
  'HochTief Webung':  10.50,
  'Bordür Einwebung': 9.70,
};

const DEFAULT_SIZE_MULTIPLIERS = {
  '30x30 cm':   0.70,
  '30x50 cm':   0.80,
  '50x90 cm':   1.00,
  '50x100 cm':  1.05,
  '70x130 cm':  1.35,
  '70x140 cm':  1.40,
  '100x150 cm': 1.70,
  '100x160 cm': 1.75,
  '90x180 cm':  1.85,
  '100x200 cm': 1.95,
};

const DEFAULT_TIERS = [
  { min: 10000, discount: 0.42 },
  { min: 5000,  discount: 0.46 },
  { min: 2500,  discount: 0.52 },
  { min: 1000,  discount: 0.58 },
  { min: 500,   discount: 0.65 },
  { min: 250,   discount: 0.73 },
  { min: 100,   discount: 0.82 },
  { min: 50,    discount: 1.00 },
];

function getConfig() {
  try {
    const stored = localStorage.getItem('admin_pricing_config');
    if (stored) return JSON.parse(stored);
  } catch {}
  return { basePrices: DEFAULT_BASE_PRICES, sizeMultipliers: DEFAULT_SIZE_MULTIPLIERS, tiers: DEFAULT_TIERS };
}

// Fixed price tables for variants with exact per-size pricing
// Key: variantName -> size -> { minQty, price }[]
const FIXED_PRICE_TABLES = {
  'HochTief Webung': {
    '100x50 cm':  [{ minQty: 500,  price: 5.19 }],
    '140x70 cm':  [{ minQty: 250,  price: 8.99 }],
    '180x100 cm': [{ minQty: 250,  price: 14.99 }],
    '30x50 cm':   [{ minQty: 1000, price: 4.20 }],
  },
  'Bordür Einwebung': {
    '100x50 cm':  [{ minQty: 500,  price: 5.79 }],
    '140x70 cm':  [{ minQty: 250,  price: 9.29 }],
    '180x100 cm': [{ minQty: 250,  price: 16.49 }],
    '30x50 cm':   [{ minQty: 1000, price: 4.69 }],
  },
  'Bestickt': {
    '100x50 cm':  [{ minQty: 100, price: 8.19 }, { minQty: 50, price: 10.49 }],
    '140x70 cm':  [{ minQty: 100, price: 10.49 }, { minQty: 50, price: 12.19 }],
    '180x100 cm': [{ minQty: 100, price: 16.99 }, { minQty: 50, price: 18.49 }],
  },
};

export function calculatePricePerPiece(variantName, size, quantity) {
  // Check fixed price table first
  const fixedTable = FIXED_PRICE_TABLES[variantName]?.[size];
  if (fixedTable) {
    const qty = parseInt(String(quantity).replace(/[^0-9]/g, '')) || 0;
    // Find matching tier (exact minQty match expected)
    const tier = fixedTable.find(t => qty >= t.minQty);
    return tier ? tier.price : null;
  }

  const { basePrices, sizeMultipliers, tiers } = getConfig();
  const base = basePrices[variantName];
  const mult = sizeMultipliers[size];
  if (!base || !mult) return null;

  const qty = parseInt(String(quantity).replace(/[^0-9]/g, '')) || 0;
  const tier = tiers.find(t => qty >= t.min) || tiers[tiers.length - 1];

  const price = base * mult * tier.discount;
  return Math.round(price * 100) / 100;
}

export function formatPrice(price) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price);
}

export const QUANTITY_OPTIONS = [
  '50', '100', '250', '500', '1.000', '2.500', '5.000', '10.000+'
];

// Returns minimum quantity needed as a number for a given option string
export function parseQuantity(q) {
  return parseInt(String(q).replace(/[^0-9]/g, '')) || 0;
}

// Colors only available from this quantity upward (full color range)
export const FULL_COLOR_MIN_QUANTITY = 100;