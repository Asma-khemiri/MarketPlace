import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";


//command CRUD
// Add a new command:
export const addCommand = async (userId, selectedItems, totalPrice) => {
  try {
    const commandsCollectionRef = collection(db, "orders");

    // Prepare the command data
    const commandData = {
      userId, 
      items: selectedItems.map(item => ({
        productId: item.id, 
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice,
      timestamp: serverTimestamp(), // Firestore server timestamp
    };

    // Add the command to Firestore
    const docRef = await addDoc(commandsCollectionRef, commandData);
    console.log("Command added successfully with ID: ", docRef.id);
    return docRef.id; // Return the document ID for further use if needed
  } catch (error) {
    console.error("Error adding command: ", error);
    throw error;
  }
};

// Fetch all commands (for admin)
export const fetchAllCommands = async () => {
  try {
    const commandsCollectionRef = collection(db, "orders");
    const querySnapshot = await getDocs(commandsCollectionRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching commands: ", error);
    throw error;
  }
};

// Fetch commands for a specific user
export const fetchUserCommands = async (userId) => {
  try {
    const commandsCollectionRef = collection(db, "orders");
    const userCommandsQuery = query(
      commandsCollectionRef,
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(userCommandsQuery);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching user commands: ", error);
    throw error;
  }
};
