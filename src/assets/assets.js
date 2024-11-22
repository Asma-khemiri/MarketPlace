import logo from './logo.png';


import surchemise2 from './Catalogue/veste1.jpg';
import surchemise3 from './Catalogue/veste2.jpg';
import surchemise4 from './Catalogue/veste4.jpg';
import veste5 from './Catalogue/veste5.jpg';





import pontalon1 from './Catalogue/pants1.jpg';
import pontalon2 from './Catalogue/pants2.jpg';
import pantalon3 from  './Catalogue/pontalon3.png';
import pantalon4 from  './Catalogue/pantalon4.png';
import pants5 from  './Catalogue/pants5.png';
import jogger from  './Catalogue/jogger1.jpg';




import pull3 from './Catalogue/pull111.jpg';
import pull4 from './Catalogue/pull112.jpg';
import pull5 from './Catalogue/pull113.jpg';
import pull6 from './Catalogue/pull114.jpg';
import pull7 from './Catalogue/pull017.jpg';
import pull8 from './Catalogue/pull019.jpg';
import pull9 from './Catalogue/pull20.jpg';
import pull10 from './Catalogue/pull21.jpg';
import pull11 from './Catalogue/pull115.jpg';
import pullr from './Catalogue/pullover5.jpg';
import pull12 from  './Catalogue/pull116.jpg';
import sweatshirt from './Catalogue/sweatshirt.png';

import gilet from  './Catalogue/pull12.png';
import cardigon2 from  './Catalogue/cardigon2.jpg';
import cardigon3 from  './Catalogue/cardigan3.jpg';





import pullOverF1 from './Populaire/pull_overF1.png';
import pullOverF2 from './Populaire/pull_overF2.png';
import pullOverH1 from './Populaire/pull_overH1.png';
import pullOverH2 from './Populaire/pull_overH2.png';


export const assets = {
    logo,
   
    surchemise2,
    surchemise3,
    surchemise4,
    gilet,
    cardigon2,
    cardigon3,

    
    pontalon1,
    pontalon2,
    pantalon3,
    pantalon4,
    pants5,
    jogger,
    
    
    pullOverF1,
    pullOverF2,
    pullOverH1,
    pullOverH2,
    pullr,
    pull3,
    pull4,
    pull5,
    pull6,
    pull7,
    pull8,
    pull9,
    pull10,
    pull11,
    pull12,
    sweatshirt,
    veste5
    

};

export const products = [
    {
        id: 1,
        img: [pullOverF1],
        //description
        //sizes: ["S","M","L"]
        title: "PULL OVER",
        category: "Femme",
        sizes: ["S","M","L"],
        type:"pull",
        price: 69.90 
    },
    {
        id: 2,
        img: [pullOverH1],
        title: "PULL OVER",
        category: "Homme",
        sizes: ["S","M","L"],
        type:"pull",
        price: 59.90 
    },
    {
        id: 3,
        img: [pullOverF2] ,
        title: "PULL OVER",
        category: "Femme",
        sizes: ["S","M","L"],
        type:"pull",
        price: 69.90
    },
    {
        id: 4,
        img: [pullOverH2],
        title: "PULL OVER",
        category: "Homme",
        sizes: ["S","M","L"],
        type:"pull",
        price: 59.90 
    },
    {
        id: 5,
        title: "SUR CHEMISE",
        img: [surchemise2],
        category: "Femme",
        sizes: ["S","M","L"],
        type:"veste",
        price: 80

    },
    {
        id: 6,
        title: "PANTALON",
        img: [pontalon1],
        category:"Femme",
        type: "pantalon",
        price: 60

    },
    {
        id: 7,
        title: "PANTALON LARGE",
        img: [pontalon2],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "pantalon",
        price: 60

    },
    {
        id: 8,
        title: "PULLOVER",
        img: [pullr],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "pull",
        price: 59.90

    },
    {
        id: 9,
        title: "Pantalon",
        img: [pantalon4],
        category:"Femme",
        type: "pantalon",
        price: 60

    },
    {
        id: 10,
        title: "Pull",
        img: [pull3],
        category:"Femme",
        type: "pull",
        price: 60

    },
    {
        id: 11,
        title: "Pull POLO",
        img: [pull4],
        category:"Femme",
        //description:"Col à rever, Patte boutonnée partielle , Manches longues et coupe décontractée",
        sizes: ["S","M","L"],
        type: "pull",
        price: 69.90

    },
    
    {
        id: 12,
        title: "PULL GRIS",
        img: [pull5],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "pull",
        price: 69.90

    },
    {
        id: 13,
        title: "PULL COL MONTON",
        img:[ pull6],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "pull",
        price: 60

    },
    {
        id: 14,
        title: "PULL NOIR",
        img: [pull8],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "pull",
        price: 69.90

    },
    {
        id: 15,
        title: "PULL",
        img: [pull9],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "pull",
        price: 39.900

    },
    {
        id: 16,
        title: "pull",
        img: [pull10],
        category:"Homme",
        sizes: ["S","M","L"],
        type: "pull",
        price: 60

    }
    /*{
        id: 17,
        title: "pull",
        img: [pull11],
        category:"Homme",
        type: "pull",
        price: 60

    },
    /*{
        id: 18,
        title: "Gilet",
        img: gilet,
        category:"Homme",
        type: "veste",
        price: 60

    },
    /*{
        id: 19,
        title: "Jogger",
        img: jogger,
        category:"Homme",
        type: "pantalon",
        price: 60

    },
    {
        id: 20,
        title: "veste",
        img: surchemise3,
        category:"Femme",
        type: "veste",
        price: 60

    },
    {
        id: 21,
        title: "Cardigon",
        img: cardigon2,
        category:"Homme",
        type: "veste",
        price: 60

    },
    {
        id: 22,
        title: "pull",
        img: sweatshirt,
        category:"Homme",
        type: "pull",
        price: 60

    },
    {
        id: 23,
        title: "pull",
        img:veste5,
        category:"Hommme",
        type: "pull",
        price: 60

    },*/


    

];
  
