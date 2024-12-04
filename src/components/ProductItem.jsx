import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Trash icon
import { deleteProduct } from '../firebase/services/productService';
import { getAuth } from 'firebase/auth'; // Firebase Auth to get the current user
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ id, img, title, price }) => {
  const { currency } = useContext(ShopContext);
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const auth = getAuth(); // Firebase Auth instance
  const user = auth.currentUser; // Current authenticated user
  const navigate = useNavigate();

  // Function to check if the current user is an admin
  const checkAdminStatus = async () => {
    if (user) {
      try {
        // Fetch user data from Firestore
        const userDocRef = doc(db, 'users', user.uid); // Assuming users are stored under a 'users' collection
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // Assuming the role is stored under 'role' field
          if (userData.role === 'admin') {
            setIsAdmin(true); // Set isAdmin to true if the user is an admin
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  // Call the checkAdminStatus function when the component mounts
  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  // Handle delete logic
  const handleDelete = async (e) => {
    e.stopPropagation(); 

    try {
      await deleteProduct(id); // Delete the product from Firestore
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('There was an error deleting the product.');
    }
  };


  return (
    <div className='relative'>
      {/* Product Item Link */}
      {!isAdmin ? (
      <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
        <div>
          <img className='hover:scale-110 transition ease-in-out' src={img} alt={title} />
        </div>
        <p className='pt-3 pb-1 text-sm'>{title}</p>
        <p className='font-medium text-sm'>{price}{currency}</p>
      </Link>): <Link to={`/edit-product/${id}`} className='text-gray-700 cursor-pointer'>
        <div>
          <img className='hover:scale-110 transition ease-in-out' src={img} alt={title} />
        </div>
        <p className='pt-3 pb-1 text-sm'>{title}</p>
        <p className='font-medium text-sm'>{price}{currency}</p>
      </Link>}

      {/* Delete button - only render if user is an admin */}
      {isAdmin && (
        <div className='absolute top-2 right-2 flex gap-2'>
          {/* Delete Button */}
          <button onClick={handleDelete} className='text-red-500 hover:text-red-700'>
            <FaTrash size={20} />
          </button>


        </div>
      )}
    </div>
  );
};

export default ProductItem;
