import React from 'react';
import { useCart } from '../context/CartContext';

const promoProducts = [
  {
    id: 'promo-1',
    name: 'Reserva Real Single Malt',
    category: 'Whisky Single Malt',
    description: 'Notas de roble, vainilla y un final ahumado persistente. Procedente de las Highlands escocesas, elaborado en destilerías de herencia centenaria.',
    price: 145.00,
    oldPrice: 180.00,
    badge: '-20%',
    rating: 4.8,
    tags: ['Highlands', 'Single Malt', 'Ahumado'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO4APdl9_bzmrr43Tv_uvk926jfVO8_At3pwpuAXBSRgg5p6lXdd49RmqPEMV9lqkIOoust_h571L-i2V8hBhEP_ea0Nu9cZIWXJVF5N9YGBmq15o7Va6DA5-M8RCaYI6cwVfTchMH8d04jLFPUONikE9UA7zdbJMACg-mvugEPmxKkQOvMcqHO_ikRiKSHgPab75uaOT_Mg-AOdmGU2XmL18Tr6-zajgj9dT8oHsVzwhKIp6xS3BDFnenAvyStyPc1wH57nqEtZA'
  },
  {
    id: 'promo-2',
    name: 'Ginebra Botánica Premium',
    category: 'Ginebra London Dry',
    description: 'Destilada con 12 botánicos seleccionados a mano: enebro, piel de naranja, lavanda y cardamomo. London Dry de perfil floral y especiado.',
    price: 52.00,
    oldPrice: 65.00,
    badge: 'Oferta Especial',
    rating: 4.5,
    tags: ['London Dry', 'Botánica', '42% ABV'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLbNjX5Cb1T9zH9O3jJ8dsX9x-aKHefh9fzEW1lp6NnmmRjdM7PJAJSRL84N3zt1k-Hp1e-1cZzeFDA9LEtWaTDWFfWazEozSAXiBXZRg2oH8uMPZndajyXM5RIyAaxojF4Bu9WurpyAg48ticDEFavfj0zkXDRZMpfOH_VRPJO_jdUbXNjbWiMJQCpolukJSBSLTrboB_K04U8tXH8IFpdWw95R-GYoZlrcgR3yPA54cfMbZ0256kcGXMEZyUsCJuYI0qcM39Co8'
  },
  {
    id: 'promo-3',
    name: 'Tequila Añejo Gran Oro',
    category: 'Tequila Añejo',
    description: 'Madurado por 3 años en barricas de roble francés. 100% agave azul de los Altos de Jalisco. Notas de caramelo, coco y madera tostada.',
    price: 89.00,
    oldPrice: 105.00,
    badge: '-15%',
    rating: 4.7,
    tags: ['100% Agave', 'Jalisco', 'Roble Francés'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3jgwby9dCJXOudqttBaWcCYtZ4XHgv3KdmHvYLaug5Fs58ccdQ9cMQxa24oUE5wVgkE4a-vR_c_JmEb8IHtdmKwrxSUwNcdTR6Wunt_Q08SPEcCVJjTzZ2fzMFZssfXxZ-hH3yHcqrqiIZfrNhieV4176Nylzr7ALKOqQwmkJABbcdDtbT1fHOZQDv4BFcPuoORSkWyOVvFK6CUlBQI4A09sVMx5IUa_OWdxRSKUdkopbjth-I0JBG35qMHVAO-ArIOQ98wyz4k0'
  }
];

export default function Promotions({ onSelectProduct }) {
  const { addToCart, cart } = useCart();

  const isInCart = (id) => cart.some((i) => i.id === id);

  return (
    <section id="promotions" className="py-margin-desktop bg-background px-4 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-2">Tiempo Limitado</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Selecciones de Temporada</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Ofertas exclusivas por tiempo limitado en etiquetas premium.</p>
          </div>
          <a className="hidden md:block font-label-md text-secondary border-b border-secondary hover:opacity-80 transition-opacity" href="#shop">
            Ver todas las ofertas
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {promoProducts.map((product) => {
            const inCart = isInCart(product.id);
            return (
              <div
                key={product.id}
                className="bg-surface-container-low border border-outline-variant/20 p-6 flex flex-col luxury-card-hover group cursor-pointer relative overflow-hidden"
                onClick={() => onSelectProduct(product)}
                role="button"
                tabIndex={0}
                id={`promo-card-${product.id}`}
                aria-label={`Ver detalle de ${product.name}`}
                onKeyDown={(e) => { if (e.key === 'Enter') onSelectProduct(product); }}
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/3 transition-colors duration-300 pointer-events-none" />

                {/* In-Cart indicator */}
                {inCart && (
                  <span className="absolute top-3 right-3 z-20 bg-secondary text-primary-container w-7 h-7 rounded-full flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </span>
                )}

                <div className="relative mb-6 overflow-hidden aspect-[4/5] bg-surface-container flex items-center justify-center rounded-md">
                  <span className="absolute top-4 left-4 bg-secondary text-primary-container font-label-sm px-3 py-1 z-10 uppercase tracking-wider text-xs">
                    {product.badge}
                  </span>
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={product.image}
                  />
                  {/* Zoom hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/30">
                    <div className="bg-surface-container/80 backdrop-blur-sm px-4 py-2 flex items-center gap-2 border border-outline-variant/30">
                      <span className="material-symbols-outlined text-secondary text-lg">zoom_in</span>
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Ver Detalle</span>
                    </div>
                  </div>
                </div>

                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-1 block">{product.category}</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{product.name}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mt-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-col">
                    <span className="text-secondary font-headline-sm">${product.price.toFixed(2)}</span>
                    <span className="text-on-surface-variant/50 line-through text-sm">${product.oldPrice.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    id={`btn-promo-add-${product.id}`}
                    className={`p-3 rounded-full border transition-all duration-300 active:scale-95 flex items-center justify-center ${
                      inCart
                        ? 'border-secondary bg-secondary/10 text-secondary'
                        : 'border-secondary text-secondary hover:bg-secondary hover:text-primary-container bg-transparent'
                    }`}
                    title={inCart ? 'Ya en el carrito' : 'Añadir al carrito'}
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: inCart ? "'FILL' 1" : "'FILL' 0" }}>
                      {inCart ? 'shopping_cart' : 'add_shopping_cart'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
