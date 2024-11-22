import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import {ShopContext} from '../context/ShopContext';


const ProductItem = ({id,img,title,price}) => { 
  const {currency} = useContext(ShopContext);
  return (
    
      <Link  to={`/product/${id}`}  className='text-gray-700 cursor-pointer'>
        <div className='overflow-hidden'>
          <img className='hover:scale-110 transition ease-in-out'  src={img}  />
        </div>
        <p className='pt-3 pb-1 text-sm' > {title}</p>
        <p className='font-medium text-sm' > {price}{currency}</p>

      </Link>
    
  )
}

export default ProductItem
