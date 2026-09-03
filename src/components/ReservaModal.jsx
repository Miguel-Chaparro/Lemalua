import React, { useState } from 'react';

const API_URL = 'https://billing.dommatos.com/api/public/cotizaciones';

// Retorna fecha mínima: mañana a las 00:00
function getMinDateTime() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  // formato para datetime-local: YYYY-MM-DDTHH:MM
  return d.toISOString().slice(0, 16);
}

// Calcula fecha de vencimiento de la cotización (30 días)
function getExpiryDate() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

// Formatea datetime para notas
function formatDateTime(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ReservaModal({ onClose }) {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fechaHora: '',
    personas: 1,
    detalles: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const minDateTime = getMinDateTime();

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = 'El nombre es obligatorio';
    if (!form.email.trim()) {
      e.email = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Correo electrónico inválido';
    }
    if (!form.telefono.trim()) {
      e.telefono = 'El teléfono es obligatorio';
    } else if (!/^\d{7,15}$/.test(form.telefono.replace(/\s/g, ''))) {
      e.telefono = 'Teléfono inválido (7-15 dígitos)';
    }
    if (!form.fechaHora) {
      e.fechaHora = 'La fecha y hora son obligatorias';
    } else {
      const selected = new Date(form.fechaHora);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      if (selected < tomorrow) e.fechaHora = 'La fecha debe ser posterior a hoy';
    }
    if (!form.personas || form.personas < 1) e.personas = 'Mínimo 1 persona';
    if (form.personas > 20) e.personas = 'Máximo 20 personas';
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Math.min(20, Math.max(1, Number(value))) : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const buildPayload = () => {
    const fechaFormateada = formatDateTime(form.fechaHora);
    const detallesTexto = form.detalles.trim()
      ? form.detalles.trim()
      : 'Sin detalles adicionales.';

    const notasCliente = [
      `RESERVA DE SITIO`,
      `Fecha y hora: ${fechaFormateada}`,
      `Estimado de personas: ${form.personas} persona(s) (máximo 20)`,
      `Detalles adicionales: ${detallesTexto}`,
    ].join('\n');

    return {
      prospecto_nombre: form.nombre.trim(),
      prospecto_email: form.email.trim(),
      prospecto_telefono: form.telefono.trim(),
      fecha_vencimiento: getExpiryDate(),
      notas_cliente: notasCliente,
      detalles: [
        {
          producto_id: 1, // Producto genérico de reserva
          cantidad: form.personas,
          precio_unitario_cotizado: 0,
        },
      ],
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setResult({ ok: true, data: data.data });
      } else {
        setResult({ ok: false, message: data.message || 'Ocurrió un error al registrar tu reserva.' });
      }
    } catch {
      setResult({ ok: false, message: 'No se pudo conectar con el servidor. Por favor intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  // ─── Pantalla de resultado ────────────────────────────────────────────────
  if (result) {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />
        <div className="relative z-10 w-full max-w-md bg-surface-container border border-outline-variant/30 rounded-xl shadow-2xl p-8 text-center space-y-6 animate-[fadeInUp_0.4s_ease-out]">
          {result.ok ? (
            <>
              <span
                className="material-symbols-outlined text-secondary block mx-auto"
                style={{ fontSize: 72, fontVariationSettings: "'FILL' 1" }}
              >
                event_available
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                ¡Reserva Registrada!
              </h2>
              <p className="font-body-md text-on-surface-variant">
                Tu solicitud de reserva fue recibida exitosamente. Nuestro equipo la revisará y te confirmará la disponibilidad.
              </p>
              <div className="bg-surface-container-high rounded-lg p-4 text-left space-y-2 border border-secondary/20">
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-1">Detalles de la reserva</p>
                <p className="font-body-md text-on-surface-variant text-sm">
                  <span className="text-on-surface font-medium">N° Reserva:</span> #{result.data.cotizacion_id}
                </p>
                <p className="font-body-md text-on-surface-variant text-sm">
                  <span className="text-on-surface font-medium">Nombre:</span> {result.data.prospecto_nombre}
                </p>
                <p className="font-body-md text-on-surface-variant text-sm">
                  <span className="text-on-surface font-medium">Fecha:</span>{' '}
                  {form.fechaHora ? formatDateTime(form.fechaHora) : '—'}
                </p>
                <p className="font-body-md text-on-surface-variant text-sm">
                  <span className="text-on-surface font-medium">Personas:</span> {form.personas}
                </p>
              </div>
              <div className="bg-surface-container-lowest rounded-lg p-4 border border-outline-variant/20 text-left space-y-1">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Horario de atención</p>
                <p className="font-body-md text-on-surface-variant text-sm">
                  🕐 Lun – Vie: 8:00 a.m. – 6:00 p.m. · Sáb: 9:00 a.m. – 2:00 p.m.
                </p>
                <p className="font-body-md text-on-surface-variant text-sm">
                  Cualquier novedad será respondida en la menor brevedad posible dentro del horario hábil de oficina.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 bg-secondary text-background font-label-md uppercase tracking-widest hover:bg-secondary/90 transition-all rounded-sm"
              >
                Cerrar
              </button>
            </>
          ) : (
            <>
              <span
                className="material-symbols-outlined text-error block mx-auto"
                style={{ fontSize: 72, fontVariationSettings: "'FILL' 1" }}
              >
                error
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Error al Registrar
              </h2>
              <p className="font-body-md text-on-surface-variant">
                {result.message}
              </p>
              <div className="bg-surface-container-lowest rounded-lg p-4 border border-outline-variant/20 text-left space-y-1">
                <p className="font-body-md text-on-surface-variant text-sm">
                  Este caso será revisado por nuestro equipo. Cualquier novedad será contestada en la menor brevedad dentro del horario hábil de oficina.
                </p>
                <p className="font-label-sm text-label-sm text-on-surface-variant text-xs mt-1">
                  🕐 Lun – Vie: 8:00 a.m. – 6:00 p.m.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 py-3 border border-secondary text-secondary font-label-md uppercase tracking-widest hover:bg-secondary/10 transition-all rounded-sm"
                >
                  Reintentar
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 border border-outline-variant text-on-surface-variant font-label-md uppercase tracking-widest hover:border-secondary/50 transition-all rounded-sm"
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  // ─── Formulario de Reserva ────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-surface-container border border-outline-variant/30 rounded-xl shadow-2xl overflow-hidden animate-[fadeInUp_0.35s_ease-out] my-auto">
        {/* Header */}
        <div className="px-8 pt-8 pb-5 border-b border-outline-variant/20 flex items-start justify-between gap-4">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-1">
              Reserva de Sitio
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Agenda tu Visita
            </h2>
            <p className="font-body-md text-on-surface-variant text-sm mt-1">
              Reserva tu lugar en Lemalua Pub & Boutique. Confirmaremos disponibilidad a la brevedad.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-variant/20 text-on-surface-variant hover:text-secondary transition-all flex-shrink-0"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5" noValidate>
          {/* Nombre */}
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2" htmlFor="reserva-nombre">
              Nombre Completo <span className="text-secondary">*</span>
            </label>
            <input
              id="reserva-nombre"
              name="nombre"
              type="text"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Tu nombre y apellido"
              className={`w-full bg-surface-container-low border rounded-sm px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-colors focus:ring-0 ${
                errors.nombre ? 'border-error' : 'border-outline-variant/40 focus:border-secondary'
              }`}
            />
            {errors.nombre && (
              <p className="text-error text-xs mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">error</span>
                {errors.nombre}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2" htmlFor="reserva-email">
              Correo Electrónico <span className="text-secondary">*</span>
            </label>
            <input
              id="reserva-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              className={`w-full bg-surface-container-low border rounded-sm px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-colors focus:ring-0 ${
                errors.email ? 'border-error' : 'border-outline-variant/40 focus:border-secondary'
              }`}
            />
            {errors.email && (
              <p className="text-error text-xs mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">error</span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2" htmlFor="reserva-telefono">
              Teléfono <span className="text-secondary">*</span>
            </label>
            <input
              id="reserva-telefono"
              name="telefono"
              type="tel"
              value={form.telefono}
              onChange={handleChange}
              placeholder="3001234567"
              className={`w-full bg-surface-container-low border rounded-sm px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-colors focus:ring-0 ${
                errors.telefono ? 'border-error' : 'border-outline-variant/40 focus:border-secondary'
              }`}
            />
            {errors.telefono && (
              <p className="text-error text-xs mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">error</span>
                {errors.telefono}
              </p>
            )}
          </div>

          {/* Fecha y Hora */}
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2" htmlFor="reserva-fechaHora">
              Fecha y Hora <span className="text-secondary">*</span>
            </label>
            <input
              id="reserva-fechaHora"
              name="fechaHora"
              type="datetime-local"
              value={form.fechaHora}
              onChange={handleChange}
              min={minDateTime}
              className={`w-full bg-surface-container-low border rounded-sm px-4 py-3 text-on-surface outline-none transition-colors focus:ring-0 ${
                errors.fechaHora ? 'border-error' : 'border-outline-variant/40 focus:border-secondary'
              } [color-scheme:dark]`}
            />
            {errors.fechaHora && (
              <p className="text-error text-xs mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">error</span>
                {errors.fechaHora}
              </p>
            )}
          </div>

          {/* Número de personas */}
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2" htmlFor="reserva-personas">
              Número de Personas <span className="text-secondary">*</span>
              <span className="text-on-surface-variant/40 text-[10px] normal-case ml-1">(máx. 20)</span>
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const newVal = Math.max(1, form.personas - 1);
                  setForm((p) => ({ ...p, personas: newVal }));
                  if (errors.personas) setErrors((p) => ({ ...p, personas: undefined }));
                }}
                className="w-10 h-10 border border-outline-variant/40 hover:border-secondary hover:text-secondary text-on-surface-variant flex items-center justify-center rounded-sm transition-all"
              >
                <span className="material-symbols-outlined text-base">remove</span>
              </button>
              <input
                id="reserva-personas"
                name="personas"
                type="number"
                min={1}
                max={20}
                value={form.personas}
                onChange={handleChange}
                className={`flex-1 bg-surface-container-low border rounded-sm px-4 py-2 text-on-surface text-center outline-none transition-colors focus:ring-0 ${
                  errors.personas ? 'border-error' : 'border-outline-variant/40 focus:border-secondary'
                }`}
              />
              <button
                type="button"
                onClick={() => {
                  const newVal = Math.min(20, form.personas + 1);
                  setForm((p) => ({ ...p, personas: newVal }));
                  if (errors.personas) setErrors((p) => ({ ...p, personas: undefined }));
                }}
                className="w-10 h-10 border border-outline-variant/40 hover:border-secondary hover:text-secondary text-on-surface-variant flex items-center justify-center rounded-sm transition-all"
              >
                <span className="material-symbols-outlined text-base">add</span>
              </button>
            </div>
            {errors.personas && (
              <p className="text-error text-xs mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">error</span>
                {errors.personas}
              </p>
            )}
            {/* Barra visual de capacidad */}
            <div className="mt-2 h-1.5 bg-surface-container-low rounded-full overflow-hidden border border-outline-variant/10">
              <div
                className="h-full bg-secondary transition-all duration-300 rounded-full"
                style={{ width: `${(form.personas / 20) * 100}%` }}
              />
            </div>
            <p className="text-xs text-on-surface-variant/50 mt-1 text-right">{form.personas}/20 personas</p>
          </div>

          {/* Detalles adicionales */}
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2" htmlFor="reserva-detalles">
              Detalles Adicionales{' '}
              <span className="text-on-surface-variant/40 text-[10px] normal-case">Opcional</span>
            </label>
            <textarea
              id="reserva-detalles"
              name="detalles"
              value={form.detalles}
              onChange={handleChange}
              placeholder="Ocasión especial, requerimientos dietéticos, preferencias de mesa..."
              rows={3}
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-sm px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-colors focus:border-secondary focus:ring-0 resize-none"
            />
          </div>

          {/* Aviso */}
          <div className="flex items-start gap-3 bg-secondary/5 border border-secondary/20 rounded-lg p-4">
            <span className="material-symbols-outlined text-secondary flex-shrink-0 mt-0.5" style={{ fontSize: 20 }}>
              info
            </span>
            <p className="font-body-md text-on-surface-variant text-xs">
              Tu solicitud de reserva será revisada por nuestro equipo. Recibirás confirmación de disponibilidad por correo electrónico en el horario hábil de oficina.
            </p>
          </div>

          {/* Botón submit */}
          <button
            type="submit"
            id="btn-submit-reserva"
            disabled={loading}
            className="w-full py-4 bg-secondary text-background font-label-md uppercase tracking-widest hover:bg-secondary/90 transition-all rounded-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                Registrando Reserva...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">event_available</span>
                Solicitar Reserva
              </>
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
