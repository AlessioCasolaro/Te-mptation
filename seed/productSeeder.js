const Product = require('../models/products');
const env = require('dotenv').config()
const mongoose = require('mongoose')
//Connessione al DB
mongoose
		.connect(
			process.env.URI,
			{
				
				useNewUrlParser: true,
				useUnifiedTopology: true,
				retryWrites: false	
			},
		)
		.then(() => console.log('Connection to CosmosDB successful SHOPPING'))
		.catch((err) => console.error('ERRORE: ' + err));
//////////////////////////////////////////////////////////////////////

const products = [
  new Product({
      imagePath: "/images/products/Dosha_Vata.jpg",
      title: "Dosha Vata",
      description: "Questa miscela rinfrescante e rivitalizzante è perfetta per alleviare lo stress; lieve profumo di cannella, note spiccate di liquirizia. Naturalmente dolce e bilanciata, con un ampio ventaglio di aromi.",
      price: 5.30
  }),
  new Product({
      imagePath: "/images/products/Curcuma_Coccole.jpg",
      title: "Curcuma e Coccole",
      description: "Tisana Ayurvedica a base di radice di curcuma e zenzero in pezzi, per un'esperienza gustativa indimenticabile. L'aroma piccante e speziato dello zenzero viene esaltato dalla dolcezza dei semi di anice e dalla piacevole amarezza del cacao. Un infuso per sentirsi coccolati, respirare profondamente e rilassarsi.",
      price: 5.35
  }),
  new Product({
      imagePath: "/images/products/Rilassante_piacere.jpg",
      title: "Rilassante piacere",
      description: "Tisana Ayurvedica rilassante grazie alla presenza di melissa e camomilla che bene si accompagnano ai fiori di ibisco, al finocchio e al cardamomo dalle proprietà digestive.",
      price: 7.10
  }),
  new Product({
      imagePath: "/images/products/Dosha_Pitta.jpg",
      title: "Dosha Pitta",
      description: "Miscela lenitiva e molto equilibrata. L'aroma dolce e morbido con lievi note floreali invita a piacevoli momenti rilassanti.",
      price: 5.60
  }),
  new Product({
      imagePath: "/images/products/Abbraccio_Vellutato.jpg",
      title: "Abbraccio vellutato",
      description: "Miscela Ayurvedica con mela, finocchio, cumino, melissa, cacao, camomilla, bacche di aronia, fiordaliso, erba Tulsi e echinacea.",
      price: 6.40
  }),
  new Product({
      imagePath: "/images/products/Pace_Interiore.jpg",
      title: "Pace interiore",
      description: "Miscela Ayurvedica con menta, cannella, ibisco, liquirizia, zenzero, finocchino, scorza d'arancia, chiodi di garofano, camomilla, pepe rosa, cardamomo. Aroma e profumo intenso, spiccate note di ibisco. Rinfrescante e rilassante.",
      price: 6.10
  }),
  new Product({
      imagePath: "/images/products/Energia_Vitale.jpg",
      title: 'Energia vitale',
      description: "Miscela Ayurvedica rivitalizzante con liquirizia, zenzero, coriandolo, anice, cannella, profumata con fiori di fiordaliso. Spiccato e persistente sapore di zenzero con retrogusto di liquirizia e cannella.",
      price: 7.30
  }),
  new Product({
      imagePath: "/images/products/Tonico_Detox.jpg",
      title: "Tonico Detox",
      description: "Accattivante miscela dallo spiccato profumo di ginepro e arancia. L'aroma è morbido e rotondo con note di finocchio e cannella.",
      price: 5.40
  }),
  new Product({
      imagePath: "/images/products/Piacere_piccante.jpg",
      title: "Piacere piccante",
      description: "Tisana Ayurvedica vitalizzante, speziata e lievemente piccante con note di zenzero.",
      price: 5.60
  }),
  new Product({
      imagePath: "/images/products/Chai_piccante.jpg",
      title: "Chai piccante",
      description: "Chai privo di caffeina con zenzero, cannella, cardamomo, chiodi garofano, anice stellato e peperoncini.",
      price: 5.80
  }),
  new Product({
      imagePath: "/images/products/Chai_cacao_speziato.jpg",
      title: "Chai cacao speziato",
      description: "Originale Chai composto da granella di cacao, arancia, cannella, zenzero, liquirizia, chiodi di garofano, finocchio, cardamomo e pepe rosa.",
      price: 4.90
  }),
  new Product({
      imagePath: "/images/products/Chai_te_nero.jpg",
      title: "Chai tè nero",
      description: "Classico Chai con tè nero indiano, cannella, zenzero, finocchio, anice, chiodi garofano e cardamomo.",
      price: 6.25
  }),
  new Product({
      imagePath: "/images/products/Mirtillo_rosso.jpg",
      title: "Mirtillo rosso",
      description: "Perfetto melange di frutta composto da mela, fiori di ibisco, rosa canina, uva, bacche di sambuco e mirtilli rossi.",
      price: 5.00
  }),
  new Product({
      imagePath: "/images/products/Vitaminica.jpg",
      title: "Vitaminica",
      description: "Esotica miscela composta da mela, ibisco, uva, scorza di arancia, mango, fiordaliso, tè verde Jasmine e physalis, una bacca ricca di vitamina C e dall'azione diuretica. Sapore arancia, physalis, mango.",
      price: 5.75
  }),
  new Product({
      imagePath: "/images/products/Sere_inverno.jpg",
      title: "Sere d'inverno",
      description: "Digestivo, diuretico e ricco di vitamina C grazie ai fiori di ibisco. Sapore di cannella con note di arancia e vaniglia per riscaldare le sere invernali.",
      price: 5.80
  }),
  new Product({
      imagePath: "/images/products/cioccolato_fragole.jpg",
      title: "Cioccolato e fragole",
      description: "Croccanti fiocchi di cioccolato e succosi pezzi di fragola dominano questa intrigante miscela perfetta in qualsiasi momento della giornata.",
      price: 4.90
  }),
  new Product({
      imagePath: "/images/products/Lampone_Lime.jpg",
      title: "Lampone e lime",
      description: "Melange con mela cotogna, cocco, citronella, ibisco, scorza di limone, bacche di goji dalle note proprietà antiossidanti, immunostimolanti ed energizzanti, lamponi e fiordaliso.",
      price: 7.10
  }),
  new Product({
      imagePath: "/images/products/Esplosione_Frutta.jpg",
      title: "Esplosione di frutta",
      description: "Digestivo, diuretico e ricco di vitamina C grazie ai fiori di ibisco o karkadé. Intenso sapore fruttato di pompelmo, fragola, arancia.",
      price: 6.10
  }),
  new Product({
      imagePath: "/images/products/Tisana_benessere_relax.jpg",
      title: "Tisana benessere e relax",
      description: "All'effetto digestivo di finocchio, anice, bacche di aronia, si unisce quello rilassante della melissa e del luppolo accompagnati da ortica, sempiterno, fiordaliso, rosa e verbena.",
      price: 7.70
  }),
  new Product({
      imagePath: "/images/products/Tisana_Zenzero_Citronella.jpg",
      title: "Tisana zenzero e citronella",
      description: "Citronella, zenzero, liquirizia, scorza di arancia, menta piperita, pepe nero e ibisco per una miscela di erbe piacevole e tonificante.",
      price: 4.80
  }),
  new Product({
      imagePath: "/images/products/Tisana_rilassante.jpg",
      title: "Tisana rilassante",
      description: "Miscela dalle proprietà rilassanti, profumata e digestiva, ottima anche a fine giornata.",
      price: 4.50
  }),
  new Product({
      imagePath: "/images/products/Piacevole_benessere.jpg",
      title: "Piacevole benessere",
      description: "Ingrediente importante di questa tisana è l'ortica, un'efficace pianta medicinale dalle molte proprietà benefiche: diuretica, ricca di potassio, ferro e oligoelementi.",
      price: 6.10
  }),
  new Product({
      imagePath: "/images/products/Diuretica_No_Cist.jpg",
      title: "Diuretica No Cist",
      description: "Infuso di erbe con equiseto, foglie di betulla e ortica. Miscela dall'aroma dolce e bilanciato, perfetto coadiuvante nella cura e prevenzione di disturbi del tratto urinario, grazie alle proprietà diuretiche e antibatteriche delle erbe che la compongono.",
      price: 6.20
  }),
  new Product({
      imagePath: "/images/products/Detox_Anti_Age.jpg",
      title: "Detox Anti-Age",
      description: "Miscela di erbe depurativa e diuretica con foglie di mora, ortica e moringa. Azione antiossidante e anti-age grazie alle foglie di moringa e le bacche di goji",
      price: 4.50
  })
  ];

var done = 0;
for(var i = 0; i <products.length; i++){
  products[i].save ((err, result)=>{
    done++;
    if (done === products.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
