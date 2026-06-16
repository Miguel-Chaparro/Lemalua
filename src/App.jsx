import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Promotions from './components/Promotions';
import MostWanted from './components/MostWanted';
import BrandStory from './components/BrandStory';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

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
          <Promotions />
          <MostWanted />
          <BrandStory />
          <Newsletter />
        </main>

        {/* Footer */}
        <Footer />

        {/* Cart Drawer */}
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />

        {/* Authentication Modal */}
        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
        />
      </div>
    </CartProvider>
  );
}
