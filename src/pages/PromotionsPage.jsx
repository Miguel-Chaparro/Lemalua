import React from 'react';
import Promotions from '../components/Promotions';

export default function PromotionsPage({ onSelectProduct }) {
  return (
    <main className="pt-20">
      <Promotions onSelectProduct={onSelectProduct} />
    </main>
  );
}
