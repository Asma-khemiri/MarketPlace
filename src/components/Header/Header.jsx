import React, { useEffect, useState } from "react";
import Image1 from "../../assets/Header/women.png";
import Image2 from "../../assets/Header/shopping.png";
import Image3 from "../../assets/Header/sale.png";
import './Header.css'; 



const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Jusqu'à 50 % de réduction sur tous les vêtements pour hommes",
    description: "Bénéficiez de jusqu'à 50 % de réduction sur tous les vêtements pour hommes !",
  },
  {
    id: 2,
    img: Image2,
    title: "30% de réduction sur tous les vêtements pour femmes",
    description: "Profitez de 30 % de réduction sur tous les vêtements pour femmes !",
  },
  {
    id: 3,
    img: Image3,
    title: "70% de réduction sur tous les produits en vente",
    description: "Profitez de 70 % de réduction sur tous les produits en vente !",
  },
];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Changer d'image toutes les 4 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === ImageList.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header_container">
      <div className="header_background"></div>
      <div className="header_content">
        <div
          className="carousel"
          style={{ transform: `translateX(-${currentIndex * (100 / ImageList.length)}%)` }}
        >
          {ImageList.map((data) => (
            <div key={data.id} className="carousel_item">
              <img src={data.img} alt={data.title} className="header_image" />
              <div className="text_content">
                <h1 className="header_title">{data.title}</h1>
                <p className="header_description">{data.description}</p>
                <button className="btn">Voir Article</button>
               
                
              </div>
              
              
              
            </div>
           
            
          ))}
         
         
        </div>
       
       
      </div>
     
    </div>
    
    
    
  );
  
};

export default Header;
