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
      extraName: "Cardamomo"
  }),
  new Extra({
    extraName: "Cannella"
  }) 
];

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
