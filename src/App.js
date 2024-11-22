import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Importer Navigate pour la redirection
import { auth } from './firebase/firebase'; // Firebase Auth

// Components
import Navbar from './components/Navbar/Navbar'; 
import Footer from './components/Footer/Footer'; 
import AuthPopup from './components/AuthPopup';
import Home from './components/Header/Header';
import Populaire from './components/Populaire/Populaire';  // Importer Populaire

import Collection from './pages/Collection';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ConfirmationPage from './pages/ConfirmationPage';
import AddProductPage from './pages/AddProductPage';
import MesProduits from './pages/MesProduits';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPopup, setAuthPopup] = useState(false); // Manage auth popup visibility
  const [orderPopup, setOrderPopup] = useState(false); 
  const [userName, setUserName] = useState("");

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup); 
  };

  useEffect(() => {
    // Checking user's authentication state
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true); // User is authenticated
      } else {
        setIsAuthenticated(false); // User is not authenticated
      }
    });
  }, []);

  const handleAuthPopupClose = () => {
    setAuthPopup(false); // Close the auth popup
  };

  return (
    <>
      {/* Navbar with authentication state */}
      <Navbar isAuthenticated={isAuthenticated} setAuthPopup={setAuthPopup}  handleOrderPopup={handleOrderPopup} />

      {/* Display AuthPopup if user is not authenticated */}
      {authPopup && !isAuthenticated && <AuthPopup setAuthPopup={setAuthPopup} />}

      {/* Routes */}
      <Routes>
      <Route path="/" element={<><Home handleOrderPopup={handleOrderPopup} /><Populaire /></>} />
      <Route path="/collection" element={<Collection />} />

        <Route path="/product/:productId" element={<Product />} />
        
        {/* Route for Cart with authentication check */}
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        
        {/* AddProductPage and MesProduits routes */}
        <Route path="/ajouter-produit" element={isAuthenticated ? <AddProductPage /> : <Navigate to="/" />} />
        <Route path="/mes-produits" element={isAuthenticated ? <MesProduits /> : <Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
