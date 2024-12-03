import React, { createContext, useState, useEffect, useContext } from 'react';
import { getDoc } from 'firebase/firestore';
  // Assure-toi que le chemin d'import est correct
import { collection } from 'firebase/firestore/lite';
// Créer un Contexte pour les produits
import { db } from '../firebase/firebase';
const ProductContext = createContext();

// Fournisseur du Contexte
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Fonction pour récupérer les produits depuis Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDoc(collection(db, 'products'));
      const productList = querySnapshot.docs.map(doc => doc.data());
      setProducts(productList);  // Mettre à jour l'état des produits
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
    }
  };

  // Function to add a product to the product list
  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, { id: Date.now(), ...product }]); // Adds the new product
  };

  useEffect(() => {
    fetchProducts();  
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts,addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook personnalisé pour utiliser les produits
export const useProducts = () => useContext(ProductContext);
