const Extra = require('../models/extra');
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
		.then(() => console.log('Connection to CosmosDB successful EXTRAS'))
		.catch((err) => console.error('ERRORE: ' + err));
//////////////////////////////////////////////////////////////////////

const extras = [
  new Extra({
    extraName: "Zenzero"
}),
new Extra({
  extraName: "Curcuma radice"
}),
new Extra({
  extraName: "Chiodi di garofano"
}),
new Extra({
  extraName: "Noce moscata"
}),
new Extra({
  extraName: "Mela"
}),
new Extra({
  extraName: "Cannella bastoncini"
}),
new Extra({
  extraName: "Ibisco"
}),
new Extra({
  extraName: "Foglie di mora"
}),
new Extra({
  extraName: "Melissa"
}),
new Extra({
  extraName: "Liquirizia"
}), 
new Extra({
  extraName: "Arancia scorza"
}),
new Extra({
  extraName: "Finocchio"
}),
new Extra({
  extraName: "Camomilla"
}),
new Extra({
  extraName: "Pepe nero"
}),
new Extra({
  extraName: "Iperico"
}),
new Extra({
  extraName: "Fiori di luppolo"
}),
new Extra({
  extraName: "Menta verde"
}),
new Extra({
  extraName: "Pepe rosa"
}), 
new Extra({
  extraName: "Anice"
}),
new Extra({
  extraName: "Fiordaliso"
}),
new Extra({
  extraName: "Coriandolo macinato"
}),
new Extra({
  extraName: "Curcuma radice a pezzi"
}), 
new Extra({
  extraName: "Zenzero pezzi"
}),
new Extra({
  extraName: "Cacao"
}),
new Extra({
  extraName: "Cannella pezzi"
}),
new Extra({
  extraName: "Mela in pezzi"
}),
new Extra({
  extraName: "Rosa canina scorza"
}),
new Extra({
  extraName: "Rooibos"
}),
new Extra({
  extraName: "Mandorla in giocchi"
}),
new Extra({
  extraName: "Mandorla in pezzi"
}),
new Extra({
  extraName: "vaniglia bourbon pezzi"
}),
new Extra({
  extraName: "Cardamomo verde"
}),
new Extra({
  extraName: "Angelica radice"
}),
new Extra({
  extraName: "Tarassaco radice"
}),
new Extra({
  extraName: "Pepe"
}),
new Extra({
  extraName: "Bacche di ginepro"
}),
new Extra({
  extraName: "Verbena"
}),
new Extra({
  extraName: "Melissa"
}),
new Extra({
  extraName: "Aroma di arancia"
}),
new Extra({
  extraName: "Erba tulsi"
}),
new Extra({
  extraName: "Calendula"
}),
new Extra({
  extraName: "Olio di mandorla"
}),
new Extra({
  extraName: "Olio di mandarino"
}),
new Extra({
  extraName: "Luppolo fiori"
}),
new Extra({
  extraName: "Alchemilla"
}),
new Extra({
  extraName: "Valeriana"
}),
new Extra({
  extraName: "Santoreggia"
}),
new Extra({
  extraName: "Ortica foglie"
}),
new Extra({
  extraName: "Menta piperita"
}),
new Extra({
  extraName: "Citronella"
}),
new Extra({
  extraName: "Rosa e malva fiori"
}),
new Extra({
  extraName: "Fragola in pezzi"
}),
new Extra({
  extraName: "Aroma naturale di pompelmo"
}),
new Extra({
  extraName: "Coriandolo"
}

)];

var done = 0;
for(var i = 0; i <extras.length; i++){
  extras[i].save ((err, result)=>{
    done++;
    if (done === extras.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
