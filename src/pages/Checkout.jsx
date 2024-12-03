import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
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
  });

  
  const [paymentMethod, setPaymentMethod] = useState('Carte de Crédit'); // Default payment method is card

  const items = getCartItemsDetails();
  
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
        'service_xapcvwf',  //my EmailJS service ID
        'template_qpkwe44', //my EmailJS template ID
        emailData,
        'lFwF6dBUMQ82nso0U' //my EmailJS user ID
      );

      toast.success('E-mail envoyé avec succès !');

    } catch (error) {
      toast.error("Une erreur s'est produite lors de l'envoi de votre e-mail.");

    }
  };

  const handleConfirmOrder = (event) => {
    event.preventDefault();

    // Get total price
    const totalPrice = calculateTotalPrice();

    // Send the email via EmailJS
    sendEmail(formData, items, totalPrice);

   
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
          <div className="sflex space-x-4 mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="Carte de Crédit"
                checked={paymentMethod === 'Carte de Crédit'}
                onChange={handlePaymentMethodChange}
                className="form-radio"
              />
              <span className="ml-2">Carte bancaire</span>
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
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="Paiement à la Livraison"
                checked={paymentMethod === 'Paiement à la Livraison'}
                onChange={handlePaymentMethodChange}
                className="form-radio"
              />
              <span className="ml-2">Paiement à la Livraison</span>
            </label>
            
          </div>
        </div>

        {/* Formulaire de paiement avec carte bancaire (si sélectionné) */}
        {paymentMethod === 'Carte de Crédit' && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Entrez les informations de votre carte bancaire</h3>
            <input
              type="text"
              name="cardNumber"
              placeholder="Numéro de carte"
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Date d'expiration"
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
          </div>
        )}
        <hr />
         {paymentMethod === 'PayPal' && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Entrez les informations de votre compte Paypal</h3>
            <input
              type="text"
              name="comptePaypal"
              placeholder="Email du Compte PayPal"
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
            <input
              type="text"
              name="passwoed"
              placeholder="Mot De Passe"
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
           
          </div>
        )}

        {/* Bouton pour confirmer la commande */}
        <form onSubmit={handleConfirmOrder}>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 mt-6 rounded-lg shadow hover:bg-orange-600 transition duration-300"
          >
            Valider la commande
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
