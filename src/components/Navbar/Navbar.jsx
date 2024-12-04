import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Utilisation de useNavigate
import SearchBar from "../SearchBar";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { assets } from '../../assets/assets';
import './Navbar.css';
import { ShopContext } from "../../context/ShopContext";
import AuthPopup from "../AuthPopup"; // Importation du composant AuthPopup
import { IoMdSearch } from "react-icons/io";


const Navbar = ({ handleOrderPopup, userRole }) => {
  const [menu, setMenu] = useState("home");
  const [authPopup, setAuthPopup] = useState(false);
  const { getCartCount, isAuthenticated } = useContext(ShopContext);
  const navigate = useNavigate();

  //  gérer le clic sur Mon compte
 const handleAccountClick = () => {
    if (!isAuthenticated) {
      setAuthPopup(true);
    } else {
      navigate("/profile");
    }
  };



  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <Link to={'/'}>
          <img src={assets.logo} alt="logo" className='logo' />
        </Link>

        <ul className="navbar-menu">
          {userRole === 'admin' &&
            <Link to='/admin-dashboard' className="page-menu">
              <p onClick={() => setMenu("dashboard")} className={menu === "dashboard" ? "active" : ""}>Dashboard</p>
            </Link>}
          {userRole !== 'admin' &&

            <Link className="page-menu" to='/' >
              <p onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Accueil</p>
            </Link>}

          < Link to='/collection' className="page-menu">
            <p onClick={() => setMenu("collection")} className={menu === "collection" ? "active" : ""}>Collection</p>
          </Link>
          {(userRole === 'admin' || userRole === 'user') &&
            <Link to='/ajouter-produit' className="page-menu">
              <p onClick={() => setMenu("addproduct")} className={menu === "addProduct" ? "active" : ""}>Ajouter un Produit</p>
            </Link>}

          {userRole === 'user' &&
            <Link to='/mes-produits' className="page-menu">
              <p onClick={() => setMenu("myproducts")} className={menu === "myproducts" ? "active" : ""}>Mes Produits</p>
            </Link>}
          {userRole !== 'admin' &&
            <Link to='/contact' className="page-menu">
              <p onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contactez-Nous</p>
            </Link>}



        </ul>

        <div className="navbar-right">

        {(userRole === 'user' || userRole === 'admin') ?
          <SearchBar />: <button
          onClick={()=> alert("Vous devez être connecté pour faire une recherche.")}
          className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
        >
          <IoMdSearch className="text-lg text-white" />
        </button>}
         

          <button onClick={handleAccountClick} className="cart-btn">
            <span className="cart-text">Mon compte</span>
            <FaUser className="cart-icon" />
          </button>
          {userRole !== 'admin' &&
          <Link className="cart-btn" to='/cart'>
            <button onClick={isAuthenticated ? handleOrderPopup : handleAccountClick


            } className="cart-btn">
              <span className="cart-text">Panier</span>
              <FaCartShopping className="cart-icon" />
              <p className="cart-badge">{getCartCount()}</p>
            </button>
          </Link>}
        </div>
      </div>

      {/* Affichage du popup d'authentification */}
      <AuthPopup authPopup={authPopup} setAuthPopup={setAuthPopup} />
    </div>
  );
};

export default Navbar;
