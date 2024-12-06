import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, db } from "./firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { PowerBIEmbed } from "powerbi-client-react";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AuthPopup from "./components/AuthPopup";
import Header from "./components/Header/Header";
import Populaire from "./components/Populaire/Populaire";

// Pages
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AddProductForm from "./pages/AddProductForm";
import MesProduits from "./pages/MesProduits";
import EditProduct from "./pages/EditProduct";
import Dashboard from "./components/admin/Dashboard";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPopup, setAuthPopup] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        } else {
          console.error("User document does not exist");
          setUserRole(null);
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        handleOrderPopup={handleOrderPopup}
      />

      {authPopup && !isAuthenticated && <AuthPopup setAuthPopup={setAuthPopup} />}

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Header handleOrderPopup={handleOrderPopup} />
              <Populaire />
            </>
          }
        />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            userRole === "admin" ? <Dashboard /> : <Navigate to="/" />
          }
        />
        <Route
          path="/edit-product/:productId"
          element={
            userRole === "admin" ? <EditProduct /> : <Navigate to="/" />
          }
        />

        {/* User Routes */}
        <Route
          path="/mes-produits"
          element={
            isAuthenticated && userRole === "user" ? (
              <MesProduits />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/ajouter-produit"
          element={
            isAuthenticated && (userRole === "user" || userRole === "admin") ? (
              <AddProductForm setProducts={setProducts} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
