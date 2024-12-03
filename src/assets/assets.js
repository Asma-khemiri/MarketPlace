import logo from './logo.png';


/*import surchemise1 from './Catalogue/veste1.jpg';
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








import pullOverF2 from './Populaire/pulloverf2.png';
import pullOverH1 from './Populaire/pulloverh1.jpg';
import pullOverH2 from './Populaire/pulloverh2.png';*/


export const assets = {
    logo,
   
    //surchemise1,
    surchemise2:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982823/veste2_qjm3wx.jpg",
    surchemise3:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982823/veste4_ywqc5v.jpg",
    gilet:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982815/babygilet1_lvbqoh.jpg",
    //cardigon2,
    cardigon3:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982817/cardigan3_crkmoo.jpg",

    babyjeans:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982815/babyjean_xibxtw.webp",

    babyveste:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982815/babyveste2_ekwxdu.jpg",

    ballerine:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982816/ballerine_xa9ter.jpg",

    basket2:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982817/chaussure1_afqoou.jpg",


    
    //pontalon1,
    pontalon2:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982819/pants2_gwp3om.jpg",
    pantalon3:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982818/jeans2_n8ipqi.jpg",
    pantalon4:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982818/jeans_kbcl2r.jpg",
    
    veste3:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982818/doudoune_eqxz2k.jpg",

    basket1:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982817/chaussure2_xq5let.jpg",
    
    
    pullOverF1:"https://res.cloudinary.com/duanu4gxj/image/upload/v1733093972/pulloverf1_j4uth5.png",
    pullOverF2:"https://res.cloudinary.com/duanu4gxj/image/upload/v1733093971/pullover5_cdjrvi.jpg",
    pullOverH1:"https://res.cloudinary.com/duanu4gxj/image/upload/v1733093973/pulloverh2_vsjav8.png",
    pullOverH2:"https://res.cloudinary.com/duanu4gxj/image/upload/v1733093972/pulloverh1_sxqxks.jpg",
    //pull3,
    pull4:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982820/pull112_lgouxh.jpg",
    pull5:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982819/pull017_yhy6ud.jpg",
    //pull6,
    //pull7,
    pull8:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982820/pull019_jnukk1.jpg",
    //pull9,
    //pull10,
    //veste5,
    tshirt:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982822/tshirt3_sm0wke.jpg"
    

};


export const products = [
    {
        img: [assets.pullOverF1],
        description:"Ce pull gris pour femme est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        sizes: ["S","M","L"],
        title: "PULL OVER",
        category: "Femme",
        type:"vetements",
        price: 49.90 
    },
    {
        //id: 2,
        img: [assets.pullOverH1],
        description:"Ce pull pour homme est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        title: "PULL OVER",
        category: "Homme",
        sizes: ["S","M","L"],
        type:"vetements",
        price: 59.90 
    },
    {
        //id: 3,
        img: [assets.pullOverF2] ,
        description:"Ce pull blanc est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        title: "PULL OVER",
        category: "Femme",
        sizes: ["S","M","L"],
        type:"vetements",
        price: 49.90
    },
    {
        //id: 4,
        img: [assets.pullOverH2],
        description:"Ce pull est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        title: "PULL OVER",
        category: "Homme",
        sizes: ["S","M","L"],
        type:"vetements",
        price: 59.90 
    },
    {
       //id: 5,
        title: "SUR CHEMISE",
        description:"Adoptez un look tendance avec cette surchemise femme, parfaite pour ajouter une touche de style à vos tenues décontractées. ",
        img: [assets.surchemise2],
        category: "Femme",
        sizes: ["S","M","L"],
        type:"outwear",
        price: 90

    },
    {
       //id: 6,
        title: "BASKET",
        img: [assets.basket1],
        description:"Optez pour un look casual et tendance avec ces baskets femme, idéales pour vos journées actives. Confortables et stylées",
        category:"Femme",
        sizes: [36,37,38,39],
        type: "chaussures",
        price: 109.90

    },
    {
       //id: 7,
        title: "PANTALON LARGE",
        img: [assets.pontalon2],
        description:"Ce pantalon large beige est une pièce incontournable pour celles qui recherchent à la fois confort et élégance",
        category:"Femme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 60

    },
    {
       //id: 8,
        title: "BASKET",
        img: [assets.basket2],
        description:"Ces chaussures femme sont l'incarnation du confort et du style. Conçues avec des matériaux de qualité.",
        category:"Femme",
        sizes: [37,38,39],
        type: "chaussures",
        price: 109.90

    },
    {
       //id: 9,
        title: "Pantalon",
        img: [assets.pantalon3],
        description:"Ce JEANS est un basique intemporel qui ne se démode jamais. Fabriqué dans un denim de haute qualité",
        category:"Homme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 70

    },
   
    {
       //id: 10,
        title: "PULL POLO",
        img: [assets.pull4],
        category:"Femme",
        description:"conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 69.90

    },
    {
       //id: 11,
        title: "PANTALON JEANS",
        description:"Ce JEANS est une pièce incontournable pour ceux qui recherchent à la fois confort et élégance.",
        img: [assets.pantalon4],
        category:"Homme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 70

    },
    
    {
       //id: 12,
        title: "PULL",
        description:"Ce pull est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        img: [assets.pull5],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 69.90

    },
    {
       //id: 13,
        title: "T-SHIRT",
        description:"Ce T-SHIRT est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée. 100% COUTON",
        img:[assets.tshirt],
        category:"Homme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 65

    },
    {
       //id: 14,
        title: "PULL NOIR",
        description:"Ce pull noir est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée. 100% COUTON",
        img: [assets.pull8],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 69.90

    },
    {
       //id: 15,
        title: "CARDIGON",
        description:"Ajoutez une touche de confort et de style à votre garde-robe avec ce cardigan incontournable, il offre une chaleur légère idéale pour les journées fraîches",
        img: [assets.cardigon3],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 69.90

    },
    {
       //id: 16,
        title: "VESTE",
        description:"Gardez votre bébé au chaud et confortable avec cette adorable veste spécialement conçue pour les tout-petits. Fabriquée dans des matériaux doux et respirants",
        img: [assets.babyveste],
        category:"Enfant",
        sizes: ["S","M","L"],
        type: "outwear",
        price: 49.90

    },
    {
       //id: 17,
        title: "JEANS",
        description:"Ce jeans pour enfant est conçu pour allier confort, durabilité et style. Fabriqué dans un denim de haute qualité",
        img: [assets.babyjeans],
        category:"Enfant",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 55

    },
    {
       //id: 18,
        title: "GILET",
        description:"Ce gilet est l'allié parfait pour ajouter une couche de style et de confort à votre tenue.",
        img: [assets.gilet],
        category:"Homme",
        sizes: ["S","M","L"],
        type: "outwear",
        price: 65

    },
    {
       //id: 19,
        title: "BALLERINE",
        description:"Ces ballerines allient finesse et praticité pour un style intemporel et confortable. Confectionnées dans des matériaux de qualité",
        img: [assets.ballerine],
        category:"Enfant",
        sizes: [25,26,27,28],
        type: "chaussures",
        price: 45

    },
    {
       //id: 20,
        title: "SUR CHEMISE",
        description:"Cette sur chemise pour femme est un incontournable de la garde-robe, parfaite pour un look chic et polyvalent. Conçue dans un tissu de qualité. 100% COUTON",
        img: [assets.veste3],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "outwear",
        price: 89.90

    },
    
];
  
