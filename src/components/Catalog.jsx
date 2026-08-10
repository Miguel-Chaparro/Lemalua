import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useCatalog } from '../context/CatalogContext';
import LoadingSpinner from './LoadingSpinner';

export default function Catalog({ onSelectProduct }) {
  const { addToCart } = useCart();
  const { categories, products, isLoadingInitial } = useCatalog();
  
  const [activeCategory, setActiveCategory] = useState('');
  const [sortBy, setSortBy] = useState('relevancia');
  const [addedProductIds, setAddedProductIds] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  
  // Ref map dinámico para las secciones
  const sectionRefs = useRef({});

  // Inicializar categoría activa cuando se carguen
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id.toString());
    }
  }, [categories, activeCategory]);

  // ── Intersection Observer para resaltar la categoría activa según scroll ──
  useEffect(() => {
    if (searchQuery) return; // Deshabilitar durante búsqueda global

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0.05
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id.replace('section-', ''));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    Object.values(sectionRefs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [categories, searchQuery]);

  const handleCategoryClick = (categoryId, e) => {
    e.preventDefault();
    setActiveCategory(categoryId.toString());
    setSearchQuery(''); // Limpiar búsqueda si se hace click en una categoría
    
    const targetRef = sectionRefs.current[categoryId];
    if (targetRef) {
      const offset = 100;
      const targetPosition = targetRef.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCartWithFeedback = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    
    setAddedProductIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProductIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // Filtrado general de búsqueda
  const getFilteredProducts = () => {
    if (!searchQuery) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(p => 
      p.nombre?.toLowerCase().includes(query) || 
      p.marca?.toLowerCase().includes(query) ||
      p.descripcion?.toLowerCase().includes(query)
    );
  };

  // Obtener y ordenar productos dinámicamente
  const getSortedProducts = (productList) => {
    if (sortBy === 'price-asc') {
      return [...productList].sort((a, b) => Number(a.precio_venta_base) - Number(b.precio_venta_base));
    }
    if (sortBy === 'price-desc') {
      return [...productList].sort((a, b) => Number(b.precio_venta_base) - Number(a.precio_venta_base));
    }
    return productList;
  };

  if (isLoadingInitial) {
    return (
      <div className="pt-24">
        <LoadingSpinner message="Cargando el catálogo completo..." />
      </div>
    );
  }

  const searchedProducts = searchQuery ? getSortedProducts(getFilteredProducts()) : [];

  return (
    <>
      {/* Hero Section / Header */}
      <header className="px-6 md:px-margin-desktop max-w-container-max mx-auto py-12 md:py-20 border-b border-outline-variant/10">
        <div className="max-w-2xl">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6">La Colección</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant italic">
            Una curaduría exhaustiva para el paladar exigente. Desde whiskies de malta única hasta ediciones raras recolectadas en los rincones más profundos del mundo.
          </p>
        </div>
      </header>

      {/* Catalog Container */}
      <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto flex flex-col lg:flex-row gap-gutter py-12">
        
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
          <div className="sticky top-28">
            
            {/* Buscador */}
            <div className="mb-8">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Buscar en la colección..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/30 text-on-surface pl-10 pr-4 py-3 focus:outline-none focus:border-secondary transition-colors"
                />
              </div>
            </div>

            <h3 className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant mb-6">
              Categorías
            </h3>
            <ul className="space-y-4">
              {categories.map((cat, index) => {
                const catIdStr = cat.id.toString();
                const isActive = activeCategory === catIdStr && !searchQuery;
                const formatNumber = (num) => num < 10 ? `0${num}` : num;
                return (
                  <li key={cat.id}>
                    <a
                      onClick={(e) => handleCategoryClick(cat.id, e)}
                      className={`font-headline-sm text-headline-sm hover:text-secondary transition-colors flex items-center justify-between group cursor-pointer ${
                        isActive ? 'text-secondary font-medium' : 'text-on-surface-variant'
                      }`}
                      href={`#section-${cat.id}`}
                    >
                      {cat.nombre}
                      <span 
                        className={`text-label-sm transition-all duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        {formatNumber(index + 1)}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="pt-8 mt-8 border-t border-outline-variant/20">
              <h3 className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant mb-6">
                Ordenar por
              </h3>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="form-radio bg-transparent border-outline-variant text-secondary focus:ring-secondary/20"
                    name="sort"
                    type="radio"
                    checked={sortBy === 'relevancia'}
                    onChange={() => setSortBy('relevancia')}
                  />
                  <span className="text-label-md text-on-surface group-hover:text-secondary transition-colors">
                    Relevancia
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="form-radio bg-transparent border-outline-variant text-secondary focus:ring-secondary/20"
                    name="sort"
                    type="radio"
                    checked={sortBy === 'price-asc'}
                    onChange={() => setSortBy('price-asc')}
                  />
                  <span className="text-label-md text-on-surface group-hover:text-secondary transition-colors">
                    Precio: Menor a Mayor
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="form-radio bg-transparent border-outline-variant text-secondary focus:ring-secondary/20"
                    name="sort"
                    type="radio"
                    checked={sortBy === 'price-desc'}
                    onChange={() => setSortBy('price-desc')}
                  />
                  <span className="text-label-md text-on-surface group-hover:text-secondary transition-colors">
                    Precio: Mayor a Menor
                  </span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Display Area */}
        <div className="flex-grow">
          
          {searchQuery ? (
            /* Resultados de búsqueda global */
            <section className="mb-20">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10 border-b border-outline-variant/10 pb-4">
                <h2 className="font-display-lg text-[32px] md:text-headline-md">Resultados de búsqueda</h2>
                <p className="font-body-md text-on-surface-variant italic max-w-md">
                  {searchedProducts.length} productos encontrados para "{searchQuery}"
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-gutter gap-y-12">
                {searchedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} isAdded={addedProductIds[product.id]} onSelectProduct={onSelectProduct} handleAddToCartWithFeedback={handleAddToCartWithFeedback} />
                ))}
              </div>
              {searchedProducts.length === 0 && (
                <div className="text-center py-20 text-on-surface-variant">
                  No se encontraron productos que coincidan con tu búsqueda.
                </div>
              )}
            </section>
          ) : (
            /* Mostrar por categorías */
            categories.map(category => {
              const categoryProducts = getSortedProducts(products.filter(p => p.categoria_id === category.id));
              if (categoryProducts.length === 0) return null;

              const isBento = category.nombre.toLowerCase().includes('temporada') || category.nombre.toLowerCase().includes('oferta');

              return (
                <section 
                  key={category.id}
                  id={`section-${category.id}`}
                  ref={(el) => sectionRefs.current[category.id] = el}
                  className="mb-20 scroll-mt-24 transition-all duration-1000"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10 border-b border-outline-variant/10 pb-4">
                    <h2 className={`font-display-lg text-[32px] md:text-headline-md ${isBento ? 'text-secondary' : ''}`}>
                      {category.nombre}
                    </h2>
                    <p className="font-body-md text-on-surface-variant italic max-w-md">
                      {category.descripcion}
                    </p>
                  </div>
                  
                  {isBento ? (
                    <BentoGrid 
                      products={categoryProducts} 
                      addedProductIds={addedProductIds} 
                      onSelectProduct={onSelectProduct} 
                      handleAddToCartWithFeedback={handleAddToCartWithFeedback} 
                    />
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-gutter gap-y-12">
                      {categoryProducts.map((product) => (
                        <ProductCard 
                          key={product.id} 
                          product={product} 
                          isAdded={addedProductIds[product.id]} 
                          onSelectProduct={onSelectProduct} 
                          handleAddToCartWithFeedback={handleAddToCartWithFeedback} 
                        />
                      ))}
                    </div>
                  )}
                </section>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

/* Componente Auxiliar: Tarjeta de Producto Estándar */
function ProductCard({ product, isAdded, onSelectProduct, handleAddToCartWithFeedback }) {
  return (
    <div 
      className="bottle-card group cursor-pointer"
      onClick={() => onSelectProduct(product)}
    >
      <div className="relative bg-surface-container aspect-[3/4] overflow-hidden mb-4 border border-outline-variant/10 group-hover:border-secondary/30 transition-all duration-500">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={product.foto_url}
          alt={product.nombre}
        />
        <div className="quick-add absolute bottom-0 left-0 w-full p-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button 
            onClick={(e) => handleAddToCartWithFeedback(product, e)}
            className={`w-full py-3 border text-secondary font-label-md uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 ${
              isAdded 
                ? 'bg-secondary text-background border-secondary' 
                : 'bg-background border-secondary hover:bg-secondary hover:text-background'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isAdded ? 'check' : 'add_shopping_cart'}
            </span>
            {isAdded ? 'Añadido' : 'Añadir al Carrito'}
          </button>
        </div>
        {product.marca && (
          <div className="absolute top-4 left-4">
            <span className="bg-surface/80 backdrop-blur px-3 py-1 text-label-sm text-secondary border border-secondary/30">
              {product.marca}
            </span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <span className="text-label-sm text-on-surface-variant uppercase tracking-tighter">
          {product.modelo || product.sku || ''}
        </span>
        <h3 className="font-headline-sm text-headline-sm group-hover:text-secondary transition-colors line-clamp-2">
          {product.nombre}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-secondary font-headline-sm text-headline-sm">
            ${Number(product.precio_venta_base).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

/* Componente Auxiliar: Grid Bento para Colecciones Especiales (Temporada/Raras) */
function BentoGrid({ products, addedProductIds, onSelectProduct, handleAddToCartWithFeedback }) {
  if (!products || products.length === 0) return null;
  
  const bentoProduct = products[0];
  const stackedProducts = products.slice(1, 3);
  const remainingProducts = products.slice(3); // Si hay más, los mostramos en tarjetas normales abajo

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {/* Left Large Card (Bento Masterpiece) */}
        <div 
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
              <span className="text-label-sm uppercase tracking-widest font-bold">Obra Maestra</span>
            </div>
            <h3 className="font-display-lg text-4xl text-on-surface">
              {bentoProduct.nombre}
            </h3>
            <p className="font-body-md text-on-surface-variant max-w-md line-clamp-2">
              {bentoProduct.descripcion}
            </p>
            <div className="pt-4 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
              <span className="font-headline-sm text-headline-sm text-secondary">
                ${Number(bentoProduct.precio_venta_base).toFixed(2)}
              </span>
              <button 
                onClick={(e) => handleAddToCartWithFeedback(bentoProduct, e)}
                className="px-8 py-3 bg-secondary text-background font-label-md uppercase tracking-widest hover:bg-white transition-colors duration-300"
              >
                {addedProductIds[bentoProduct.id] ? 'Añadido' : 'Consultar'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Cards Stack */}
        {stackedProducts.length > 0 && (
          <div className="grid grid-rows-2 gap-gutter">
            {stackedProducts.map((product, index) => {
              const isSecond = index === 1;
              return (
                <div 
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="relative bg-surface-container border border-outline-variant/10 overflow-hidden group p-8 flex flex-col justify-end cursor-pointer h-[290px] md:h-auto"
                >
                  {isSecond ? (
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20 transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${product.foto_url}')` }}
                    />
                  ) : (
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
                    <p className="text-secondary font-headline-sm text-headline-sm mt-2">
                      ${Number(product.precio_venta_base).toFixed(2)}
                    </p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="mt-auto self-start text-label-md text-secondary border-b border-secondary hover:text-white hover:border-white transition-all uppercase tracking-widest"
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Si hay más de 3 productos en esta colección especial, los mostramos abajo como tarjetas normales */}
      {remainingProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-gutter gap-y-12 mt-12">
          {remainingProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isAdded={addedProductIds[product.id]} 
              onSelectProduct={onSelectProduct} 
              handleAddToCartWithFeedback={handleAddToCartWithFeedback} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
