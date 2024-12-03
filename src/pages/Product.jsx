import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { productId } = useParams();  // Get the productId from URL params
  const { products, currency, addToCart } = useContext(ShopContext);  // Access global products and cart functionality
  const [productData, setProductData] = useState(null);  // State to hold product details
  const [image, setImage] = useState("");  // State for product image
  const [selectedSize, setSelectedSize] = useState("");  // State to hold the selected size

  // Function to fetch the product data based on productId from the URL
  const fetchProductData = () => {
    // Assuming productId is the Firestore document ID (a string), find the product by its Firestore ID
    const product = products.find((item) => item.id === productId);  // Match Firestore document ID (string)
    
    if (product) {
      console.log('Found product:', product);  // Log to check if the product is found
      setProductData(product);  // Set the product data
      setImage(product.img || "");  // Set the first image if available
    } else {
      console.log('Product not found');  // Add log to check if the product is not found
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      fetchProductData();
    } else {
      console.log('No products available');
    }
  }, [productId, products]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  // Check if sizes and image are available
  if (!productData.sizes || productData.sizes.length === 0 || !productData.img) {
    return <div>Product details are missing or incomplete.</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="p-5 w-full sm:w-[80%]">
            <img
              className="w-full mb-2 h-auto"
              src={image || "/path/to/placeholder.jpg"}
              alt={productData.title}
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-2">{productData.title}</h1>
          <p className="text-xl font-bold mb-4">
            {productData.price} {currency}
          </p>
          <p className="text-gray-500 md:w-4/5">{productData.description}</p>

          <div className="flex flex-col gap-4 my-8">
            <p>Size:</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(item)}  // Set selected size when clicked
                  className={`border py-2 px-4 bg-orange-100 ${item === selectedSize ? 'border-black' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              if (selectedSize) {
                addToCart(productData.id, selectedSize);  // Add the Firestore document ID directly to the cart
              } else {
                alert("Please select a size before adding to cart.");
              }
            }}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            Ajouter au Panier
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            {/* Additional product details */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
