import React, { useState } from 'react';

const API_URL = 'https://billing.dommatos.com/api/public/cotizaciones';

// Calcula la fecha de vencimiento (30 días desde hoy)
function getExpiryDate() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

export default function CheckoutModal({ cart, cartTotal, onClose, onSuccess }) {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    descripcion: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // null | { ok: true, data } | { ok: false, message }

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = 'El nombre es obligatorio';
    if (!form.email.trim()) {
      e.email = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Correo electrónico inválido';
    }
    if (!form.telefono.trim()) {
      e.telefono = 'El teléfono es obligatorio';
    } else if (!/^\+?\d{7,15}$/.test(form.telefono.replace(/[\s\-\(\)]/g, ''))) {
      e.telefono = 'Teléfono inválido (7-15 dígitos)';
    }
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const buildPayload = () => {
    const detalles = cart.map((item) => ({
      producto_id: item.id,
      cantidad: item.quantity,
      precio_unitario_cotizado: Number(item.price ?? item.precio_venta_base ?? 0),
    }));

    const notasCliente = form.descripcion.trim()
      ? `Pago contra entrega. ${form.descripcion.trim()}`
      : 'Pago contra entrega. Compra de productos seleccionados en tienda.';

    return {
      prospecto_nombre: form.nombre.trim(),
      prospecto_email: form.email.trim(),
      prospecto_telefono: form.telefono.trim(),
      fecha_vencimiento: getExpiryDate(),
      notas_cliente: notasCliente,
      detalles,
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
        onSuccess && onSuccess(data.data);
      } else {
        setResult({ ok: false, message: data.message || 'Ocurrió un error al procesar tu pedido.' });
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
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />

        <div className="relative z-10 w-full max-w-md bg-surface-container border border-outline-variant/30 rounded-xl shadow-2xl p-8 text-center space-y-6 animate-[fadeInUp_0.4s_ease-out]">
          {result.ok ? (
            <>
              <span
                className="material-symbols-outlined text-secondary block mx-auto"
                style={{ fontSize: 72, fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                ¡Pedido Recibido!
              </h2>
              <p className="font-body-md text-on-surface-variant">
                Hemos recibido tu pedido correctamente. El pago se realizará <strong className="text-secondary">contra entrega</strong>.
                Próximamente confirmaremos tu pedido — nuestro equipo ya está trabajando en ello.
              </p>
              <div className="bg-surface-container-high rounded-lg p-4 text-left space-y-2 border border-secondary/20">
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-1">Detalles del pedido</p>
                <p className="font-body-md text-on-surface-variant text-sm">
                  <span className="text-on-surface font-medium">N° Cotización:</span> #{result.data.cotizacion_id}
                </p>
                <p className="font-body-md text-on-surface-variant text-sm">
                  <span className="text-on-surface font-medium">Total:</span>{' '}
                  <span className="text-secondary font-semibold">
                    ${Number(result.data.total_cotizacion).toLocaleString('es-CO')}
                  </span>
                </p>
                <p className="font-body-md text-on-surface-variant text-sm">
                  <span className="text-on-surface font-medium">Cliente:</span> {result.data.prospecto_nombre}
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
                Continuar Comprando
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
                Error al Procesar
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

  // ─── Formulario ──────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg max-h-[90vh] flex flex-col bg-surface-container border border-outline-variant/30 rounded-xl shadow-2xl overflow-hidden animate-[fadeInUp_0.35s_ease-out]">
        {/* Header */}
        <div className="px-8 pt-8 pb-5 border-b border-outline-variant/20 flex items-start justify-between gap-4 flex-shrink-0">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-1">
              Pago Contra Entrega
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Datos del Cliente
            </h2>
            <p className="font-body-md text-on-surface-variant text-sm mt-1">
              Completa la información para confirmar tu pedido de{' '}
              <span className="text-secondary font-semibold">
                ${cartTotal.toLocaleString('es-CO', { minimumFractionDigits: 0 })}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-variant/20 text-on-surface-variant hover:text-secondary transition-all flex-shrink-0"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Resumen de productos */}
          <div className="px-8 py-4 bg-surface-container-low border-b border-outline-variant/10">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-3">
              Resumen del Pedido
            </p>
            <div className="space-y-2 max-h-28 overflow-y-auto custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded overflow-hidden bg-surface flex-shrink-0">
                      <img
                        src={item.image ?? item.foto_url ?? ''}
                        alt={item.name ?? item.nombre ?? ''}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-body-md text-on-surface-variant truncate">
                      {item.name ?? item.nombre ?? ''}
                    </span>
                    <span className="text-on-surface-variant/60 flex-shrink-0">×{item.quantity}</span>
                  </div>
                  <span className="font-label-md text-secondary flex-shrink-0">
                    ${(Number(item.price ?? item.precio_venta_base ?? 0) * item.quantity).toLocaleString('es-CO')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5" noValidate>
            {/* Nombre */}
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2" htmlFor="checkout-nombre">
                Nombre Completo <span className="text-secondary">*</span>
              </label>
              <input
                id="checkout-nombre"
                name="nombre"
                type="text"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre y apellido"
                className={`w-full bg-surface-container-low border rounded-sm px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-colors focus:ring-0 ${
                  errors.nombre ? 'border-error focus:border-error' : 'border-outline-variant/40 focus:border-secondary'
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
              <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2" htmlFor="checkout-email">
                Correo Electrónico <span className="text-secondary">*</span>
              </label>
              <input
                id="checkout-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                className={`w-full bg-surface-container-low border rounded-sm px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-colors focus:ring-0 ${
                  errors.email ? 'border-error focus:border-error' : 'border-outline-variant/40 focus:border-secondary'
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
              <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2" htmlFor="checkout-telefono">
                Teléfono <span className="text-secondary">*</span>
              </label>
              <input
                id="checkout-telefono"
                name="telefono"
                type="tel"
                value={form.telefono}
                onChange={handleChange}
                placeholder="3001234567"
                className={`w-full bg-surface-container-low border rounded-sm px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-colors focus:ring-0 ${
                  errors.telefono ? 'border-error focus:border-error' : 'border-outline-variant/40 focus:border-secondary'
                }`}
              />
              {errors.telefono && (
                <p className="text-error text-xs mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">error</span>
                  {errors.telefono}
                </p>
              )}
            </div>

            {/* Descripción (opcional) */}
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2" htmlFor="checkout-descripcion">
                Descripción <span className="text-on-surface-variant/40 text-[10px] normal-case">Opcional</span>
              </label>
              <textarea
                id="checkout-descripcion"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Notas adicionales para tu pedido..."
                rows={3}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-sm px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-colors focus:border-secondary focus:ring-0 resize-none"
              />
            </div>

            {/* Info contra entrega */}
            <div className="flex items-start gap-3 bg-secondary/5 border border-secondary/20 rounded-lg p-4">
              <span className="material-symbols-outlined text-secondary flex-shrink-0 mt-0.5" style={{ fontSize: 20 }}>
                local_shipping
              </span>
              <div>
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wide">Pago Contra Entrega</p>
                <p className="font-body-md text-on-surface-variant text-xs mt-0.5">
                  Pagas al recibir tu pedido. Confirmaremos tu orden próximamente.
                </p>
              </div>
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              id="btn-submit-checkout"
              disabled={loading}
              className="w-full py-4 bg-secondary text-background font-label-md uppercase tracking-widest hover:bg-secondary/90 transition-all rounded-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">shopping_bag</span>
                  Confirmar Pedido
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e9c176; border-radius: 2px; }
      `}</style>
    </div>
  );
}
