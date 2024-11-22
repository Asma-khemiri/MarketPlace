import React, { useContext, useEffect, useState } from 'react'
import './Populaire.css'; 
import { ShopContext } from '../../context/ShopContext';
import ProductItem from '../ProductItem';


const Populaire = () => {
    const {products} = useContext(ShopContext);
    //console.log(products)
   
    const [populaire,setPopulaire] =useState([]);

    useEffect(()=>{
        setPopulaire(products.slice(0,4));
    },[])
  return (

    <div className='populaire'>
    <h1>MEILLEURE SÉLECTION POUR VOUS</h1> <hr />

    <div className='populaire-item'>
    {populaire.map((item,index) => (
     <ProductItem key = {index} id = {item.id} 
     img={item.img} title={item.title} price={item.price}
     />
    ))}

</div>
</div>

  )
}

export default Populaire
