'use client';

import { useState, useEffect, useCallback } from 'react';

type SettingsMap = Record<string, string>;

let cachedSettings: SettingsMap | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 30000;

export function useSettings() {
  const [settings, setSettings] = useState<SettingsMap>(() => cachedSettings || {});
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    const now = Date.now();
    if (cachedSettings && now - cacheTimestamp < CACHE_TTL) {
      setSettings(cachedSettings);
      setLoading(false);
      return;
    }

    fetch('/api/settings')
      .then((res) => res.json())
      .then((data: Array<{ key: string; value: string }>) => {
        const map: SettingsMap = {};
        data.forEach((s) => {
          map[s.key] = s.value;
        });
        cachedSettings = map;
        cacheTimestamp = Date.now();
        setSettings(map);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const get = useCallback(
    (key: string, fallback: string = '') => settings[key] || fallback,
    [settings]
  );

  return { get, loading, settings };
}
