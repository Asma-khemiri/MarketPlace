import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Utilisation de useNavigate
import { IoMdSearch } from "react-icons/io";
import SearchBar from "../SearchBar";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { assets } from '../../assets/assets';
import './Navbar.css';
import { ShopContext } from "../../context/ShopContext";
import AuthPopup from "../AuthPopup"; // Importation du composant AuthPopup

const Navbar = ({ handleOrderPopup }) => {
  const [menu, setMenu] = useState("home");
  const [authPopup, setAuthPopup] = useState(false); // État pour le popup
  const { getCartCount, isAuthenticated } = useContext(ShopContext); // Ajout de l'état d'authentification
  const navigate = useNavigate(); // Utilisation de useNavigate pour rediriger

  // Fonction pour gérer le clic sur Mon compte
  const handleAccountClick = () => {
    if (!isAuthenticated) {
      setAuthPopup(true); // Afficher le popup si l'utilisateur n'est pas connecté
    } else {
      // Rediriger vers la page de profil si l'utilisateur est authentifié
      navigate("/profile");
    }
  };
  // Fonction pour gérer le clic sur le panier
  const handleCartClick = () => {
    if (!isAuthenticated) {
      setAuthPopup(true); // Afficher le popup si l'utilisateur n'est pas connecté
    } else {
      // Rediriger vers le panier si l'utilisateur est authentifié
      navigate("/cart");
    }
  };

  // Fonction pour gérer les clics sur les liens de la navbar
  const handleNavClick = (path) => {
    if (!isAuthenticated) {
      setAuthPopup(true); // Afficher le popup si l'utilisateur n'est pas connecté
    } else {
      // Rediriger vers la page correspondante si l'utilisateur est authentifié
      navigate(path);
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <Link to={'/'}>
          <img src={assets.logo} alt="logo" className='logo' />
        </Link>
        <ul className="navbar-menu">
          <Link className="page-menu" to='/' >
            <p onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Accueil</p>
          </Link>
          <Link to='/collection' className="page-menu">
          <p onClick={() => setMenu("collection")} className={menu === "collection" ? "active" : ""}>Collection</p>

          </Link>
          <Link to='/ajouter-produit' className="page-menu">
            <p onClick={() => handleNavClick("/ajouter-produit")} className={menu === "addProduct" ? "active" : ""}>Ajouter un Produit</p>
          </Link>
          <Link to='/mes-produits' className="page-menu">
            <p onClick={() => handleNavClick("/mes-produits")} className={menu === "mesProduits" ? "active" : ""}>Mes Produits</p>
          </Link>
          <Link to='/contact' className="page-menu">
            <p onClick={() => handleNavClick("/contact")} className={menu === "contact" ? "active" : ""}>Contactez-Nous</p>
          </Link>
        </ul>

        <div className="navbar-right">
          <SearchBar />

          <button onClick={handleAccountClick} className="cart-btn">
            <span className="cart-text">Mon compte</span>
            <FaUser className="cart-icon" />
          </button>

          <Link className="cart-btn" to='/cart'>
            <button onClick={handleOrderPopup} className="cart-btn">
              <span className="cart-text">Panier</span>
              <FaCartShopping className="cart-icon" />
              <p className="cart-badge">{getCartCount()}</p>
            </button>
          </Link>
        </div>
      </div>

      {/* Affichage du popup d'authentification */}
      <AuthPopup authPopup={authPopup} setAuthPopup={setAuthPopup} />
    </div>
  );
};

export default Navbar;
