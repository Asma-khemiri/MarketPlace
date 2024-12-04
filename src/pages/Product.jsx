import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { getAuth } from 'firebase/auth';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { handleImageUpload } from '../utils/imageUpload';
import toast from 'react-hot-toast';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);

  // Get user authentication details
  const auth = getAuth();
  const user = auth.currentUser;
  
  const isAdmin = user?.email === "benbrahimsalma18@gmail.com";

  // Fetch the product data based on productId
  const fetchProductData = () => {
    const product = products.find((item) => item.id === productId); // Find the product by productId
    if (product) {
      setProductData(product);
      setImage(product.img || "");
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price);
      setSizes(product.sizes);
    } else {
      console.log('Produit non trouvé');
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      fetchProductData();
    } else {
      console.log('Pas de produits disponibles');
    }
  }, [productId, products]);

  // Handle product update for admin
  const handleUpdateProduct = async () => {
    const productRef = doc(db, 'products', productId);
    try {
      await updateDoc(productRef, {
        title,
        description,
        price,
        sizes,
        img: image
      });
      toast.success('Produit mis à jour avec succès !');
      setIsEditing(false);
    } catch (error) {
      toast.error('There was an error updating the product.');
    }
  };

  // Handle adding to cart for customers
  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(productData.id, selectedSize);  // Add to cart with product ID and size
    } else {
      toast.error("Veuillez sélectionner une taille avant d'ajouter au panier.");
    }
  };

  // Handle product deletion for admins
  const handleDeleteProduct = async () => {
    const productRef = doc(db, 'products', productId);
    try {
      await deleteDoc(productRef);  // Delete the product from Firestore
      toast.success('Produit supprimé avec succès!');
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la suppression du produit.");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await handleImageUpload(file);
        setImage(imageUrl);
      } catch (error) {
        toast.error("Erreur de téléchargement de l'image.");
      }
    }
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="p-5 w-full sm:w-[80%]">
            <img
              className="w-full mb-2 h-auto"
              src={image || ""}
              alt={productData.title}
            />
          </div>
        </div>

        <div className="flex-1">
          {isEditing ? (
            <>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload" className="flex items-center justify-center w-full h-12 bg-gray-200 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-300 transition duration-300">
                  <span className="text-gray-700 font-medium">Changer la photo du produit</span>
                </label>
              </div>
              <h1 className="text-2xl font-semibold mb-2">
                <label className="block text-lg font-medium text-orange-700">Nom du Produit:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border p-2 w-full"
                />
              </h1>
              <label className="text-orange-700 font-medium">Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full mb-4"
                placeholder="Product description"
              />
              <label className="text-orange-700 font-medium">Prix:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border p-2 w-full mb-4"
                placeholder="Price"
              />
              <div className="flex flex-col gap-4 my-8">
                <p className="text-orange-700 font-medium">Taille:</p>
                <div className="flex gap-2">
                  {sizes.map((item, index) => (
                    <input
                      key={index}
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newSizes = [...sizes];
                        newSizes[index] = e.target.value;
                        setSizes(newSizes);
                      }}
                      className="border py-2 px-4"
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleUpdateProduct}
                className="bg-green-500 text-white px-8 py-3 text-sm"
              >
                Enregistrer les modifications
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold mb-2">{productData.title}</h1>
              <p className="text-xl font-bold mb-4">
                {productData.price} {currency}
              </p>
              <p className="text-gray-500 md:w-4/5">{productData.description}</p>

              {user && productData.userId === user.uid && (
                <div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-black text-white px-4 py-2 mt-4"
                  >
                    Modifier votre produit
                  </button>
                  <button
                    onClick={handleDeleteProduct}
                    className="bg-red-500 text-white px-4 py-2 mt-4 ml-2"
                  >
                    Supprimer votre produit
                  </button>
                </div>
              )}

              {!isAdmin && (
                <div className="flex flex-col gap-4 my-8">
                  <p>Taille(s):</p>
                  <div className="flex gap-2">
                    {productData.sizes.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(item)}
                        className={`border py-2 px-4 bg-orange-100 ${item === selectedSize ? 'border-black' : ''}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!isAdmin && (
                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
                >
                  Ajouter au Panier
                </button>
              )}
            </>
          )}
          <hr className="mt-8 border-t-2" />
        </div>
      </div>
    </div>
  );
};

export default Product;
