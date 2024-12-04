import { db } from '../firebase';
import { products } from '../../assets/assets';
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// Product CRUD
const uploadProducts = async () => {
  try {
    const productsCollectionRef = collection(db, "products");
    const deletedProductsCollectionRef = collection(db, "deletedProducts");

    // Fetch all existing products and deleted products from Firestore
    const existingProductsSnapshot = await getDocs(productsCollectionRef);
    const deletedProductsSnapshot = await getDocs(deletedProductsCollectionRef);

    const existingProductTitles = existingProductsSnapshot.docs.map(doc => doc.data().title);
    const deletedProductTitles = deletedProductsSnapshot.docs.map(doc => doc.id);

    let addedCount = 0;

    for (const product of products) {
      // Skip if the product already exists or was previously deleted
      if (existingProductTitles.includes(product.title)) {
        console.log(`Product "${product.title}" already exists. Skipping...`);
        continue;
      }
      if (deletedProductTitles.includes(product.title)) {
        console.log(`Product "${product.title}" was deleted previously. Skipping...`);
        continue;
      }

      // Add the product to Firestore
      await addDoc(productsCollectionRef, {
        title: product.title,
        description: product.description,
        price: product.price,
        img: product.img,
        category: product.category,
        type: product.type,
        sizes: product.sizes,
      });

      console.log(`Product "${product.title}" added successfully!`);
      addedCount++;
    }

    console.log(`Total products added: ${addedCount}`);
  } catch (error) {
    console.error("Error adding products to Firestore: ", error);
  }
};

// Delete a product 
export const deleteProduct = async (id) => {
  try {
    const productDocRef = doc(db, "products", id);
    const productDoc = await getDoc(productDocRef);

    if (productDoc.exists()) {
      const productTitle = productDoc.data().title;

      // Add the deleted product's title to the deletedProducts collection
      const deletedProductsCollectionRef = collection(db, "deletedProducts");
      await setDoc(doc(deletedProductsCollectionRef, productTitle), { deletedAt: new Date() });

      // Delete the product document from Firestore
      await deleteDoc(productDocRef);
      console.log(`Product "${productTitle}" deleted and tracked successfully.`);
    } else {
      console.log("Product does not exist.");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Fetch products
export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};

// Fetch user-specific products
export const fetchUserProducts = async (userId) => {
  try {
    const productsCollectionRef = collection(db, "products");
    const q = query(productsCollectionRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching user products:", error);
    throw error;
  }
};

// Add a new product
export const addProduct = async (product) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User is not authenticated");
    }

    const productsCollectionRef = collection(db, 'products');

    // Add the product to Firestore with userId
    await addDoc(productsCollectionRef, {
      ...product,
      userId: user.uid, // Store the userId of the authenticated user
    });

    console.log(`Product "${product.title}" added to Firestore successfully.`);
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export default uploadProducts;
