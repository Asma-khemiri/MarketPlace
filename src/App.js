import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import { auth, db } from './firebase/firebase'; 
import { doc, getDoc } from 'firebase/firestore';

// Components
import Navbar from './components/Navbar/Navbar'; 
import Footer from './components/Footer/Footer'; 
import AuthPopup from './components/AuthPopup';
import Home from './components/Header/Header';
import Populaire from './components/Populaire/Populaire';  

import Collection from './pages/Collection';
import Product from './pages/Product';

import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ConfirmationPage from './pages/ConfirmationPage';
import AddProductPage from './pages/AddProductPage';
import MesProduits from './pages/MesProduits';

const App = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPopup, setAuthPopup] = useState(false); 
  const [orderPopup, setOrderPopup] = useState(false); 
 
  const [userRole, setUserRole] = useState(null);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup); 
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsAuthenticated(true); 
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserRole(data.role); 
        } else {
          console.error("No such document!");
          setUserRole(null); // Set to null if no document exists
        }
      } else {
        setIsAuthenticated(false); 
        setUserRole(null); 
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} userRole={userRole} handleOrderPopup={handleOrderPopup} />
      
      {authPopup && !isAuthenticated && <AuthPopup setAuthPopup={setAuthPopup} />}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<><Home handleOrderPopup={handleOrderPopup} /><Populaire /></>} />
        
        {/* Collection page only accessible by users */}
        <Route 
          path="/collection" 
          element={ <Collection />} 
        />

        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />

        {/* Admin access to AddProductPage */}
        <Route 
          path="/ajouter-produit" 
          element={<AddProductPage />} 
        />
        
        {/* MesProduits page only accessible by users */}
        <Route 
          path="/mes-produits" 
          element={isAuthenticated && userRole === "user" ? <MesProduits /> : <Navigate to="/" />} 
        />
        
        
      </Routes>

      <Footer />
    </>
  );
};

export default App;
