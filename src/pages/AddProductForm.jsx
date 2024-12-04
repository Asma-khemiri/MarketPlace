import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { handleImageUpload } from "../utils/imageUpload";
import { addProduct } from "../firebase/services/productService";

const AddProductForm = ({setProducts}) => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState(null);
  const [categorie, setCategorie] = useState("");

  const [type, setType] = useState("");
  const [taille, setTaille] = useState({
    S: false,
    M: false,
    L: false,

  });
  const handleSizeChange = (e) => {
    const { name, checked } = e.target;
    setTaille((prevSizes) => ({
      ...prevSizes,
      [name]: checked,
    }));
  };


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

    // Upload image to Cloudinary and get the image URL
    let imageUrl = "";
    if (image) {
      try {
        imageUrl = await handleImageUpload(image); 
      } catch (error) {
        toast.error(error.message);
        return;
      }
    }
    // Collect sizes as an array
  const selectedSizes = Object.keys(taille).filter((size) => taille[size]);

    const newProduct = {
      title: nom.trim(),
      description: description.trim(),
      price: parseFloat(prix),
      img: imageUrl || "No image", //  image URL from Cloudinary
      category: categorie,
      type,
      sizes:selectedSizes,
    };

    // Ajout du produit à Firestore
    try {
      await addProduct(newProduct);
      toast.success("Produit ajouté avec succès !");
      // After adding product, update the products list in MesProduits page
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      
    

      // Reset form
      setNom("");
      setDescription("");
      setPrix("");
      setImage(null);
      setCategorie("");
      setType("");
      setTaille({ S: false, M: false, L: false})
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };



  return (
    <>


      <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h1 className="text-4xl font-semibold text-orange-600 text-center mb-6">Ajouter un Nouveau Produit</h1>
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
              <option value="vetements">Vetements</option>
              <option value="outwear">OUTWEAR</option>
              <option value="chaussures">Chaussures</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Taille(s)</label>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="S"
                  checked={taille.S}
                  onChange={handleSizeChange}
                  className="mr-2"
                />
                S
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="M"
                  checked={taille.M}
                  onChange={handleSizeChange}
                  className="mr-2"
                />
                M
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="L"
                  checked={taille.L}
                  onChange={handleSizeChange}
                  className="mr-2"
                />
                L
              </label>
             
            </div>
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