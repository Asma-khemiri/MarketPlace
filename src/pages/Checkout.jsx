import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { addCommand } from '../firebase/services/commandService';
import { getAuth } from 'firebase/auth';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';

const Checkout = () => {
  const {
    getCartItemsDetails,
    calculateTotalPrice,
    currency,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardExpiry: '',
    cvv: '',
    paypalEmail: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('Carte de Crédit');
  const [userId, setUserId] = useState(null);

  const items = getCartItemsDetails();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    } else {
      toast.error("Vous devez être connecté pour passer une commande.");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleConfirmOrder = async (event) => {
    event.preventDefault();

    if (!userId) {
      toast.error("Vous devez être connecté pour passer une commande.");
      return;
    }

    const totalPrice = calculateTotalPrice();
    const selectedItems = items.map(item => ({
      id: item.id,
      title: item.title,
      quantity: item.sizes[Object.keys(item.sizes)[0]],
      price: item.price,
    }));

    try {
      await addCommand(userId, selectedItems, totalPrice);
      toast.success('Commande passée avec succès !');
      sendEmail(formData, items, totalPrice);
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la commande.");
    }
  };

  const sendEmail = async (formData, items, totalPrice) => {
    const formattedItems = items.map(item => {
      const sizeDetails = Object.entries(item.sizes)
        .map(([size, quantity]) => `Taille(s): ${size}, nombre d'article(s) ${quantity}`)
        .join(', ');

      return `${item.title} - ${sizeDetails}`;
    }).join('\n');

    const emailData = {
      name: formData.name,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      paymentMethod: paymentMethod,
      items: formattedItems,
      totalPrice: totalPrice,
      currency: currency,
    };

    try {
      await emailjs.send(
        'service_8n3fd99',
        'template_2tm0j1e',
        emailData,
        'QHNLRut0hrp0tJLAZ'
      );
      toast.success('E-mail envoyé avec succès !');
    } catch (error) {
      toast.error("Une erreur s'est produite lors de l'envoi de votre e-mail.");
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-orange-400 pb-4">
          Détails de la commande
        </h2>

        {/* Formulaire de l'utilisateur */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Informations de livraison</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nom complet"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Adresse de livraison"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
            <input
              type="text"
              name="city"
              placeholder="Ville"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Code postal"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>
        </div>

        {/* Liste des articles */}
        <div className="space-y-6 mt-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-36 h-35 sm:w-49 sm:h-45 object-cover rounded-md mx-auto"
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

        {/* Affichage du total */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-lg font-semibold text-gray-700">Total :</span>
          <span className="text-xl font-bold text-gray-800">
            {calculateTotalPrice()} {currency}
          </span>
        </div>

        {/* Choix du mode de paiement */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Choisissez votre mode de paiement</h3>
          <div className="space-x-4 mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="Master Card"
                checked={paymentMethod === 'Master Card'}
                onChange={handlePaymentMethodChange}
                className="form-radio"
              />
              <span className="ml-2">Master Card</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="Visa Card"
                checked={paymentMethod === 'Visa Card'}
                onChange={handlePaymentMethodChange}
                className="form-radio"
              />
              <span className="ml-2">Visa Card</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={handlePaymentMethodChange}
                className="form-radio"
              />
              <span className="ml-2">PayPal</span>
            </label>
          </div>
        </div>


        {/* Champs pour Carte Bancaire (MasterCard ou Visa) */}
        {(paymentMethod === 'Master Card' || paymentMethod === 'Visa Card') && (
          <div className="mt-6">
            <input
              type="text"
              name="cardNumber"
              placeholder="Numéro de carte"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="cardExpiry"
              placeholder="Date d'expiration"
              value={formData.cardExpiry}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>
        )}

        {/* Champs pour PayPal */}
        {paymentMethod === 'PayPal' && (
          <div className="mt-6">
            <input
              type="email"
              name="paypalEmail"
              placeholder="Adresse e-mail PayPal"
              value={formData.paypalEmail}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        )}

        {/* Bouton de confirmation */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleConfirmOrder}
            className="bg-orange-400 text-white py-2 px-6 rounded-md hover:bg-orange-500"
          >
            Confirmer la commande
          </button>
        </div>

        {/* Retour à la page d'accueil */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleGoHome}
            className="bg-gray-300 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-400"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
