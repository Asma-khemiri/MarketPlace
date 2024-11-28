import React, { createContext, useState } from 'react';
import { products } from '../assets/assets'; 
import toast from 'react-hot-toast';

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const currency = 'TND';  
  const delivery_fee = 10;  // Frais de livraison
  const [search, setSearch] = useState('');  // Requête de recherche pour filtrer les produits
  const [cartItems, setCartItems] = useState({});  // État du panier 

  const [user, setUser] = useState(null); // État de l'utilisateur connecté
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Ajouter un produit au panier
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error('Sélectionnez la taille du produit');
      return;
    }

    setCartItems((prevCartItems) => {
      const cartData = { ...prevCartItems };

      if (cartData[itemId]) {
        // Si l'article est déjà dans le panier, mettre à jour la quantité de la taille sélectionnée
        cartData[itemId] = {
          ...cartData[itemId],
          [size]: (cartData[itemId][size] || 0) + 1,
        };
      } else {
        // Si l'article n'est pas dans le panier, l'ajouter avec la taille et la quantité
        cartData[itemId] = { [size]: 1 };
      }

      toast.success('Produit ajouté au panier !');
      return cartData;
    });
  };

  // Retirer un produit du panier
  const removeFromCart = (itemId, size) => {
    setCartItems((prevCartItems) => {
      const cartData = { ...prevCartItems };
      if (cartData[itemId] && cartData[itemId][size]) {
        const newQuantity = cartData[itemId][size] - 1;

        if (newQuantity > 0) {
          // Réduire la quantité si elle est supérieure à 0
          cartData[itemId] = { ...cartData[itemId], [size]: newQuantity };
        } else {
          // Supprimer l'article si la quantité est 0
          delete cartData[itemId][size];
          if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];  // Si aucune taille n'est encore présente, supprimer l'article
          }
        }

        toast.success('Produit retiré du panier !');
      }
      return cartData;
    });
  };

  // Mettre à jour directement la quantité d'un produit
  const updateCartQuantity = (itemId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId, size);  // Supprimer l'article si la quantité est 0 ou inférieure
      return;
    }

    setCartItems((prevCartItems) => {
      const cartData = { ...prevCartItems };
      if (!cartData[itemId]) {
        cartData[itemId] = {};  // Assurer que l'article existe avant de mettre à jour la quantité
      }
      cartData[itemId][size] = quantity;
      return cartData;
    });

    toast.success('Quantité mise à jour !');
  };

  // Compter le nombre total d'articles dans le panier
  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (count, sizes) =>
        count +
        Object.values(sizes).reduce((sizeCount, quantity) => sizeCount + quantity, 0),
      0
    );
  };

  // Récupérer les détails des articles dans le panier (nom, prix, etc.)
  const getCartItemsDetails = () => {
    return Object.keys(cartItems)
      .map((itemId) => {
        const item = products.find((product) => product.id === parseInt(itemId));  
        if (item) {
          return {
            ...item,  
            sizes: cartItems[itemId],  
          };
        }
        return null;  
      })
      .filter((item) => item !== null); 
  };

  // Calculer le prix total du panier
  const calculateTotalPrice = () => {
    const totalPrice = Object.keys(cartItems).reduce((total, itemId) => {
      const item = products.find((product) => product.id === parseInt(itemId));
      if (item) {
        const itemTotal = Object.entries(cartItems[itemId]).reduce(
          (subtotal, [size, quantity]) => subtotal + item.price * quantity,
          0
        );
        return total + itemTotal;
      }
      return total;
    }, 0);

    // Ajouter les frais de livraison
    return totalPrice + delivery_fee;
  };

  // Fonction de connexion
  const loginUser = (username) => {
    setUser(username); 
    setIsAuthenticated(true);
    toast.success('Bienvenue, ' + username);
  };

  // Fonction de déconnexion
  const logoutUser = () => {
    setUser(null); 
    setIsAuthenticated(false);
    toast.success('Déconnexion réussie');
  };

  // Valeur du contexte (les méthodes et les états accessibles dans le contexte)
  const value = {
    products,  
    currency,  // Monnaie
    delivery_fee,  
    search, 
    setSearch,  
    cartItems, 
    addToCart,  
    removeFromCart,  
    updateCartQuantity,  
    getCartCount,  
    getCartItemsDetails,  
    calculateTotalPrice,  
    user,  
    loginUser,  
    logoutUser,
    isAuthenticated,
    setIsAuthenticated 
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
