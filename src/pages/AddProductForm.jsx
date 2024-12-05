import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { handleImageUpload } from "../utils/imageUpload";
import { addProduct } from "../firebase/services/productService";

const AddProductForm = ({ setProducts }) => {
  const initialTailleState = { S: false, M: false, L: false, "36": false, "37": false, "38": false, "20": false, "21": false, "22": false };
  
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    prix: "",
    image: null,
    categorie: "",
    type: "",
    taille: initialTailleState,
  });

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Handle checkbox changes for sizes
  const handleSizeChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      taille: { ...prev.taille, [name]: checked },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nom, description, prix, image, categorie, type, taille } = formData;

    // Form validation
    if (!nom || !description || !prix || !categorie || !type) {
      toast.error("Tous les champs sont obligatoires !");
      return;
    }

    if (isNaN(prix) || prix <= 0) {
      toast.error("Le prix doit être un nombre positif !");
      return;
    }

    if (image && !image.type.startsWith("image/")) {
      toast.error("Veuillez télécharger une image valide !");
      return;
    }

    // Upload image to Cloudinary
    let imageUrl = "";
    if (image) {
      try {
        imageUrl = await handleImageUpload(image);
      } catch (error) {
        toast.error("Erreur lors de l'upload de l'image.");
        return;
      }
    }

    // Extract selected sizes
    const selectedSizes = Object.keys(taille).filter((size) => taille[size]);

    // Prepare product data
    const newProduct = {
      title: nom.trim(),
      description: description.trim(),
      price: parseFloat(prix),
      img: imageUrl || "No image",
      category: categorie,
      type,
      sizes: selectedSizes,
    };

    // Add product to Firebase
    try {
      await addProduct(newProduct);
      toast.success("Produit ajouté avec succès !");
      setProducts((prev) => [...prev, newProduct]);

      // Reset form
      setFormData({
        nom: "",
        description: "",
        prix: "",
        image: null,
        categorie: "",
        type: "",
        taille: initialTailleState,
      });
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <h1 className="text-4xl font-semibold text-orange-600 text-center mb-6">Ajouter un Nouveau Produit</h1>

        {/* Input fields */}
        {["nom", "description", "prix"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm font-medium text-gray-700" htmlFor={field}>
              {field === "nom" ? "Nom du produit" : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "prix" ? "number" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        ))}

        {/* Image upload */}
        <div className="mb-4">
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
           className="hidden"
          />
          <label
              htmlFor="image"
              className="w-full block bg-gray-200 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-300 transition duration-300 py-3 text-center font-medium text-gray-700"
            >
            Image du produit
            </label>
        </div>

        {/* Category */}
        {["categorie", "type"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm font-medium text-gray-700" htmlFor={field}>
              {field === "categorie" ? "Catégorie" : "Sous Catégorie"}
            </label>
            <select
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">{field === "categorie" ? "Choisir une catégorie" : "Choisir une Sous Catégorie"}</option>
              {field === "categorie" ? (
                ["Homme", "Femme", "Enfant"].map((cat) => <option key={cat} value={cat}>{cat}</option>)
              ) : (
                ["vetements", "outwear", "chaussures"].map((sub) => <option key={sub} value={sub}>{sub}</option>)
              )}
            </select>
          </div>
        ))}

        {/* Sizes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Taille(s)</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {Object.keys(formData.taille).map((size) => (
              <label className="flex items-center" key={size}>
                <input
                  type="checkbox"
                  name={size}
                  checked={formData.taille[size]}
                  onChange={handleSizeChange}
                  className="mr-2"
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <button type="submit" className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
          Ajouter le produit
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default AddProductForm;
