import React, { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // Assurez-vous d'importer le db correctement
import { toast } from 'react-hot-toast';
import ProductItem from '../components/ProductItem'; // Assurez-vous que le composant ProductItem est importé

const MesProduits = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "produits"));
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
      setFilterProducts(productsList); // Remplir la liste filtrée initiale avec tous les produits
      toast.success("Les produits ont été récupérés avec succès.");
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
      toast.error("Erreur lors de la récupération des produits.");
    }
  };

  useEffect(() => {
    fetchProducts(); // Récupère les produits lors du premier rendu du composant
  }, []);

  return (
    <div className='flex flex-col sm:flex-row gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTRES</p>
        <div className='border border-gray-300 pl-5 py-3 mt-6'>
          <p className='mb-3 text-sm font-medium'> CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Femme'} />
              Femme
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Homme'} />
              Homme
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Enfant'} />
              Enfant
            </p>
          </div>
        </div>
      </div>
      
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <div className=" inline-flex gap-2 items-center mb-3 font-medium">
            TOUS LES PRODUITS
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((product, index) => (
            <ProductItem 
              key={index} 
              id={product.id} 
              img={product.image || "default-image.jpg"} // Image par défaut si image non disponible
              title={product.nom} 
              price={product.prix} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MesProduits;
