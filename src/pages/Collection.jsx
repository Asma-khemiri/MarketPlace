import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';

import ProductItem from '../components/ProductItem';




const Collection = () => {

  const { products,search } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [type,setType] = useState([]);

  const toggleCategory = (e) =>{
    if(category.includes(e.target.value)){
       setCategory(prev => prev.filter(item =>item !== e.target.value));  
    }
    else{
      setCategory(prev =>[...prev,e.target.value]);
    }
  }
  const toggleType = (e) =>{
    if(type.includes(e.target.value)){
       setType(prev => prev.filter(item =>item !== e.target.value));  
    }
    else{
      setType(prev =>[...prev,e.target.value]);
    }
  }
  const applyFilter = () =>{
    let productCopy = products.slice();
    if(search){
      productCopy =productCopy.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length > 0){
      productCopy = productCopy.filter(item => category.includes(item.category))
    }
    if(type.length > 0){
      productCopy = productCopy.filter(item => type.includes(item.type))
    }
    setFilterProducts(productCopy);
  }
 

  useEffect(() => {
    setFilterProducts(products || [])
  }, [products])
  useEffect(() => {
    applyFilter();
  }, [category,type,search])
  
  return (
    
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      <div className='min-w-60'>
        <div className='border border-gray-300 bg-black text-white pl-5 py-3 mt-6 rounded-lg'>
          <p className='mb-3 text-sm font-medium'> CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 text-white'>
              <input className='w-3' type="checkbox" value={'Femme'}
              onChange={toggleCategory} />Femme
            </p>
          </div>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 text-white'>
              <input className='w-3' type="checkbox" value={'Homme'} onChange={toggleCategory} />Homme
            </p>
          </div>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 text-white'>
              <input className='w-3' type="checkbox" value={'Enfant'} onChange={toggleCategory} />Enfant
            </p>
          </div>

        </div>
        <div className=' border  border-gray-300 bg-black text-white pl-5 py-3 mt-6 rounded-lg' >
          <p className='mb-3 text-sm font-medium'  > TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 text-white'>
              <input className='w-3' type="checkbox" value={'vetements'}  onChange={toggleType} />Vêtements
            </p>
          </div>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 text-white'>
              <input className='w-3' type="checkbox" value={'outwear'}  onChange={toggleType}/>OUTWEAR
            </p>
          </div>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 text-white'>
              <input className='w-3' type="checkbox" value={'chaussures'} onChange={toggleType}/>Chaussures
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
        {filterProducts.map((item, index) => (
          <ProductItem key={index} id={item.id}
            img={item.img} title={item.title} price={item.price}
          />
        ))}
      </div>


    </div>
    </div>
  )
}

export default Collection
