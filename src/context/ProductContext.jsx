import React, { createContext, useState, useEffect, useContext } from 'react';
import { db, collection, getDocs } from '../firebase';  // Assure-toi que le chemin d'import est correct

// Créer un Contexte pour les produits
const ProductContext = createContext();

// Fournisseur du Contexte
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Fonction pour récupérer les produits depuis Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'produits'));
      const productList = querySnapshot.docs.map(doc => doc.data());
      setProducts(productList);  // Mettre à jour l'état des produits
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
    }
  };

  useEffect(() => {
    fetchProducts();  // Charger les produits au démarrage
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook personnalisé pour utiliser les produits
export const useProducts = () => useContext(ProductContext);
