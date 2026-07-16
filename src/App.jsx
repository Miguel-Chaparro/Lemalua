import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import AgeVerification from './components/AgeVerification';
import ProductModal from './components/ProductModal';
import ToastNotification from './components/ToastNotification';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import PromotionsPage from './pages/PromotionsPage';
import TopSellersPage from './pages/TopSellersPage';
import HistoriaPage from './pages/HistoriaPage';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-on-surface font-body-md selection:bg-secondary selection:text-primary-container">

        {/* Navbar global */}
        <Navbar
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        {/* Rutas de páginas */}
        <Routes>
          <Route path="/" element={<HomePage onSelectProduct={setSelectedProduct} />} />
          <Route path="/catalogo" element={<CatalogPage onSelectProduct={setSelectedProduct} />} />
          <Route path="/promociones" element={<PromotionsPage onSelectProduct={setSelectedProduct} />} />
          <Route path="/top-sellers" element={<TopSellersPage onSelectProduct={setSelectedProduct} />} />
          <Route path="/historia" element={<HistoriaPage />} />
        </Routes>

        {/* Footer global */}
        <Footer />

        {/* Overlays */}
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

        {/* Globals */}
        <AgeVerification />
        <ToastNotification />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}

