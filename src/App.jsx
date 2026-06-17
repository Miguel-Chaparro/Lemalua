import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Promotions from './components/Promotions';
import MostWanted from './components/MostWanted';
import Catalog from './components/Catalog';
import BrandStory from './components/BrandStory';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import AgeVerification from './components/AgeVerification';
import ProductModal from './components/ProductModal';
import ToastNotification from './components/ToastNotification';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-on-surface font-body-md selection:bg-secondary selection:text-primary-container">
        {/* Navigation Bar */}
        <Navbar 
          onOpenCart={() => setIsCartOpen(true)} 
          onOpenAuth={() => setIsAuthOpen(true)} 
        />

        {/* Main Sections */}
        <main>
          <Hero />
          <Promotions onSelectProduct={setSelectedProduct} />
          <MostWanted onSelectProduct={setSelectedProduct} />
          <Catalog onSelectProduct={setSelectedProduct} />
          <BrandStory />
          <Newsletter />
        </main>

        {/* Footer section */}
        <Footer />

        {/* Drawer & Modal views */}
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />

        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
        />

        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />

        {/* Age Verification Gate */}
        <AgeVerification />

        {/* Global Toast Notification */}
        <ToastNotification />
      </div>
    </CartProvider>
  );
}
