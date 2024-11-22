import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';


const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item.id == productId) {
        setProductData(item);
        setImage(item.img[0])
        return null;
      }
    })
  }
  useEffect(() => {
    fetchProductData();
  }, [productId, products])
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* creating the UI of a product*/}
      {/*product data*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/*-----product image----*/}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>


          <div className=" p-5 w-full sm:w-[80%]">
            <img className="w-full mb-2 h-auto" src={image} alt="" />
          </div>
        </div>
        {/*-----product info-----*/}
        <div className='flex-1'>
          <h1 className="text-2xl font-smedium mb-2">{productData.title}</h1>
          <div className='flex itrms-center gap-1 mt-2'>
            <img src="" alt="" className="w-3-5" />
            <img src="" alt="" className="w-3-5" />
            <img src="" alt="" className="w-3-5" />
            <img src="" alt="" className="w-3-5" />
            <img src="" alt="" className="w-3-5" />
            <p>()</p>
          </div>
          <p className="text-xl font-bold mb-4">{productData.price} {currency}</p>
          <p className=' text-gray-500 md:w-4/5'>{/*productData.description*/}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Size:</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-orange-100 ${item === size ? 'border-black' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData.id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>Ajouter au Panier</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gary-500 mt-5 flex flex-col gap-1'>
            <p></p>
            <p></p>
            <p></p>
          </div>

        </div>





      </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
