import React, { useState, useContext, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getDocs, query, orderBy, limit } from "firebase/firestore";
import { ShopContext } from "../context/ShopContext"; // Assurez-vous que le contexte est bien importé
import AuthPopup from "../components/AuthPopup"; // Assurez-vous que le composant AuthPopup est bien créé

const AddProductForm = () => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState(null);
  const [categorie, setCategorie] = useState("");
  const [taille, setTaille] = useState("");
  const [type, setType] = useState("");
  const { user } = useContext(ShopContext); // Vérification de l'utilisateur connecté
  const [authPopup, setAuthPopup] = useState(false); // État pour afficher le popup d'authentification

  useEffect(() => {
    // Si l'utilisateur n'est pas connecté, afficher le popup d'authentification
    if (!user) {
      setAuthPopup(true);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (!nom || !description || !prix || !categorie || !taille) {
      toast.error("Tous les champs sont obligatoires !");
      return;
    }

    // Validation du prix
    if (isNaN(prix) || prix <= 0) {
      toast.error("Le prix doit être un nombre positif !");
      return;
    }

    // Vérification de l'image
    if (image && !image.type.startsWith('image/')) {
      toast.error("Veuillez télécharger une image valide !");
      return;
    }
    const productsRef = collection(db, "products");
    const q = query(productsRef, orderBy("productId", "desc"), limit(1));  // Trier par productId et récupérer le dernier

    const querySnapshot = await getDocs(q);

    // Déterminer le prochain ID
    const newProductId = querySnapshot.empty ? 1 : querySnapshot.docs[0].data().productId + 1;
    // Création de l'objet produit
    const newProduct = {
      productName: nom.trim(),
      description: description.trim(),
      price: parseFloat(prix), // Convertir le prix en nombre
      productImg: image ? image.name : "Aucune image", // Nom de l'image si elle existe
      category: categorie,
      type,
      size: taille, // Tableau de tailles
      productId: newProductId, // Nouveau ID incrémenté
    };

    try {
      // Ajout du produit à Firestore
      await addDoc(collection(db, "products"), newProduct);
      toast.success("Produit ajouté avec succès !");

      // Réinitialiser le formulaire
      setNom("");
      setDescription("");
      setPrix("");
      setImage(null);
      setCategorie("");
      setType("");
      setTaille("");
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <>
      {authPopup && <AuthPopup authPopup={authPopup} setAuthPopup={setAuthPopup} />}

      <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">
          Ajouter un produit
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
              Nom du produit
            </label>
            <input
              type="text"
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="prix" className="block text-sm font-medium text-gray-700">
              Prix
            </label>
            <input
              type="number"
              id="prix"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image du produit
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="categorie" className="block text-sm font-medium text-gray-700">
              Catégorie
            </label>
            <select
              id="categorie"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Choisir une catégorie</option>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
              <option value="enfant">Enfant</option>
            </select>
          </div>
          <div className="mb-4">
          <label htmlFor="categorie" className="block text-sm font-medium text-gray-700">
            Sous Catégorie
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Choisir une Sous Catégorie</option>
            <option value="homme">Vetements</option>
            <option value="femme">OUTWEAR</option>
            <option value="enfant">Chaussures</option>
          </select>
        </div>

          <div className="mb-4">
            <label htmlFor="taille" className="block text-sm font-medium text-gray-700">
              Taille
            </label>
            <select
              id="taille"
              value={taille}
              onChange={(e) => setTaille(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Choisir une taille</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
          >
            Ajouter le produit
          </button>
        </form>
        <Toaster />
      </div>
    </>
  );
};

export default AddProductForm;
