const BASE = 'https://aztro.sameerkumar.website?day=today';

export async function fetchHoroscope(sign = 'aries') {
  try {
    const res = await fetch(BASE, { method: 'POST', body: `sign=${sign}&day=today`, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    return data;
  } catch (e) {
    console.warn('fetchHoroscope error', e);
    return null;
  }
}

export default { fetchHoroscope };
