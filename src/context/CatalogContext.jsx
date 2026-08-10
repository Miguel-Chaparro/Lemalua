import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const CatalogContext = createContext();

export function CatalogProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [error, setError] = useState(null);

  // useRef para evitar llamadas simultáneas al cargar páginas en segundo plano
  const fetchingRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        setIsLoadingInitial(true);
        // 1. Cargar Categorías
        const catRes = await fetch('https://billing.dommatos.com/api/public/categorias');
        const catData = await catRes.json();
        let loadedCategories = [];
        if (catData.success && catData.data) {
          loadedCategories = catData.data;
          setCategories(loadedCategories);
        }

        // 2. Cargar Primera Página de Productos
        const prodRes = await fetch('https://billing.dommatos.com/api/public/productos?page=1&limit=50');
        const prodData = await prodRes.json();
        
        let initialProducts = [];
        let totalPages = 1;

        if (prodData.success && prodData.data) {
          initialProducts = prodData.data;
          totalPages = prodData.pagination?.totalPages || 1;
          setProducts(initialProducts);
        }

        setIsLoadingInitial(false);

        // 3. Cargar las siguientes páginas en segundo plano
        if (totalPages > 1 && isMounted) {
          fetchRemainingPages(totalPages, initialProducts);
        }

      } catch (err) {
        console.error("Error fetching catalog data:", err);
        setError("Ocurrió un error al cargar el catálogo.");
        setIsLoadingInitial(false);
      }
    };

    const fetchRemainingPages = async (totalPages, currentProducts) => {
      if (fetchingRef.current) return;
      fetchingRef.current = true;
      let allProducts = [...currentProducts];

      for (let page = 2; page <= totalPages; page++) {
        try {
          const res = await fetch(`https://billing.dommatos.com/api/public/productos?page=${page}&limit=50`);
          const data = await res.json();
          if (data.success && data.data) {
            allProducts = [...allProducts, ...data.data];
            // Actualizar estado de manera progresiva
            if (isMounted) {
               setProducts([...allProducts]);
            }
          }
        } catch (err) {
          console.error(`Error fetching page ${page}:`, err);
        }
      }
      fetchingRef.current = false;
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <CatalogContext.Provider value={{ categories, products, isLoadingInitial, error }}>
      {children}
    </CatalogContext.Provider>
  );
}

export const useCatalog = () => useContext(CatalogContext);
