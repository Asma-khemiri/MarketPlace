import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom'; // Utilisation de useNavigate au lieu de useHistory

const Cart = () => {
  const {
    getCartItemsDetails,
    calculateTotalPrice,
    removeFromCart,
    updateCartQuantity,
    currency,
  } = useContext(ShopContext);

  const items = getCartItemsDetails();
  const navigate = useNavigate(); // Utilisation de useNavigate

  // Fonction de redirection vers la page de paiement
  const handleValidateCart = () => {
    navigate('/checkout'); // Utiliser navigate au lieu de history.push
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Titre du panier */}
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-orange-400 pb-4">
          Panier
        </h2>

        {/* Contenu du panier */}
        {items.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">Votre panier est vide.</p>
        ) : (
          <div className="space-y-6 mt-6">
            {/* Liste des articles */}
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
              >
                {/* Image du produit */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-36 h-35 sm:w-49 sm:h-45 object-cover rounded-md mx-auto"
                />

                {/* Détails du produit */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    Prix : <span className="font-medium">{item.price} {currency}</span>
                  </p>
                  {Object.entries(item.sizes).map(([size, quantity]) => (
                    <div key={size} className="mt-2">
                      <p className="text-sm text-gray-600">Taille : {size}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <button
                          onClick={() => updateCartQuantity(item.id, size, quantity - 1)}
                          disabled={quantity <= 1}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded"
                        >
                          -
                        </button>
                        <span className="text-sm text-gray-600">{quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, size, quantity + 1)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, size)}
                        className="text-orange-500 hover:text-orange-600 text-sm font-medium underline mt-1"
                      >
                        Retirer
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Affichage du total */}
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-lg font-semibold text-gray-700">Total :</span>
              <span className="text-xl font-bold text-gray-800">
                {calculateTotalPrice()} {currency}
              </span>
            </div>
          </div>
        )}

        {/* Bouton de validation */}
        {items.length > 0 && (
          <button
            onClick={handleValidateCart}
            className="w-full bg-orange-500 text-white py-3 mt-6 rounded-lg shadow hover:bg-orange-600 transition duration-300"
          >
            Valider le panier
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
