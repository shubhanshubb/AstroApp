import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE = 'https://aztro.sameerkumar.website/';

const cacheKey = sign => `horoscope:${sign}`;

/**
 * Fetch today's horoscope for a zodiac sign from the aztro API.
 * The API expects a POST with form-encoded body: sign=<sign>&day=today
 * Returns the parsed JSON on success, or null on failure.
 */
export async function fetchHoroscope(sign = 'aries') {
  // Try new Vercel-hosted horoscope API first (GET)
  try {
    const signParam = sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase();
    const vercelUrl = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${encodeURIComponent(
      signParam,
    )}&day=TODAY`;
    const vres = await fetch(vercelUrl, { method: 'GET' });
    if (vres.ok) {
      const vdata = await vres.json();
      // normalize potential shapes: support the vercel response shape
      const description =
        vdata?.data?.horoscope_data ||
        vdata?.data?.horoscope ||
        vdata?.description ||
        vdata?.horoscope ||
        vdata?.data?.description ||
        vdata?.text ||
        null;

      const normalized = {
        description,
        month: vdata?.data?.month || vdata?.month || null,
        standout_days: vdata?.data?.standout_days || vdata?.standout_days || null,
        challenging_days: vdata?.data?.challenging_days || vdata?.challenging_days || null,
        source: 'vercel',
        raw: vdata,
      };

      try {
        await AsyncStorage.setItem(cacheKey(sign), JSON.stringify(normalized));
      } catch (e) {
        console.warn('horoscope: failed to cache vercel response', e);
      }
      return normalized;
    } else {
      const text = await vres.text().catch(() => '');
      console.warn(`vercel horoscope HTTP ${vres.status} ${vres.statusText} ${text}`);
    }
  } catch (e) {
    console.warn('vercel horoscope fetch error', e);
  }

  const body = `sign=${encodeURIComponent(sign)}&day=today`;
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  };

  // Small retry for transient network issues
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(BASE, opts);
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status} ${res.statusText} ${text}`);
      }
      const data = await res.json();
      // persist successful response as a fallback for offline/503 errors
      try {
        await AsyncStorage.setItem(cacheKey(sign), JSON.stringify(data));
      } catch (e) {
        console.warn('horoscope: failed to cache response', e);
      }
      return data;
    } catch (e) {
      // Last attempt should bubble the error via returning null but log details for debugging
      console.warn(`fetchHoroscope attempt=${attempt} sign=${sign} error:`, e);
      // on final failure, attempt to return cached data (if any)
      if (attempt === 2) {
        try {
          const cached = await AsyncStorage.getItem(cacheKey(sign));
          if (cached) {
            const parsed = JSON.parse(cached);
            // mark as cached so UI can indicate that
            return { ...parsed, cached: true };
          }
        } catch (readErr) {
          console.warn('horoscope: failed to read cache', readErr);
        }
        return null;
      }
      // small delay before retry (non-blocking)
      await new Promise(r => setTimeout(r, 300));
    }
  }
  return null;
}

export default { fetchHoroscope };
