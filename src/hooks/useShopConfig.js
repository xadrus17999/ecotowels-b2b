import { useState, useEffect } from 'react';
import { loadShopConfig } from '@/components/admin/ShopConfig.jsx';

const STORAGE_KEY = 'admin_shop_config';

/**
 * Reactively loads the shop config from localStorage.
 * Re-renders automatically when the config is saved (same tab via custom event, or other tab via storage event).
 */
export function useShopConfig() {
  const [config, setConfig] = useState(() => loadShopConfig());

  useEffect(() => {
    // Listen for saves from the same tab (custom event dispatched by ShopConfig on save)
    const handleCustom = () => setConfig(loadShopConfig());
    // Listen for saves from other tabs
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) setConfig(loadShopConfig());
    };

    window.addEventListener('shopconfig:saved', handleCustom);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('shopconfig:saved', handleCustom);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return config;
}