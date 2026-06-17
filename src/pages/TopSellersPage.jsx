import React from 'react';
import MostWanted from '../components/MostWanted';

export default function TopSellersPage({ onSelectProduct }) {
  return (
    <main className="pt-20">
      <MostWanted onSelectProduct={onSelectProduct} />
    </main>
  );
}
