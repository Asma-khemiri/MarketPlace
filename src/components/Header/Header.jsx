import React, { useEffect, useState } from "react";
import Image1 from "../../assets/Header/image11.jpg";
import Image2 from "../../assets/Header/image.png";
import Image3 from "../../assets/Header/kids.jpg";

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
    title: "30% de réduction sur tous les vêtements pour les femmes",
    description: "Profitez de 30 % de réduction sur tous les vêtements femmes !",
  },
  {
    id: 3,
    img: Image3,
    title: "Jusqu'à 70 % de réduction sur une sélection d'articles pour enfants",
    description: "offrez le meilleur à vos petits à des prix imbattables !",
  },
];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === ImageList.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden h-screen w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {ImageList.map((data) => (
          <div
            key={data.id}
            className="min-w-full flex flex-col items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${data.img})` }}
          >
            <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {data.title}
              </h1>
              <p className="text-lg md:text-2xl text-orange-300 mb-6">
                {data.description}
              </p>
             
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex justify-between items-center px-4">
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? ImageList.length - 1 : prevIndex - 1
            )
          }
          className="text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition"
        >
          ❮
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === ImageList.length - 1 ? 0 : prevIndex + 1
            )
          }
          className="text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition"
        >
          ❯
        </button>
      </div>
      <div className="absolute bottom-4 flex justify-center w-full space-x-2">
        {ImageList.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              currentIndex === idx ? "bg-orange-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
