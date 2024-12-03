import { db } from './firebase';
import { products } from '../assets/assets';
import { collection, getDocs,addDoc } from "firebase/firestore";

//Product CRUD
const uploadProducts = async () => {
  try {
    const productsCollectionRef = collection(db, "products");

    // Fetch all existing products from Firestore to avoid duplicates
    const querySnapshot = await getDocs(productsCollectionRef);
    const existingProductTitles = querySnapshot.docs.map(doc => doc.data().title); // Collect existing titles
    let addedCount = 0;

    for (const product of products) {
      // Check if the product already exists by title
      if (existingProductTitles.includes(product.title)) {
        console.log(`Product ${product.title} already exists. Skipping...`);
        continue; // Skip adding if the product already exists
      }

      // Add the product if it doesn't exist
      await addDoc(productsCollectionRef, {
        title: product.title,
        description: product.description,
        price: product.price,
        img: product.img,
        category: product.category,
        type: product.type,
        sizes: product.sizes,
      });
      console.log(`Product ${product.title} added successfully!`);
      addedCount++;
    }

    console.log(`Total products added: ${addedCount}`);

  } catch (error) {
    console.error("Error adding products to Firestore: ", error);
  }
};


//fetch products
export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // Firebase document ID
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};
// Add a new product
export const addProduct = async (product) => {
  try {
    const productsCollectionRef = collection(db, 'products'); 
    // Add the product to Firestore
    await addDoc(productsCollectionRef, product);  // addDoc automatically creates a new document with an auto-generated ID
    console.log(`Product "${product.title}" added to Firestore successfully.`);
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;  
  }
};
export default uploadProducts;


