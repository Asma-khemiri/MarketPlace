import { storage } from './firebase'; // Importer la configuration Firebase
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Fonction pour uploader une image et obtenir l'URL
export const uploadImage = async (file) => {
  try {
    // Créer une référence dans le stockage Firebase
    const storageRef = ref(storage, 'images/' + file.name);

    // Télécharger l'image dans Firebase Storage
    await uploadBytes(storageRef, file);

    // Obtenir l'URL de l'image téléchargée
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl; // Retourner l'URL de l'image
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image:", error);
    throw new Error("Erreur lors du téléchargement de l'image");
  }
};
