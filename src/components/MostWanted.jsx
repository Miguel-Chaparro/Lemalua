import React from 'react';
import { useCart } from '../context/CartContext';

const wantedProducts = [
  {
    id: 'wanted-1',
    name: 'Ron Añejo Solera',
    price: 75.00,
    rating: 5,
    description: 'Envejecido 15 años | Caribe • Notas de vainilla, cacao y tabaco.',
    tags: ['Edición Limitada', 'Premium'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgQguHFI21dGPdPBMdAGdpEzsEDVS1IkX2ObuM_2cLOcV5wSkbN2gYPddyQbf0OXXtQyFlPK62wf0umcooruzRjGfCLqyM-yPDySQtBQkDvN1wf-GawOSiyRAN6vHvd9dV6msJfIkm8n90eoEWKVAeKYKIkVXHglxDO0ome5zbelFmtDi0Pll1_rFnxZe8jBLpvHpAI7SUjDgKx2CH3RKKmFimNyQ9dYBNCnIwV3CAXGDFtpczoebyhk124A_BPq5--CQhjhhm55Y'
  },
  {
    id: 'wanted-2',
    name: 'Vodka Glacial Pure',
    price: 45.00,
    rating: 4.5,
    description: 'Destilado 5 veces | Rusia • Filtrado en cristal volcánico.',
    tags: ['Destilado Premium'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1c3an_UgylB3FP7p-nd4cUiWpfjkKch6aZ0BZ9V8I62NidcvuvDddx6tErAq4VxbnxQukXU6_IrogkFzK-GDu0n3bln-Vd97t4YzAkoJ2PMH9iYYb-FKT5DbaXVHLZ_Ah77Oyz_na-ajCj4xm4wkydRUT91WYg2S0-78PfUZ95F9eQKkG6ZPXgr9grPKEDHaJUV2TBgbVS7OEVAJ8HbUUoM9UKQRGBQWAjxr13Gs-x2icRUph9JFO08-qtdFt8iamlwpv84r5WLE'
  },
  {
    id: 'wanted-3',
    name: 'Cognac XO Privé',
    price: 210.00,
    rating: 5,
    description: 'Grande Champagne AOC | Francia • Envejecido más de 20 años en barrica de Limusín.',
    tags: ['Colección Privada', 'XO'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0dqrTU6ldIJtv1fPofYQjxlisL1_KbLI7olDtvp6GsK3NRAhfnXwMIs44fHXalhaNb2r0kpgugTZ8OE86WDMnlvFmlXHQPfBCQ04kp2u5yB2oUEtZTBZfP0cGpYwhJUINv3QQqYutVrWyMGcK6XrDvassUdZpJk5GTiOafDJ2GGFw0BXUBOykE90MyWs-fDdZd7LhAyDywcm2YfJ2AWybnxz7HgOlY1iEAxmvGeFLpMgLW0Fci8jnem_rJEKc7PWOBVSrJWJ0Qa4'
  },
  {
    id: 'wanted-4',
    name: 'Licor de Café Artesanal',
    price: 38.00,
    rating: 4,
    description: 'Café de origen colombiano | 20% ABV • Notas dulces y ahumadas.',
    tags: ['Artesanal', 'Colombia'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHDy7D_EKXy-Ad04PamLNxtVOw5nJWMyc2a0wufQv82ZTV5Ad9GgWeROtN4EaM2SbOXmvJjsTTpjAvxB6RhLUCUtiVBNdDMNyteNENIi3sHUahRvHe063hvF1YkXq0vljF60PzYUwZpZ_Fj3N0nT-ZYITosWnpjCsC4NxJhl8Gf_Usymx7Dom_IEmnsUs6FF2W3Mn2jJ8xQy-i9OyZeYDQtzypP3bIZn-TqmrjOKUNAM7RJmSl1czRv_G1ON1Md87FftnWq25KVic'
  }
];

export default function MostWanted() {
  const { addToCart } = useCart();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <span key={i} className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            star_half
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="material-symbols-outlined text-outline-variant text-sm">
            star_outline
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <section id="shop" className="py-margin-desktop bg-surface-container-lowest px-4 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <span className="font-label-md text-secondary tracking-widest uppercase">Los Favoritos</span>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mt-4">Más Solicitados</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {wantedProducts.map((product) => (
            <div key={product.id} className="text-center space-y-4 luxury-card-hover p-4 rounded-lg bg-surface-container-low/30 border border-outline-variant/10 flex flex-col justify-between">
              <div>
                <div className="aspect-square bg-surface flex items-center justify-center p-8 overflow-hidden rounded-md">
                  <img 
                    alt={product.name} 
                    className="max-h-full object-contain hover:scale-105 transition-transform duration-500" 
                    src={product.image}
                  />
                </div>
                <div className="flex justify-center gap-1 mt-4">
                  {renderStars(product.rating)}
                </div>
                <h4 className="font-headline-sm text-on-surface mt-2">{product.name}</h4>
                <p className="text-secondary font-label-md mt-1">${product.price.toFixed(2)}</p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-2 bg-transparent border border-secondary/50 text-secondary hover:bg-secondary hover:text-primary-container font-label-sm uppercase tracking-wider transition-all duration-300 rounded active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
