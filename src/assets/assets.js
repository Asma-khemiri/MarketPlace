import logo from './logo.png';


import surchemise1 from './Catalogue/veste1.jpg';
import surchemise2 from './Catalogue/veste2.jpg';
import surchemise3 from './Catalogue/veste4.jpg';
import veste5 from './Catalogue/veste5.jpg';





import pontalon1 from './Catalogue/pants1.jpg';
import pontalon2 from './Catalogue/pants2.jpg';
import pantalon3 from  './Catalogue/jeans.jpg';
import pantalon4 from  './Catalogue/jeans2.jpg';

import jogger from  './Catalogue/jogger1.jpg';

import basket1 from './Catalogue/chaussure1.jpg'
import babyveste from './Catalogue/babyveste4.jpg'
import babyjeans from './Catalogue/jeans4.jpg'





import pull3 from './Catalogue/pull111.jpg';
import pull4 from './Catalogue/pull112.jpg';
import pull5 from './Catalogue/pull113.jpg';
import pull6 from './Catalogue/tshirt.webp';
import pull7 from './Catalogue/pull017.jpg';
import pull8 from './Catalogue/pull019.jpg';
import pull9 from './Catalogue/pull20.jpg';
import pull10 from './Catalogue/pull114.jpg'





import gilet from  './Catalogue/gilet2.jpg';
import cardigon2 from  './Catalogue/cardigon2.jpg';
import cardigon3 from  './Catalogue/cardigan3.jpg';
import ballerine from './Catalogue/ballerine.jpg';
import basket2 from './Catalogue/chaussure2.jpg';
import tshirt from './Catalogue/tshirt3.jpg';







import pullOverF1 from './Populaire/pulloverf1.png';
import pullOverF2 from './Populaire/pulloverf2.png';
import pullOverH1 from './Populaire/pulloverh1.jpg';
import pullOverH2 from './Populaire/pulloverh2.png';


export const assets = {
    logo,
   
    surchemise1,
    surchemise2,
    surchemise3,
    gilet,
    cardigon2,
    cardigon3,
    babyjeans,
    babyveste,
    ballerine,
    basket2,


    
    pontalon1,
    pontalon2,
    pantalon3,
    pantalon4,
    jogger,

    basket1,
    
    
    pullOverF1,
    pullOverF2,
    pullOverH1,
    pullOverH2,
    pull3,
    pull4,
    pull5,
    pull6,
    pull7,
    pull8,
    pull9,
    pull10,
    veste5,
    tshirt
    

};

export const products = [
    {
        id: 1,
        img: [pullOverF1],
        description:"Ce pull gris pour femme est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        sizes: ["S","M","L"],
        title: "PULL OVER",
        category: "Femme",
        type:"vetements",
        price: 59.90 
    },
    {
        id: 2,
        img: [pullOverH1],
        description:"Ce pull pour homme est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        title: "PULL OVER",
        category: "Homme",
        sizes: ["S","M","L"],
        type:"vetements",
        price: 69.90 
    },
    {
        id: 3,
        img: [pullOverF2] ,
        description:"Ce pull blanc est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        title: "PULL OVER",
        category: "Femme",
        sizes: ["S","M","L"],
        type:"vetements",
        price: 59.90
    },
    {
        id: 4,
        img: [pullOverH2],
        description:"Ce pull est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        title: "PULL OVER",
        category: "Homme",
        sizes: ["S","M","L"],
        type:"vetements",
        price: 69.90 
    },
    {
        id: 5,
        title: "SUR CHEMISE",
        description:"Adoptez un look tendance avec cette surchemise femme, parfaite pour ajouter une touche de style à vos tenues décontractées. ",
        img: [surchemise2],
        category: "Femme",
        sizes: ["S","M","L"],
        type:"outwear",
        price: 90

    },
    {
        id: 6,
        title: "BASKET",
        img: [basket1],
        description:"Optez pour un look casual et tendance avec ces baskets femme, idéales pour vos journées actives. Confortables et stylées",
        category:"Femme",
        sizes: [36,37,38,39],
        type: "chaussures",
        price: 109.90

    },
    {
        id: 7,
        title: "PANTALON LARGE",
        img: [pontalon2],
        description:"Ce pantalon large beige est une pièce incontournable pour celles qui recherchent à la fois confort et élégance",
        category:"Femme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 60

    },
    {
        id: 8,
        title: "BASKET",
        img: [basket2],
        description:"Ces chaussures femme sont l'incarnation du confort et du style. Conçues avec des matériaux de qualité.",
        category:"Femme",
        sizes: [37,38,39],
        type: "chaussures",
        price: 109.90

    },
    {
        id: 9,
        title: "Pantalon",
        img: [pantalon3],
        description:"Ce JEANS est un basique intemporel qui ne se démode jamais. Fabriqué dans un denim de haute qualité",
        category:"Homme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 70

    },
   
    {
        id: 10,
        title: "PULL POLO",
        img: [pull4],
        category:"Femme",
        description:"conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 69.90

    },
    {
        id: 11,
        title: "PANTALON JEANS",
        description:"Ce JEANS est une pièce incontournable pour ceux qui recherchent à la fois confort et élégance.",
        img: [pantalon4],
        category:"Homme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 70

    },
    
    {
        id: 12,
        title: "PULL",
        description:"Ce pull est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        img: [pull5],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 69.90

    },
    {
        id: 13,
        title: "T-SHIRT",
        description:"Ce T-SHIRT est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée. 100% COUTON",
        img:[tshirt],
        category:"Homme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 65

    },
    {
        id: 14,
        title: "PULL NOIR",
        description:"Ce pull noir est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée. 100% COUTON",
        img: [pull8],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 69.90

    },
    {
        id: 15,
        title: "CARDIGON",
        description:"Ajoutez une touche de confort et de style à votre garde-robe avec ce cardigan incontournable, il offre une chaleur légère idéale pour les journées fraîches",
        img: [cardigon3],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 69.90

    },
    {
        id: 16,
        title: "VESTE",
        description:"Gardez votre bébé au chaud et confortable avec cette adorable veste spécialement conçue pour les tout-petits. Fabriquée dans des matériaux doux et respirants",
        img: [babyveste],
        category:"Enfant",
        sizes: ["S","M","L"],
        type: "outwear",
        price: 49.90

    },
    {
        id: 17,
        title: "JEANS",
        description:"Ce jeans pour enfant est conçu pour allier confort, durabilité et style. Fabriqué dans un denim de haute qualité",
        img: [babyjeans],
        category:"Enfant",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 55

    },
    {
        id: 18,
        title: "GILET",
        description:"Ce gilet est l'allié parfait pour ajouter une couche de style et de confort à votre tenue.",
        img: [gilet],
        category:"Homme",
        sizes: ["S","M","L"],
        type: "outwear",
        price: 65

    },
    {
        id: 19,
        title: "BALLERINE",
        description:"Ces ballerines allient finesse et praticité pour un style intemporel et confortable. Confectionnées dans des matériaux de qualité",
        img: [ballerine],
        category:"Enfant",
        sizes: [25,26,27,28],
        type: "chaussures",
        price: 45

    },
    {
        id: 20,
        title: "SUR CHEMISE",
        description:"Cette sur chemise pour femme est un incontournable de la garde-robe, parfaite pour un look chic et polyvalent. Conçue dans un tissu de qualité. 100% COUTON",
        img: [surchemise3],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "outwear",
        price: 89.90

    },
    
   


    

];
  
