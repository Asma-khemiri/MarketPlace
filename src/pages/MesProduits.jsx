import React, { useEffect, useState } from "react";
import { fetchUserProducts, deleteProduct } from "../firebase/services/productService";
import { getAuth } from "firebase/auth";
import ProductItem from "../components/ProductItem";
import { useNavigate } from "react-router-dom";  // For navigation after delete/edit

const MesProduits = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null); // State to store userId
  const navigate = useNavigate(); // For navigation after product deletion

  // Fetch user's products from Firestore on user change
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      fetchUserProducts(user.uid)
        .then(setProducts)
        .catch(console.error);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      // Call your service to delete the product from Firestore
      await deleteProduct(id);
      // Remove the deleted product from the UI
      setProducts(products.filter(product => product.id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  const handleEdit = (productId) => {
    // Navigate to the edit page with productId as parameter
    navigate(`/edit-product/${productId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mes Produits</h2>

      {/* Display User's Products */}
      <div className="mt-8">
        <ul>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {products.map((item, index) => (
              <ProductItem
                key={index}
                id={item.id}
                img={item.img}
                title={item.title}
                price={item.price}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default MesProduits;
