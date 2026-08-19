// ─── Lemalua Delivery Utils ──────────────────────────────────────────────────
// Cobertura: radio de 1 km alrededor de la tienda.
// Geocodificación: Nominatim (OpenStreetMap) — sin API key, gratis.

/** Coordenadas de la tienda: Carrera 26 # 71B - 30, Bogotá, Colombia */
export const STORE_COORDS = {
  lat: 4.669856,
  lng: -74.074205,
  address: 'Carrera 26 # 71B - 30, Bogotá, Colombia',
};

/** Radio máximo de cobertura en kilómetros */
export const COVERAGE_RADIUS_KM = 1;

/**
 * Calcula la distancia entre dos puntos geográficos usando la fórmula de Haversine.
 * @param {number} lat1 - Latitud del punto 1
 * @param {number} lng1 - Longitud del punto 1
 * @param {number} lat2 - Latitud del punto 2
 * @param {number} lng2 - Longitud del punto 2
 * @returns {number} Distancia en kilómetros
 */
export function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radio de la Tierra en km
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Determina si una ubicación está dentro del radio de cobertura.
 * @param {number} lat
 * @param {number} lng
 * @returns {{ inCoverage: boolean, distanceKm: number }}
 */
export function checkCoverage(lat, lng) {
  const distanceKm = haversineDistance(
    STORE_COORDS.lat,
    STORE_COORDS.lng,
    lat,
    lng
  );
  return {
    inCoverage: distanceKm <= COVERAGE_RADIUS_KM,
    distanceKm,
  };
}

/**
 * Convierte una dirección de texto a coordenadas usando Nominatim (OSM).
 * @param {string} address - Dirección completa a geocodificar
 * @returns {Promise<{lat: number, lng: number, displayName: string} | null>}
 */
export async function geocodeAddress(address) {
  try {
    const query = encodeURIComponent(`${address}, Bogotá, Colombia`);
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1&countrycodes=co`;

    const res = await fetch(url, {
      headers: { 'Accept-Language': 'es', 'User-Agent': 'Lemalua-Ecommerce/1.0' },
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data || data.length === 0) return null;

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      displayName: data[0].display_name,
    };
  } catch {
    return null;
  }
}

/**
 * Convierte coordenadas a una dirección legible usando Nominatim (reverse geocoding).
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise<string | null>} Dirección formateada o null
 */
export async function reverseGeocode(lat, lng) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    const res = await fetch(url, {
      headers: { 'Accept-Language': 'es', 'User-Agent': 'Lemalua-Ecommerce/1.0' },
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data || !data.address) return null;

    const addr = data.address;

    // Construir dirección legible con los campos disponibles
    const parts = [
      addr.road || addr.pedestrian || addr.footway,
      addr.house_number,
      addr.neighbourhood || addr.suburb || addr.quarter,
      addr.city || addr.town || addr.village || addr.municipality,
    ].filter(Boolean);

    return parts.join(', ') || data.display_name;
  } catch {
    return null;
  }
}

/**
 * Solicita la geolocalización del navegador.
 * @returns {Promise<{lat: number, lng: number}>}
 */
export function getBrowserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalización no disponible en este dispositivo.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      (err) => {
        const messages = {
          1: 'Permiso de ubicación denegado. Ingresa tu dirección manualmente.',
          2: 'No se pudo obtener tu ubicación. Verifica tu conexión.',
          3: 'La solicitud de ubicación tardó demasiado. Intenta de nuevo.',
        };
        reject(new Error(messages[err.code] || 'Error al obtener ubicación.'));
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  });
}
