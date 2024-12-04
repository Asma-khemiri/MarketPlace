import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { ShopContext } from '../context/ShopContext';
import { handleImageUpload } from '../utils/imageUpload';

function EditProduct() {
  const { products, currency } = useContext(ShopContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const { productId } = useParams(); // Get the productId from URL params
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [image, setImage] = useState('');
  const [productData, setProductData] = useState(null); // State for product details
  const [isEditing, setIsEditing] = useState(true);

  const auth = getAuth(); // Firebase Auth instance
  const user = auth.currentUser; // Current authenticated user
  const navigate = useNavigate();

  // Function to check if the current user is an admin
  const checkAdminStatus = async () => {
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid); // Assuming users are stored under a 'users' collection
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.role === 'admin') {
            setIsAdmin(true); // Set isAdmin to true if the user is an admin
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  const fetchProductData = () => {
    const product = products.find((item) => item.id === productId);  // the productId = product document ID in Firestore
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
    }
  }, [productId, products]);

  const handleSave = async () => {
    if (productData) {
      try {
        const productDocRef = doc(db, 'products', productId);
        await updateDoc(productDocRef, {
          title: productData.title,
          description: productData.description,
          price: productData.price,
          sizes,
          img: image
        });
        toast.success('Produit mis à jour avec succès !');
      } catch (error) {
        console.error('Error updating product:', error);
        alert('There was an error updating the product.');
      }
    }
  };


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await handleImageUpload(file);  // Upload image and get the URL
        setImage(imageUrl);  // Update the image state with the URL
      } catch (error) {
        toast.error("Erreur de téléchargement de l'image. Veuillez réessayer.");
      }
    }
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-t-2 pt-10 px-4 sm:px-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">Modifier le Produit</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto rounded-lg mb-4 shadow-lg"
              src={image || ""}
              alt={productData.title}
            />
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image-upload"
              className="w-full block bg-gray-200 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-300 transition duration-300 py-3 text-center font-medium text-gray-700"
            >
              Changer la photo du produit
            </label>
          </div>
        </div>
  
        <div className="flex flex-col space-y-6">
          <div>
            <label className="text-orange-700 font-medium">Nom du Produit:</label>
            <input
              className="border p-3 w-full rounded-lg"
              value={productData.title}
              onChange={(e) =>
                setProductData({ ...productData, title: e.target.value })
              }
            />
          </div>
  
          <div>
            <label className="text-orange-700 font-medium">Description:</label>
            <textarea
              className="border p-3 w-full rounded-lg"
              value={productData.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
            />
          </div>
  
          <div>
            <label className="text-orange-700 font-medium">Prix:</label>
            <input
              className="border p-3 w-full rounded-lg"
              type="number"
              value={productData.price}
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
            />
          </div>
  
          <div>
            <label className="text-orange-700 font-medium">Taille:</label>
            <div className="flex flex-wrap gap-3">
              {sizes && sizes.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newSizes = [...sizes];
                    newSizes[index] = e.target.value;
                    setSizes(newSizes);
                  }}
                  className="border p-3 w-24 rounded-lg"
                />
              ))}
            </div>
          </div>
  
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default EditProduct;
