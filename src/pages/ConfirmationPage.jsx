import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ConfirmationPage = () => {
  const { getCartItemsDetails, calculateTotalPrice, currency } = useContext(ShopContext);
  const navigate = useNavigate();

  // Initialiser l'état avec des valeurs par défaut
  const [clientInfo, setClientInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  // Récupérer les informations client depuis le stockage local (par exemple)
  useEffect(() => {
    const storedInfo = JSON.parse(localStorage.getItem('clientInfo')) || {};
    setClientInfo(storedInfo);
  }, []);

  // Fonction pour gérer les modifications des informations client
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientInfo({
      ...clientInfo,
      [name]: value,
    });
  };

  // Fonction pour envoyer l'email (simulation)
  const sendEmail = (clientInfo) => {
    console.log('Envoi d\'email avec les informations suivantes:', clientInfo);
    alert('Email envoyé avec succès!');
  };

  // Soumettre les informations et envoyer l'email
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('clientInfo', JSON.stringify(clientInfo));

    // Appel à la fonction sendEmail
    sendEmail(clientInfo);

    alert('Les informations ont été mises à jour avec succès.');
  };

  // Récupérer les détails du panier
  const items = getCartItemsDetails();
  const totalPrice = calculateTotalPrice();

  // Fonction pour revenir à l'accueil
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-orange-400 pb-4">
          Merci pour votre commande, {clientInfo.fullName || 'Client'} !
        </h2>

        {/* Détails de la commande */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Détails de votre commande</h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                <img src={item.img} alt={item.name}                 className="w-36 h-35 sm:w-49 sm:h-45 object-cover rounded-md mx-auto"
 />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    Prix : <span className="font-medium">{item.price} {currency}</span>
                  </p>
                  {Object.entries(item.sizes).map(([size, quantity]) => (
                    <div key={size} className="mt-2">
                      <p className="text-sm text-gray-600">Taille : {size}</p>
                      <p className="text-sm text-gray-600">Quantité : {quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire d'informations client modifiables */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">Nom complet</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={clientInfo.fullName}
              onChange={handleChange}
              className="mt-2 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
              placeholder="Nom Complet"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={clientInfo.email}
              onChange={handleChange}
              className="mt-2 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Numéro de téléphone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={clientInfo.phone}
              onChange={handleChange}
              className="mt-2 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
              placeholder="Numéro de téléphone"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700">Adresse</label>
            <input
              type="text"
              id="address"
              name="address"
              value={clientInfo.address}
              onChange={handleChange}
              className="mt-2 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
              placeholder="Adresse"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-700">Ville</label>
            <input
              type="text"
              id="city"
              name="city"
              value={clientInfo.city}
              onChange={handleChange}
              className="mt-2 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
              placeholder="Ville"
            />
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-700">Code Postal</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={clientInfo.postalCode}
              onChange={handleChange}
              className="mt-2 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
              placeholder="Code Postal"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 mt-6 rounded-lg shadow hover:bg-orange-600 transition duration-300"
          >
            Mettre à jour et envoyer l'email
          </button>
        </form>

        {/* Total de la commande */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-lg font-semibold text-gray-700">Total :</span>
          <span className="text-xl font-bold text-gray-800">
            {totalPrice} {currency}
          </span>
        </div>

        {/* Bouton pour revenir à l'accueil */}
        <button
          onClick={handleBackToHome}
          className="w-full bg-gray-500 text-white py-3 mt-6 rounded-lg shadow hover:bg-gray-600 transition duration-300"
        >
          Revenir à l'accueil
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
