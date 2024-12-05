import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchProducts } from '../firebase/services/productService';

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({}); // State for cart items
  const [user, setUser] = useState(null); // User state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication status
  const [search, setSearch] = useState(''); // Search query state
  const currency = 'TND'; // Currency
  const delivery_fee = 10; // Delivery fee

  // Fetch products from Firestore when the component mounts
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(); 
        setProducts(fetchedProducts); 
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    loadProducts();
  }, []);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Add a product to the cart
  const addToCart = (docId, size) => {
    if (!size) {
      toast.error('Sélectionnez la taille du produit');
      return;
    }

    setCartItems((prevCartItems) => {
      const cartData = { ...prevCartItems };

      if (cartData[docId]) {
        cartData[docId] = {
          ...cartData[docId],
          [size]: (cartData[docId][size] || 0) + 1,
        };
      } else {
        cartData[docId] = { [size]: 1 };
      }

      toast.success('Produit ajouté au panier !');
      return cartData;
    });
  };

  // Remove a product from the cart
  const removeFromCart = (docId, size) => {
    setCartItems((prevCartItems) => {
      const cartData = { ...prevCartItems };
      if (cartData[docId] && cartData[docId][size]) {
        const newQuantity = cartData[docId][size] - 1;

        if (newQuantity > 0) {
          cartData[docId] = { ...cartData[docId], [size]: newQuantity };
        } else {
          delete cartData[docId][size];
          if (Object.keys(cartData[docId]).length === 0) {
            delete cartData[docId];
          }
        }

        toast.success('Produit retiré du panier !');
      }
      return cartData;
    });
  };

  // Update the quantity of a product in the cart
  const updateCartQuantity = (docId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(docId, size); 
      return;
    }

    setCartItems((prevCartItems) => {
      const cartData = { ...prevCartItems };
      if (!cartData[docId]) {
        cartData[docId] = {};
      }
      cartData[docId][size] = quantity;
      return cartData;
    });

    toast.success('Quantité mise à jour !');
  };

  // Get the total count of items in the cart
  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (count, sizes) =>
        count +
        Object.values(sizes).reduce((sizeCount, quantity) => sizeCount + quantity, 0),
      0
    );
  };

  // Get detailed information for the items in the cart
  const getCartItemsDetails = () => {
    return Object.keys(cartItems)
      .map((docId) => {
        const item = products.find((product) => product.id === docId);
        if (item) {
          return {
            ...item,
            sizes: cartItems[docId],
          };
        }
        return null;
      })
      .filter((item) => item !== null);
  };

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    const totalPrice = Object.keys(cartItems).reduce((total, docId) => {
      const item = products.find((product) => product.id === docId);
      if (item) {
        const itemTotal = Object.entries(cartItems[docId]).reduce(
          (subtotal, [size, quantity]) => subtotal + item.price * quantity,
          0
        );
        return total + itemTotal;
      }
      return total;
    }, 0);
  
    const totalWithDelivery = totalPrice + delivery_fee;
  
    return parseFloat(totalWithDelivery.toFixed(2)); // Ensure it's a number, not a string
  };
  
   const clearCart = () => {
    
    setCartItems({});
    localStorage.removeItem("cartItems");
  };

  // User login function
  const loginUser = (username) => {
    setUser(username); 
    setIsAuthenticated(true);
    toast.success('Bienvenue, ' + username);
  };

  // User logout function
  const logoutUser = () => {
    setUser(null); 
    setIsAuthenticated(false);
     setCartItems({}); 
     clearCart();
    toast.success('Déconnexion réussie');
   
  };

  // The context value accessible to other components
  const value = {
    products,
    currency,
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
    loginUser,
    logoutUser,
    isAuthenticated,
    setIsAuthenticated,
    clearCart
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
