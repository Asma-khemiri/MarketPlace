// /src/components/Pages/AddProductPage.js
import React from 'react';
import AddProductForm from '../components/AddProductForm';

const AddProductPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold text-orange-600 text-center mb-6">Ajouter un Nouveau Produit</h1>
<AddProductForm/>
    </div>
  );
};

export default AddProductPage;
