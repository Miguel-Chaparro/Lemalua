import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

const initialProducts = [
  // Whiskies
  {
    id: 'cat-whisky-1',
    name: 'The Highland Crown 25 Años',
    category: 'whiskies',
    categoryLabel: 'Whiskies',
    origin: 'Speyside, Escocia',
    price: 4250.00,
    oldPrice: 5100.00,
    badge: 'LIMITADO',
    rating: 5,
    description: 'Un whisky single malt Speyside madurado durante un cuarto de siglo en barricas de jerez de primer llenado, ofreciendo notas complejas de higos secos, roble de jerez y un final sumamente suave.',
    tags: ['Speyside', '25 Años', 'Single Malt'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxevMPYdKVirrljRTw0YNEQLb0ilXtDDXK8JWySgRnEctEpr0khyEpm3uJH8n3kDa_1obUIAJS2gnNMCR9NCr5arF99vvu0rB59J4mRy_RSWZZ_LfDWf-NbRBruEaomYgipzMeWge73IfwS0OYglBxkRaPh2yFo0zG6VTx8HthMiR_zIdswKc12aScewT66pRddKt7rYf4cEfGwKAzrfZBOSvVeo_0_v6vgnHEmMOZk-MAM4LvbUkJYNESFXlTOi-PkgBgkVkz_nI'
  },
  {
    id: 'cat-whisky-2',
    name: 'Smoke & Oak Reserve',
    category: 'whiskies',
    categoryLabel: 'Whiskies',
    origin: 'Islay, Escocia',
    price: 2890.00,
    rating: 4.8,
    description: 'Ahumado clásico de Islay que captura la esencia de la turba marítima, sal de mar y ricas barricas de roble americano tostado.',
    tags: ['Islay', 'Ahumado', 'Turba'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo09FGC-TyygrT0b0yF8mmcMmUwOEDh9sNffVtfHqhH6EY92mN41gEIxGKgo_lbkI4S_arT0vCMzmTrMwf9T0swjAwkD204JUxSsXQfAeaII2fCew9Kt0r317skyaYtomrWgh-353_nxXjjDswTAog8OOp3rzPtLNIpTIXonTWc27VHV7JNflLFSZBvlO97Uc3et1M8Ktz0UcKd41z2sUdFlsYEHpbxKSoUQ5gWXubhi8OBA1QKsJBA6p3hfwWMK2uVUSp_k-rCaA'
  },
  {
    id: 'cat-whisky-3',
    name: 'Yuzuro Artisan Malt',
    category: 'whiskies',
    categoryLabel: 'Whiskies',
    origin: 'Yamanashi, Japón',
    price: 3150.00,
    rating: 4.9,
    description: 'Artisan malt japonés delicado y floral con notas cítricas de yuzu y el carácter especiado y profundo de la barrica de roble Mizunara.',
    tags: ['Japón', 'Artesanal', 'Mizunara'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoXxzSl-NnRzacMlQXIBlukbgLs_dzP8TOcE3WD4LgjSKHSbTqqAyWpARB8o9VKv2_MUDhqbJ70Sq6oQVoCHENG5cLcWl3H8r1lDXHZSYlrBUXNjzc8Zm7ybqaSjhqbZ5rbKot2_d1k9w18ZBvCI-ookmSkF4B8--yoUmqdTIPhsbaIVaTS-WsfIT73tMZvaK3aRi3U_ACxJqiMZJsgaPi10QhINue8LkxwhuaOmoLltiXjfdKjkvvKWb-8RfQWdqM27-aHy4Gcyk'
  },
  // Ginebras
  {
    id: 'cat-gin-1',
    name: 'Royal Botanical Gin',
    category: 'ginebras',
    categoryLabel: 'Ginebras',
    origin: 'Londres, Inglaterra',
    price: 1200.00,
    rating: 4.7,
    description: 'Destilada con 15 botánicos selectos, incluyendo bayas de enebro ártico y pétalos de lavanda inglesa.',
    tags: ['London Dry', 'Floral', 'Premium'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLbNjX5Cb1T9zH9O3jJ8dsX9x-aKHefh9fzEW1lp6NnmmRjdM7PJAJSRL84N3zt1k-Hp1e-1cZzeFDA9LEtWaTDWFfWazEozSAXiBXZRg2oH8uMPZndajyXM5RIyAaxojF4Bu9WurpyAg48ticDEFavfj0zkXDRZMpfOH_VRPJO_jdUbXNjbWiMJQCpolukJSBSLTrboB_K04U8tXH8IFpdWw95R-GYoZlrcgR3yPA54cfMbZ0256kcGXMEZyUsCJuYI0qcM39Co8'
  },
  {
    id: 'cat-gin-2',
    name: 'Ocean Blue Infused',
    category: 'ginebras',
    categoryLabel: 'Ginebras',
    origin: 'Cotswolds, Inglaterra',
    price: 950.00,
    rating: 4.6,
    description: 'Perfil botánico fresco con enebro de montaña, algas costeras y un toque refrescante de limón verbena.',
    tags: ['Cotswolds', 'Fresco', 'Oceanic'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp1MJ-58MubAZhiNaJumQ1bBVBAah8UTB4NerYR3Oj_duwFBXqURaz0jmSMhToSrpFjhMHgAAf-GN3__VHCHnGIo5Pc2RNnwXNdc6koTr9HwaBR1MNcTUFZw9TqOY-iDp21FMLS7dJF8G69E6qLyCOtiL9cRQ2MgH0IESzJXFcNzHbDjzLbs-B6tjWEBrDtfwk07LaCNr6YnUzJgX1LeAW9Tp-zktFVQcLIUKAnoD_ERgJVnduV2Zrvo4LLgxp9EJBuqpKsXSewic'
  },
  // Tequilas & Mezcal
  {
    id: 'cat-tequila-1',
    name: 'Gran Patrón Reposado',
    category: 'tequilas',
    categoryLabel: 'Tequilas & Mezcal',
    origin: 'Jalisco, México',
    price: 1800.00,
    rating: 4.8,
    description: 'Envejecido en barricas de roble durante 6 meses. Dulce sabor de agave cocido con toques sutiles de caramelo y miel.',
    tags: ['100% Agave', 'Reposado', 'Jalisco'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3jgwby9dCJXOudqttBaWcCYtZ4XHgv3KdmHvYLaug5Fs58ccdQ9cMQxa24oUE5wVgkE4a-vR_c_JmEb8IHtdmKwrxSUwNcdTR6Wunt_Q08SPEcCVJjTzZ2fzMFZssfXxZ-hH3yHcqrqiIZfrNhieV4176Nylzr7ALKOqQwmkJABbcdDtbT1fHOZQDv4BFcPuoORSkWyOVvFK6CUlBQI4A09sVMx5IUa_OWdxRSKUdkopbjth-I0JBG35qMHVAO-ArIOQ98wyz4k0'
  },
  {
    id: 'cat-tequila-2',
    name: 'Añejo Imperial Reserva',
    category: 'tequilas',
    categoryLabel: 'Tequilas & Mezcal',
    origin: 'Jalisco, México',
    price: 2400.00,
    rating: 4.9,
    description: 'Doble destilación lenta y 18 meses en barricas nuevas de roble francés que brindan notas ahumadas y vainilla rica.',
    tags: ['Añejo', 'Premium', 'Reserva'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3jgwby9dCJXOudqttBaWcCYtZ4XHgv3KdmHvYLaug5Fs58ccdQ9cMQxa24oUE5wVgkE4a-vR_c_JmEb8IHtdmKwrxSUwNcdTR6Wunt_Q08SPEcCVJjTzZ2fzMFZssfXxZ-hH3yHcqrqiIZfrNhieV4176Nylzr7ALKOqQwmkJABbcdDtbT1fHOZQDv4BFcPuoORSkWyOVvFK6CUlBQI4A09sVMx5IUa_OWdxRSKUdkopbjth-I0JBG35qMHVAO-ArIOQ98wyz4k0'
  },
  // Ron
  {
    id: 'cat-ron-1',
    name: 'Ron Solera Gran Reserva',
    category: 'ron',
    categoryLabel: 'Ron',
    origin: 'Caribe',
    price: 1500.00,
    rating: 4.9,
    description: 'Envejecido artesanalmente por 20 años en sistema solera en barricas de roble tostadas. Notas de cacao y tabaco fino.',
    tags: ['Solera', '20 Años', 'Añejo'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgQguHFI21dGPdPBMdAGdpEzsEDVS1IkX2ObuM_2cLOcV5wSkbN2gYPddyQbf0OXXtQyFlPK62wf0umcooruzRjGfCLqyM-yPDySQtBQkDvN1wf-GawOSiyRAN6vHvd9dV6msJfIkm8n90eoEWKVAeKYKIkVXHglxDO0ome5zbelFmtDi0Pll1_rFnxZe8jBLpvHpAI7SUjDgKx2CH3RKKmFimNyQ9dYBNCnIwV3CAXGDFtpczoebyhk124A_BPq5--CQhjhhm55Y'
  },
  {
    id: 'cat-ron-2',
    name: 'Spiced Navy Cask',
    category: 'ron',
    categoryLabel: 'Ron',
    origin: 'Caribe',
    price: 980.00,
    rating: 4.7,
    description: 'Infundido con vainas de vainilla de Madagascar, canela y nuez moscada, reposado en barricas de ex-bourbon.',
    tags: ['Spiced', 'Navy', 'Caribe'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgQguHFI21dGPdPBMdAGdpEzsEDVS1IkX2ObuM_2cLOcV5wSkbN2gYPddyQbf0OXXtQyFlPK62wf0umcooruzRjGfCLqyM-yPDySQtBQkDvN1wf-GawOSiyRAN6vHvd9dV6msJfIkm8n90eoEWKVAeKYKIkVXHglxDO0ome5zbelFmtDi0Pll1_rFnxZe8jBLpvHpAI7SUjDgKx2CH3RKKmFimNyQ9dYBNCnIwV3CAXGDFtpczoebyhk124A_BPq5--CQhjhhm55Y'
  },
  // Vinos
  {
    id: 'cat-vinos-1',
    name: 'Château Margaux Millésime',
    category: 'vinos',
    categoryLabel: 'Vinos',
    origin: 'Burdeos, Francia',
    price: 2400.00,
    rating: 5,
    description: 'Elaborado en el histórico Château de Margaux. Aromas ricos de frutos rojos maduros, trufas y un final sumamente elegante y largo.',
    tags: ['Burdeos', 'Gran Reserva', 'Tinto'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0dqrTU6ldIJtv1fPofYQjxlisL1_KbLI7olDtvp6GsK3NRAhfnXwMIs44fHXalhaNb2r0kpgugTZ8OE86WDMnlvFmlXHQPfBCQ04kp2u5yB2oUEtZTBZfP0cGpYwhJUINv3QQqYutVrWyMGcK6XrDvassUdZpJk5GTiOafDJ2GGFw0BXUBOykE90MyWs-fDdZd7LhAyDywcm2YfJ2AWybnxz7HgOlY1iEAxmvGeFLpMgLW0Fci8jnem_rJEKc7PWOBVSrJWJ0Qa4'
  },
  {
    id: 'cat-vinos-2',
    name: 'Blanc de Blancs Millésimé',
    category: 'vinos',
    categoryLabel: 'Vinos',
    origin: 'Champagne, Francia',
    price: 1100.00,
    rating: 4.8,
    description: 'Champagne exclusivo de uva Chardonnay de viñedos Grand Cru. Burbuja fina, notas cítricas y pastelería fina.',
    tags: ['Champagne', 'Chardonnay', 'Grand Cru'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0dqrTU6ldIJtv1fPofYQjxlisL1_KbLI7olDtvp6GsK3NRAhfnXwMIs44fHXalhaNb2r0kpgugTZ8OE86WDMnlvFmlXHQPfBCQ04kp2u5yB2oUEtZTBZfP0cGpYwhJUINv3QQqYutVrWyMGcK6XrDvassUdZpJk5GTiOafDJ2GGFw0BXUBOykE90MyWs-fDdZd7LhAyDywcm2YfJ2AWybnxz7HgOlY1iEAxmvGeFLpMgLW0Fci8jnem_rJEKc7PWOBVSrJWJ0Qa4'
  },
  // Ediciones Raras
  {
    id: 'cat-raras-1',
    name: 'Lemalua Legacy 1942',
    category: 'raras',
    categoryLabel: 'Ediciones Raras',
    origin: 'Cognac, Francia',
    price: 18500.00,
    rating: 5,
    badge: 'Obra Maestra',
    isRarasBento: true,
    description: 'Solamente 50 botellas producidas. Un viaje sensorial a través de ocho décadas de añejamiento en barricas de roble francés.',
    tags: ['Obra Maestra', 'Colección', '80 Años'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBehhhw0d7BmsO2UywDUHtEnThtlHgPXYXJVVpTyp1N-4ndhz2L0JHYhgJJE4j3-zG-t0MbmnGvpprN0fSXePN4dwlL--lYesWuk_B2-GJ-nXrvb8tDouMsl3b9IBvCBjgaAvMGVdbsEdWzMg6UvKUG3fj0bZXLP9KIs-6qmawlP-W-jB-btIIenxjcvtS1ONBmB_g8kmqzFYQk8x066Iizs9TfuWeqf-MnoY5WpydIeuOzHaNkPSOEVuUni_dZTzEnTL13WR-vPtk'
  },
  {
    id: 'cat-raras-2',
    name: 'Ancestral Tobalá Silver',
    category: 'raras',
    categoryLabel: 'Ediciones Raras',
    origin: 'Oaxaca, México',
    price: 6400.00,
    rating: 4.9,
    description: 'Mezcal Tobalá artesanal destilado en ollas de barro, que ofrece notas herbales salvajes y una mineralidad elegante.',
    tags: ['Oaxaca', 'Mezcal', 'Ancestral'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmc_TBuvHx0HKv7zcOXXUpTcJT6UcWeo54dwX63yz_U0mNcwP6Z3OC8PaBxIXgiXPGCgEvKYilWBHnn3pcL6PAim7GZeOtxL0D_5Om1spj27_-feup40nmx6VOGnuUmBOyn9KbUEdSaorE-vLcWHlMJe1sK8SBv9QHGx9MpkjF0GAt6ywQAneqhTZ0UdWBMw_cPZdCw2pHZ-y16eupDzEH-eAkofMbvHSo8Iq6QIo2dgbikcyaMPWBLOtch4byU2LUmbpxnHinu5Q'
  },
  {
    id: 'cat-raras-3',
    name: 'Botanical Archive Edition',
    category: 'raras',
    categoryLabel: 'Ediciones Raras',
    origin: 'Cotswolds, Inglaterra',
    price: 3200.00,
    rating: 4.8,
    description: 'Una ginebra de colección de Cotswolds elaborada con botánicos raros del archivo histórico, ofreciendo un sabor herbal equilibrado.',
    tags: ['Cotswolds', 'Ginebra Rara', 'Edición Limitada'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp1MJ-58MubAZhiNaJumQ1bBVBAah8UTB4NerYR3Oj_duwFBXqURaz0jmSMhToSrpFjhMHgAAf-GN3__VHCHnGIo5Pc2RNnwXNdc6koTr9HwaBR1MNcTUFZw9TqOY-iDp21FMLS7dJF8G69E6qLyCOtiL9cRQ2MgH0IESzJXFcNzHbDjzLbs-B6tjWEBrDtfwk07LaCNr6YnUzJgX1LeAW9Tp-zktFVQcLIUKAnoD_ERgJVnduV2Zrvo4LLgxp9EJBuqpKsXSewic'
  }
];

const categories = [
  { id: 'whiskies', label: 'Whiskies', number: '01' },
  { id: 'ginebras', label: 'Ginebras', number: '02' },
  { id: 'tequilas', label: 'Tequilas & Mezcal', number: '03' },
  { id: 'ron', label: 'Ron', number: '04' },
  { id: 'vinos', label: 'Vinos', number: '05' },
  { id: 'raras', label: 'Ediciones Raras', number: '06' }
];

export default function Catalog({ onSelectProduct }) {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('whiskies');
  const [sortBy, setSortBy] = useState('relevancia');
  const [addedProductIds, setAddedProductIds] = useState({});
  
  const sectionRefs = {
    whiskies: useRef(null),
    ginebras: useRef(null),
    tequilas: useRef(null),
    ron: useRef(null),
    vinos: useRef(null),
    raras: useRef(null)
  };

  // ── Intersection Observer to highlight active category based on scroll ──
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Trigger when section is in the upper middle area of viewport
      threshold: 0.05
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const handleCategoryClick = (categoryId, e) => {
    e.preventDefault();
    setActiveCategory(categoryId);
    const targetRef = sectionRefs[categoryId]?.current;
    if (targetRef) {
      const offset = 100; // Account for fixed navbar height
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
    
    // Add success feedback state
    setAddedProductIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProductIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // Get and sort products dynamically
  const getSortedProducts = (categoryKey) => {
    const filtered = initialProducts.filter(p => p.category === categoryKey);
    
    if (sortBy === 'price-asc') {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered; // relevance / initial order
  };

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
            <h3 className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant mb-6">
              Categorías
            </h3>
            <ul className="space-y-4">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <li key={cat.id}>
                    <a
                      onClick={(e) => handleCategoryClick(cat.id, e)}
                      className={`font-headline-sm text-headline-sm hover:text-secondary transition-colors flex items-center justify-between group cursor-pointer ${
                        isActive ? 'text-secondary font-medium' : 'text-on-surface-variant'
                      }`}
                      href={`#${cat.id}`}
                    >
                      {cat.label}
                      <span 
                        className={`text-label-sm transition-all duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        {cat.number}
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
          
          {/* Section: Whiskies */}
          <section 
            id="whiskies" 
            ref={sectionRefs.whiskies} 
            className="mb-20 scroll-mt-24 transition-all duration-1000"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10 border-b border-outline-variant/10 pb-4">
              <h2 className="font-display-lg text-[32px] md:text-headline-md">Whiskies</h2>
              <p className="font-body-md text-on-surface-variant italic max-w-md">
                Una selección de maltas únicas y mezclas legendarias del Highland y más allá.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-gutter gap-y-12">
              {getSortedProducts('whiskies').map((product) => {
                const isAdded = addedProductIds[product.id];
                return (
                  <div 
                    key={product.id} 
                    className="bottle-card group cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <div className="relative bg-surface-container aspect-[3/4] overflow-hidden mb-4 border border-outline-variant/10 group-hover:border-secondary/30 transition-all duration-500">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={product.image}
                        alt={product.name}
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
                      {product.badge && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-surface/80 backdrop-blur px-3 py-1 text-label-sm text-secondary border border-secondary/30">
                            {product.badge}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-tighter">
                        {product.origin}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm group-hover:text-secondary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-secondary font-headline-sm text-headline-sm">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-on-surface-variant/50 line-through text-label-md">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Ginebras */}
          <section 
            id="ginebras" 
            ref={sectionRefs.ginebras} 
            className="mb-20 scroll-mt-24 transition-all duration-1000"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10 border-b border-outline-variant/10 pb-4">
              <h2 className="font-display-lg text-[32px] md:text-headline-md">Ginebras</h2>
              <p className="font-body-md text-on-surface-variant italic max-w-md">
                Destilados botánicos aromáticos que capturan el espíritu de paisajes florales e históricos.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-gutter gap-y-12">
              {getSortedProducts('ginebras').map((product) => {
                const isAdded = addedProductIds[product.id];
                return (
                  <div 
                    key={product.id} 
                    className="bottle-card group cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <div className="relative bg-surface-container aspect-[3/4] overflow-hidden mb-4 border border-outline-variant/10 group-hover:border-secondary/30 transition-all duration-500">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={product.image}
                        alt={product.name}
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
                    </div>
                    <div className="space-y-1">
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-tighter">
                        {product.origin}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm group-hover:text-secondary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-secondary font-headline-sm text-headline-sm">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Tequilas & Mezcal */}
          <section 
            id="tequilas" 
            ref={sectionRefs.tequilas} 
            className="mb-20 scroll-mt-24 transition-all duration-1000"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10 border-b border-outline-variant/10 pb-4">
              <h2 className="font-display-lg text-[32px] md:text-headline-md">Tequilas & Mezcal</h2>
              <p className="font-body-md text-on-surface-variant italic max-w-md">
                Tradición y sabor del agave azul cocido lentamente en el corazón de Jalisco y Oaxaca.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-gutter gap-y-12">
              {getSortedProducts('tequilas').map((product) => {
                const isAdded = addedProductIds[product.id];
                return (
                  <div 
                    key={product.id} 
                    className="bottle-card group cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <div className="relative bg-surface-container aspect-[3/4] overflow-hidden mb-4 border border-outline-variant/10 group-hover:border-secondary/30 transition-all duration-500">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={product.image}
                        alt={product.name}
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
                    </div>
                    <div className="space-y-1">
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-tighter">
                        {product.origin}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm group-hover:text-secondary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-secondary font-headline-sm text-headline-sm">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Ron */}
          <section 
            id="ron" 
            ref={sectionRefs.ron} 
            className="mb-20 scroll-mt-24 transition-all duration-1000"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10 border-b border-outline-variant/10 pb-4">
              <h2 className="font-display-lg text-[32px] md:text-headline-md">Ron</h2>
              <p className="font-body-md text-on-surface-variant italic max-w-md">
                Expresiones cálidas del Caribe añejadas con maestría en barricas de roble seleccionadas.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-gutter gap-y-12">
              {getSortedProducts('ron').map((product) => {
                const isAdded = addedProductIds[product.id];
                return (
                  <div 
                    key={product.id} 
                    className="bottle-card group cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <div className="relative bg-surface-container aspect-[3/4] overflow-hidden mb-4 border border-outline-variant/10 group-hover:border-secondary/30 transition-all duration-500">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={product.image}
                        alt={product.name}
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
                    </div>
                    <div className="space-y-1">
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-tighter">
                        {product.origin}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm group-hover:text-secondary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-secondary font-headline-sm text-headline-sm">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Vinos */}
          <section 
            id="vinos" 
            ref={sectionRefs.vinos} 
            className="mb-20 scroll-mt-24 transition-all duration-1000"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10 border-b border-outline-variant/10 pb-4">
              <h2 className="font-display-lg text-[32px] md:text-headline-md">Vinos</h2>
              <p className="font-body-md text-on-surface-variant italic max-w-md">
                Etiquetas seleccionadas con historia y terruños de prestigio internacional.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-gutter gap-y-12">
              {getSortedProducts('vinos').map((product) => {
                const isAdded = addedProductIds[product.id];
                return (
                  <div 
                    key={product.id} 
                    className="bottle-card group cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <div className="relative bg-surface-container aspect-[3/4] overflow-hidden mb-4 border border-outline-variant/10 group-hover:border-secondary/30 transition-all duration-500">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={product.image}
                        alt={product.name}
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
                    </div>
                    <div className="space-y-1">
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-tighter">
                        {product.origin}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm group-hover:text-secondary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-secondary font-headline-sm text-headline-sm">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Ediciones Raras (Bento Grid Style) */}
          <section 
            id="raras" 
            ref={sectionRefs.raras} 
            className="mb-20 scroll-mt-24 transition-all duration-1000"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10 border-b border-outline-variant/10 pb-4">
              <h2 className="font-display-lg text-[32px] md:text-headline-md text-secondary">Ediciones Raras</h2>
              <p className="font-body-md text-on-surface-variant italic max-w-md">
                Piezas de colección únicas en el mundo. La máxima expresión de la destilería.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* Left Large Card (Bento Masterpiece) */}
              {getSortedProducts('raras').filter(p => p.isRarasBento).map((product) => (
                <div 
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="relative h-[600px] bg-surface-container border border-secondary/20 overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="absolute bottom-0 left-0 w-full p-8 z-20 space-y-4">
                    <div className="flex items-center gap-2 text-secondary">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="text-label-sm uppercase tracking-widest font-bold">Obra Maestra</span>
                    </div>
                    <h3 className="font-display-lg text-4xl text-on-surface">
                      {product.name}
                    </h3>
                    <p className="font-body-md text-on-surface-variant max-w-md">
                      {product.description}
                    </p>
                    <div className="pt-4 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                      <span className="font-headline-sm text-headline-sm text-secondary">
                        ${product.price.toFixed(2)}
                      </span>
                      <button 
                        onClick={(e) => handleAddToCartWithFeedback(product, e)}
                        className="px-8 py-3 bg-secondary text-background font-label-md uppercase tracking-widest hover:bg-white transition-colors duration-300"
                      >
                        {addedProductIds[product.id] ? 'Añadido' : 'Consultar Disponibilidad'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Right Cards Stack */}
              <div className="grid grid-rows-2 gap-gutter">
                {getSortedProducts('raras').filter(p => !p.isRarasBento).map((product, index) => {
                  const isSecond = index === 1;
                  return (
                    <div 
                      key={product.id}
                      onClick={() => onSelectProduct(product)}
                      className="relative bg-surface-container border border-outline-variant/10 overflow-hidden group p-8 flex flex-col justify-end cursor-pointer"
                    >
                      {isSecond ? (
                        /* Bottom Card with botanical background pattern opacity */
                        <div 
                          className="absolute inset-0 bg-cover bg-center opacity-20 transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url('${product.image}')` }}
                        />
                      ) : (
                        /* Top Card with image element */
                        <img
                          className="absolute top-0 right-0 w-1/2 h-full object-contain opacity-40 group-hover:scale-110 transition-transform duration-700"
                          src={product.image}
                          alt={product.name}
                        />
                      )}
                      
                      <div className="relative z-10">
                        <span className="text-label-sm text-on-surface-variant uppercase tracking-widest">
                          {product.origin}
                        </span>
                        <h4 className="font-headline-sm text-headline-sm mt-2">
                          {product.name}
                        </h4>
                        <p className="text-secondary font-headline-sm text-headline-sm mt-2">
                          ${product.price.toFixed(2)}
                        </p>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProduct(product);
                          }}
                          className="mt-4 text-label-md text-secondary border-b border-secondary hover:text-white hover:border-white transition-all uppercase tracking-widest"
                        >
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
