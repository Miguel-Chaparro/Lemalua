import React from 'react';
import { useCart } from '../context/CartContext';
import { useCatalog } from '../context/CatalogContext';
import LoadingSpinner from './LoadingSpinner';

export default function Promotions({ onSelectProduct }) {
  const { addToCart, cart } = useCart();
  const { categories, products, isLoadingInitial } = useCatalog();

  const isInCart = (id) => cart.some((i) => i.id === id);

  if (isLoadingInitial) {
    return <LoadingSpinner message="Cargando selecciones de temporada..." />;
  }

  // Encontrar la categoría Temporada
  const temporadaCategory = categories.find(c => c.nombre.toLowerCase().includes('temporada'));
  
  // Si no hay categoría Temporada, podemos mostrar un mensaje o simplemente no mostrar nada
  if (!temporadaCategory) {
    return null; 
  }

  // Obtener productos de esa categoría
  const promoProducts = products.filter(p => p.categoria_id === temporadaCategory.id);

  if (promoProducts.length === 0) {
    return null;
  }

  // Separar el primer producto para que sea el grande (Bento master) y el resto para el stack
  const bentoProduct = promoProducts[0];
  const stackedProducts = promoProducts.slice(1, 3); // Máximo 2 para el stack

  return (
    <section id="promotions" className="py-margin-desktop bg-background px-4 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-2">Tiempo Limitado</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">{temporadaCategory.nombre}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">{temporadaCategory.descripcion || 'Ofertas exclusivas por tiempo limitado en etiquetas premium.'}</p>
          </div>
          <a className="hidden md:block font-label-md text-secondary border-b border-secondary hover:opacity-80 transition-opacity" href="/catalogo">
            Ver colección completa
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Left Large Card (Bento Masterpiece) */}
          {bentoProduct && (
            <div 
              key={bentoProduct.id}
              onClick={() => onSelectProduct(bentoProduct)}
              className="relative h-[600px] bg-surface-container border border-secondary/20 overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                src={bentoProduct.foto_url}
                alt={bentoProduct.nombre}
              />
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 space-y-4">
                <div className="flex items-center gap-2 text-secondary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span className="text-label-sm uppercase tracking-widest font-bold">Destacado</span>
                </div>
                <h3 className="font-display-lg text-4xl text-on-surface">
                  {bentoProduct.nombre}
                </h3>
                <p className="font-body-md text-on-surface-variant max-w-md line-clamp-3">
                  {bentoProduct.descripcion}
                </p>
                <div className="pt-4 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                  <span className="font-headline-sm text-headline-sm text-secondary">
                    ${Number(bentoProduct.precio_venta_base).toFixed(2)}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(bentoProduct);
                    }}
                    className="px-8 py-3 bg-secondary text-background font-label-md uppercase tracking-widest hover:bg-white transition-colors duration-300"
                  >
                    {isInCart(bentoProduct.id) ? 'Añadido' : 'Añadir al Carrito'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right Cards Stack */}
          {stackedProducts.length > 0 && (
            <div className="grid grid-rows-2 gap-gutter">
              {stackedProducts.map((product, index) => {
                const isSecond = index === 1;
                const inCart = isInCart(product.id);
                return (
                  <div 
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="relative bg-surface-container border border-outline-variant/10 overflow-hidden group p-8 flex flex-col justify-end cursor-pointer h-[290px] md:h-auto"
                  >
                    {isSecond ? (
                      /* Bottom Card with background pattern opacity */
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-20 transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${product.foto_url}')` }}
                      />
                    ) : (
                      /* Top Card with image element */
                      <img
                        className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                        src={product.foto_url}
                        alt={product.nombre}
                      />
                    )}
                    
                    <div className="relative z-10 flex flex-col h-full justify-end">
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-widest">
                        {product.marca}
                      </span>
                      <h4 className="font-headline-sm text-headline-sm mt-2 line-clamp-2">
                        {product.nombre}
                      </h4>
                      <p className="text-secondary font-headline-sm text-headline-sm mt-2 mb-4">
                        ${Number(product.precio_venta_base).toFixed(2)}
                      </p>
                      
                      <div className="flex justify-between items-center mt-auto" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProduct(product);
                          }}
                          className="text-label-md text-secondary border-b border-secondary hover:text-white hover:border-white transition-all uppercase tracking-widest"
                        >
                          Ver Detalles
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className={`p-2 rounded-full border transition-all duration-300 active:scale-95 flex items-center justify-center ${
                            inCart
                              ? 'border-secondary bg-secondary/10 text-secondary'
                              : 'border-secondary text-secondary hover:bg-secondary hover:text-primary-container bg-transparent'
                          }`}
                          title={inCart ? 'Ya en el carrito' : 'Añadir al carrito'}
                        >
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: inCart ? "'FILL' 1" : "'FILL' 0" }}>
                            {inCart ? 'shopping_cart' : 'add_shopping_cart'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
