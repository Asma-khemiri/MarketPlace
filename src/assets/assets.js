import logo from './logo.png';


export const assets = {
    logo,
   
   
    surchemise2:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982823/veste2_qjm3wx.jpg",
    surchemise3:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982823/veste4_ywqc5v.jpg",
    gilet:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982815/babygilet1_lvbqoh.jpg",
   
    cardigon3:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982817/cardigan3_crkmoo.jpg",

    babyjeans:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982819/jeans4_evnhw0.jpg",

    babyveste:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982815/babyveste2_ekwxdu.jpg",

    ballerine:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982816/ballerine_xa9ter.jpg",

    basket2:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982817/chaussure1_afqoou.jpg",


    
 
    pontalon2:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982819/pants2_gwp3om.jpg",
    pantalon3:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982818/jeans2_n8ipqi.jpg",
    pantalon4:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982818/jeans_kbcl2r.jpg",
    
    veste3:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982818/doudoune_eqxz2k.jpg",

    basket1:"https://res.cloudinary.com/duanu4gxj/image/upload/v1732982817/chaussure2_xq5let.jpg",
    
    
    pullOverF1:"https://res.cloudinary.com/duanu4gxj/image/upload/v1733093972/pulloverf1_j4uth5.png",
    pullOverF2:"https://res.cloudinary.com/duanu4gxj/image/upload/v1733093971/pullover5_cdjrvi.jpg",
    pullOverH1:"https://res.cloudinary.com/duanu4gxj/image/upload/v1733093973/pulloverh2_vsjav8.png",
    pullOverH2:"https://res.cloudinary.com/duanu4gxj/image/upload/v1733093972/pulloverh1_sxqxks.jpg",

    

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
       
        img: [assets.pullOverH1],
        description:"Ce pull pour homme est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        title: "PULL OVER",
        category: "Homme",
        sizes: ["S","M","L"],
        type:"vetements",
        price: 59.90 
    },
    {
        img: [assets.pullOverF2] ,
        description:"Ce pull blanc est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        title: "PULL OVER",
        category: "Femme",
        sizes: ["S","M","L"],
        type:"vetements",
        price: 49.90
    },
    {
      
        img: [assets.pullOverH2],
        description:"Ce pull est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        title: "PULL OVER",
        category: "Homme",
        sizes: ["S","M","L"],
        type:"vetements",
        price: 59.90 
    },
    {
     
        title: "SUR CHEMISE",
        description:"Adoptez un look tendance avec cette surchemise femme, parfaite pour ajouter une touche de style à vos tenues décontractées. ",
        img: [assets.surchemise2],
        category: "Femme",
        sizes: ["S","M","L"],
        type:"outwear",
        price: 90

    },
    {
      
        title: "BASKET",
        img: [assets.basket1],
        description:"Optez pour un look casual et tendance avec ces baskets femme, idéales pour vos journées actives. Confortables et stylées",
        category:"Femme",
        sizes: [36,37,38,39],
        type: "chaussures",
        price: 109.90

    },
    {
        title: "PANTALON LARGE",
        img: [assets.pontalon2],
        description:"Ce pantalon large beige est une pièce incontournable pour celles qui recherchent à la fois confort et élégance",
        category:"Femme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 60

    },
    {
      
        title: "BASKET",
        img: [assets.basket2],
        description:"Ces chaussures femme sont l'incarnation du confort et du style. Conçues avec des matériaux de qualité.",
        category:"Femme",
        sizes: [37,38,39],
        type: "chaussures",
        price: 109.90

    },
    {
      
        title: "Pantalon",
        img: [assets.pantalon3],
        description:"Ce JEANS est un basique intemporel qui ne se démode jamais. Fabriqué dans un denim de haute qualité",
        category:"Homme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 70

    },
   
    {
       
        title: "PULL POLO",
        img: [assets.pull4],
        category:"Femme",
        description:"conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 69.90

    },
    {
     
        title: "PANTALON JEANS",
        description:"Ce JEANS est une pièce incontournable pour ceux qui recherchent à la fois confort et élégance.",
        img: [assets.pantalon4],
        category:"Homme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 70

    },
    
    {
       
        title: "PULL",
        description:"Ce pull est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée.",
        img: [assets.pull5],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 69.90

    },
    {

        title: "T-SHIRT",
        description:"Ce T-SHIRT est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée. 100% COUTON",
        img:[assets.tshirt],
        category:"Homme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 65

    },
    {
       
        title: "PULL NOIR",
        description:"Ce pull noir est l'incarnation du confort et du style. Conçu avec des matériaux doux et de haute qualité, il offre une sensation agréable sur la peau tout au long de la journée. 100% COUTON",
        img: [assets.pull8],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 69.90

    },
    {
 
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
       
        title: "JEANS",
        description:"Ce jeans pour enfant est conçu pour allier confort, durabilité et style. Fabriqué dans un denim de haute qualité",
        img: [assets.babyjeans],
        category:"Enfant",
        sizes: ["S","M","L"],
        type: "vetements",
        price: 55

    },
    {
        title: "GILET",
        description:"Ce gilet est l'allié parfait pour ajouter une couche de style et de confort à votre tenue.",
        img: [assets.gilet],
        category:"Homme",
        sizes: ["S","M","L"],
        type: "outwear",
        price: 65

    },
    {
        title: "BALLERINE",
        description:"Ces ballerines allient finesse et praticité pour un style intemporel et confortable. Confectionnées dans des matériaux de qualité",
        img: [assets.ballerine],
        category:"Enfant",
        sizes: [25,26,27,28],
        type: "chaussures",
        price: 45

    },
    {
   
        title: "SUR CHEMISE",
        description:"Cette sur chemise pour femme est un incontournable de la garde-robe, parfaite pour un look chic et polyvalent. Conçue dans un tissu de qualité. 100% COUTON",
        img: [assets.veste3],
        category:"Femme",
        sizes: ["S","M","L"],
        type: "outwear",
        price: 89.90

    },
    
];
  
