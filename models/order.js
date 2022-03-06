
const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  cart: {type: Object, required: true},
  date: {type: String, required: true},
  tableNumber: {type: String, required: true},
  name: {type: String, required: true},
  extra: {type: String, required: true}
});

module.exports= mongoose.model('Order', schema);
