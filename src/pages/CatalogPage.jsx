import React from 'react';
import Catalog from '../components/Catalog';

export default function CatalogPage({ onSelectProduct }) {
  return (
    <main>
      <Catalog onSelectProduct={onSelectProduct} />
    </main>
  );
}
