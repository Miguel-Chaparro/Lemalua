import React, { useState, useCallback, useEffect } from 'react';
import {
  geocodeAddress,
  getBrowserLocation,
  reverseGeocode,
  checkCoverage,
  STORE_COORDS,
  COVERAGE_RADIUS_KM,
} from '../utils/deliveryUtils';

/**
 * AddressSection
 * Formulario de dirección de entrega con validación de cobertura (1 km).
 *
 * Props:
 *   onAddressValidated(address: string, isValid: boolean) — callback al padre
 */
export default function AddressSection({ onAddressValidated }) {
  const [street, setStreet] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  const [status, setStatus] = useState('idle'); // idle | loading | valid | out_of_range | error | gps_pending
  const [distanceKm, setDistanceKm] = useState(null);
  const [displayAddress, setDisplayAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [gpsCoords, setGpsCoords] = useState(null); // coordenadas GPS obtenidas del navegador

  /** Construye la dirección completa para geocodificar */
  const buildFullAddress = () => {
    const parts = [street.trim(), complement.trim(), neighborhood.trim()].filter(Boolean);
    return parts.join(', ');
  };

  /** Procesa la ubicación (lat, lng) obtenida por cualquier medio */
  const processCoords = useCallback(
    async (lat, lng, resolvedAddress = null) => {
      const { inCoverage, distanceKm: dist } = checkCoverage(lat, lng);
      setDistanceKm(dist);

      const addr = resolvedAddress || buildFullAddress() || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      setDisplayAddress(addr);

      if (inCoverage) {
        setStatus('valid');
        onAddressValidated(addr, true);
      } else {
        setStatus('out_of_range');
        onAddressValidated(addr, false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onAddressValidated, street, complement, neighborhood]
  );

  /**
   * Solicita la ubicación GPS del navegador silenciosamente al montar.
   * NO sobreescribe los campos del formulario — solo almacena las coordenadas
   * para pre-validar la cobertura si el usuario lo desea.
   */
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setGpsCoords(coords);
        // Verificar cobertura automáticamente con GPS
        const { inCoverage, distanceKm: dist } = checkCoverage(coords.lat, coords.lng);
        setDistanceKm(dist);
        setStatus('gps_pending');
      },
      () => {
        // Permiso denegado o error — el usuario puede ingresar manualmente
        setGpsCoords(null);
      },
      { timeout: 8000, maximumAge: 120000 }
    );
  }, []);

  /** Geocodifica la dirección ingresada manualmente */
  const handleValidateAddress = async () => {
    const fullAddress = buildFullAddress();
    if (!fullAddress) {
      setErrorMsg('Por favor ingresa tu dirección de entrega.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    setDistanceKm(null);

    // Bypass temporal para edificios autorizados y la dirección de la tienda
    const lowerAddr = fullAddress.toLowerCase();
    if (lowerAddr.includes('hub 72') || lowerAddr.includes('alma 72') || lowerAddr.includes('carrera 26')) {
      setDistanceKm(0);
      setDisplayAddress(fullAddress);
      setStatus('valid');
      onAddressValidated(fullAddress, true);
      return;
    }

    const coords = await geocodeAddress(fullAddress);
    if (!coords) {
      setStatus('error');
      setErrorMsg(
        'No encontramos esa dirección en Bogotá. Verifica los datos o usa "Detectar mi ubicación".'
      );
      onAddressValidated('', false);
      return;
    }
    await processCoords(coords.lat, coords.lng, fullAddress);
  };

  /**
   * Usa las coordenadas GPS ya obtenidas (o las solicita si aún no se tienen).
   * NO sobreescribe los campos — el Reverse Geocoding de Nominatim en Bogotá
   * no siempre devuelve la dirección exacta del inmueble; el usuario debe
   * confirmar o escribir su dirección real. Solo usamos GPS para cobertura.
   */
  const handleDetectLocation = async () => {
    setStatus('loading');
    setErrorMsg('');

    try {
      let coords = gpsCoords;
      if (!coords) {
        coords = await getBrowserLocation();
        setGpsCoords(coords);
      }

      const { inCoverage, distanceKm: dist } = checkCoverage(coords.lat, coords.lng);
      setDistanceKm(dist);

      // Intentar reverse geocoding solo para mostrar referencia — NO para los campos
      const refAddr = await reverseGeocode(coords.lat, coords.lng);

      // La dirección "oficial" del pedido sigue siendo lo que escriba el usuario
      const userAddr = buildFullAddress();
      const finalAddr = userAddr || refAddr || `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
      setDisplayAddress(finalAddr);

      if (inCoverage) {
        setStatus('valid');
        onAddressValidated(finalAddr, true);
      } else {
        setStatus('out_of_range');
        onAddressValidated(finalAddr, false);
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
      onAddressValidated('', false);
    }
  };

  /** Confirma la cobertura GPS sin cambiar campos */
  const handleConfirmGps = async () => {
    if (!gpsCoords) return;
    setStatus('loading');
    const refAddr = await reverseGeocode(gpsCoords.lat, gpsCoords.lng);
    const userAddr = buildFullAddress();
    const finalAddr = userAddr || refAddr || `${gpsCoords.lat.toFixed(5)}, ${gpsCoords.lng.toFixed(5)}`;
    setDisplayAddress(finalAddr);

    const { inCoverage, distanceKm: dist } = checkCoverage(gpsCoords.lat, gpsCoords.lng);
    setDistanceKm(dist);

    if (inCoverage) {
      setStatus('valid');
      onAddressValidated(finalAddr, true);
    } else {
      setStatus('out_of_range');
      onAddressValidated(finalAddr, false);
    }
  };

  /** Resetea el estado para ingresar otra dirección */
  const handleReset = () => {
    setStatus(gpsCoords ? 'gps_pending' : 'idle');
    setDistanceKm(null);
    setDisplayAddress('');
    setErrorMsg('');
    onAddressValidated('', false);
  };

  /* ──────────────────────────────────────────────────────────────────────────
     Status badge
  ────────────────────────────────────────────────────────────────────────── */
  const StatusBadge = () => {
    if (status === 'loading') {
      return (
        <div className="address-status loading" id="address-status-loading">
          <span className="address-status__spinner" />
          <span>Verificando cobertura…</span>
        </div>
      );
    }
    if (status === 'valid') {
      return (
        <div className="address-status valid" id="address-status-valid">
          <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          <span>
            ¡Genial! Estás dentro de nuestra zona de cobertura&nbsp;
            <strong>({distanceKm?.toFixed(2)} km)</strong>.
          </span>
        </div>
      );
    }
    if (status === 'out_of_range') {
      return (
        <div className="address-status out-of-range" id="address-status-out-of-range">
          <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>
            location_off
          </span>
          <div>
            <p>
              Tu dirección está a <strong>{distanceKm?.toFixed(2)} km</strong> de nuestra tienda —
              fuera del radio de {COVERAGE_RADIUS_KM} km.
            </p>
            <p className="address-status__sub">
              Aún no tenemos cobertura en esa zona. ¡Estamos trabajando para llegar más lejos pronto! 🚀
            </p>
          </div>
        </div>
      );
    }
    if (status === 'error') {
      return (
        <div className="address-status error" id="address-status-error">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            error
          </span>
          <span>{errorMsg}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <style>{`
        .addr-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--color-surface-container);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.5rem;
          animation: fadeIn 0.4s ease both;
        }
        .addr-section__title {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-on-surface-variant);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.15rem;
        }
        .addr-section__title .material-symbols-outlined {
          color: var(--color-secondary);
          font-size: 1.05rem;
        }
        .addr-field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .addr-field label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-on-surface-variant);
          opacity: 0.7;
        }
        .addr-field input {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.14);
          padding: 0.45rem 0;
          color: var(--color-on-surface);
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.25s;
          width: 100%;
        }
        .addr-field input:focus { border-bottom-color: var(--color-secondary); }
        .addr-field input::placeholder { color: rgba(255,255,255,0.22); font-size: 0.83rem; }
        .addr-field input:disabled { opacity: 0.45; cursor: not-allowed; }
        .addr-actions { display: flex; flex-direction: column; gap: 0.55rem; margin-top: 0.2rem; }
        .btn-validate {
          width: 100%; padding: 0.72rem 1rem;
          background: transparent; border: 1px solid var(--color-secondary);
          color: var(--color-secondary);
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; cursor: pointer; border-radius: 2px;
          transition: background 0.25s, opacity 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 0.4rem;
        }
        .btn-validate:hover { background: rgba(233,193,118,0.08); }
        .btn-validate:active { opacity: 0.7; }
        .btn-detect {
          width: 100%; padding: 0.55rem 1rem;
          background: transparent; border: 1px dashed rgba(255,255,255,0.18);
          color: var(--color-on-surface-variant);
          font-size: 0.68rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; cursor: pointer; border-radius: 2px;
          transition: border-color 0.25s, color 0.25s;
          display: flex; align-items: center; justify-content: center; gap: 0.4rem;
        }
        .btn-detect:hover { border-color: var(--color-secondary); color: var(--color-secondary); }
        .btn-detect:disabled, .btn-validate:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn-reset {
          background: none; border: none;
          color: var(--color-on-surface-variant);
          font-size: 0.68rem; letter-spacing: 0.08em;
          text-decoration: underline; cursor: pointer;
          align-self: flex-start; opacity: 0.55; transition: opacity 0.2s;
        }
        .btn-reset:hover { opacity: 1; }
        .address-status {
          display: flex; align-items: flex-start; gap: 0.55rem;
          padding: 0.7rem 0.9rem; border-radius: 4px;
          font-size: 0.8rem; line-height: 1.45;
          animation: fadeIn 0.35s ease both;
        }
        .address-status.loading { background: rgba(255,255,255,0.04); color: var(--color-on-surface-variant); }
        .address-status.valid { background: rgba(72,199,142,0.08); border: 1px solid rgba(72,199,142,0.3); color: #48c78e; }
        .address-status.out-of-range { background: rgba(255,165,0,0.07); border: 1px solid rgba(255,165,0,0.25); color: #ffab40; }
        .address-status.error { background: rgba(207,102,121,0.08); border: 1px solid rgba(207,102,121,0.25); color: #cf6679; }
        .address-status__sub { margin-top: 0.28rem; font-size: 0.73rem; opacity: 0.85; }
        .address-status__spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.12);
          border-top-color: var(--color-secondary);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0; margin-top: 2px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .store-pill {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.65rem; color: var(--color-on-surface-variant);
          opacity: 0.5; letter-spacing: 0.04em;
        }
        .store-pill .material-symbols-outlined { font-size: 0.85rem; }
      `}</style>

      <div className="addr-section">
        <p className="addr-section__title">
          <span className="material-symbols-outlined">local_shipping</span>
          Dirección de Entrega
        </p>

        <p className="store-pill">
          <span className="material-symbols-outlined">storefront</span>
          Cobertura: {COVERAGE_RADIUS_KM} km desde {STORE_COORDS.address}
        </p>

        {/* Temporary Restriction Note */}
        <div style={{ background: 'rgba(233, 193, 118, 0.1)', border: '1px solid rgba(233, 193, 118, 0.3)', padding: '0.85rem', borderRadius: '6px', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--color-secondary)', fontSize: '1.25rem', flexShrink: 0 }}>info</span>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.45, margin: 0, flex: 1 }}>
            <strong style={{ color: 'var(--color-secondary)' }}>Aviso:</strong> Temporalmente los domicilios están disponibles <strong>solo para los edificios Hub 72 y Alma 72</strong> mientras mejoramos nuestra logística.
          </p>
        </div>

        {status !== 'valid' && (
          <>
            <datalist id="address-predictions">
              <option value="Edificio Hub 72" />
              <option value="Edificio Alma 72" />
              <option value="Carrera 26 # 71B - 30" />
            </datalist>

            <div className="addr-field">
              <label htmlFor="addr-street">Calle / Carrera / Edificio *</label>
              <input
                id="addr-street"
                type="text"
                list="address-predictions"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Ej: Edificio Hub 72"
                disabled={status === 'loading'}
                autoComplete="off"
              />
            </div>

            <div className="addr-field">
              <label htmlFor="addr-complement">Apartamento / Complemento</label>
              <input
                id="addr-complement"
                type="text"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                placeholder="Apto 301, Torre B…"
                disabled={status === 'loading'}
              />
            </div>

            <div className="addr-field">
              <label htmlFor="addr-neighborhood">Barrio</label>
              <input
                id="addr-neighborhood"
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="Ej: Chapinero, Teusaquillo…"
                disabled={status === 'loading'}
              />
            </div>

            <div className="addr-actions">
              <button
                id="btn-validate-address"
                className="btn-validate"
                onClick={handleValidateAddress}
                disabled={status === 'loading'}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 15 }}>map</span>
                Verificar Cobertura
              </button>

              <button
                id="btn-detect-location"
                className="btn-detect"
                onClick={handleDetectLocation}
                disabled={status === 'loading'}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 13 }}>my_location</span>
                Detectar mi Ubicación
              </button>
            </div>
          </>
        )}

        <StatusBadge />

        {(status === 'valid' || status === 'out_of_range') && (
          <>
            {displayAddress && (
              <p style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)', opacity: 0.65, lineHeight: 1.5 }}>
                📍 {displayAddress}
              </p>
            )}
            <button className="btn-reset" onClick={handleReset} id="btn-reset-address">
              Cambiar dirección
            </button>
          </>
        )}
      </div>
    </>
  );
}
