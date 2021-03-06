module.exports = function Cart(oldCart){
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice  || 0;

  this.add = function(item, id){
    var storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = {item: item, qty: 0, price: 0};
    }
    storedItem.qty++;
    storedItem.price =  Number((storedItem.item.price * storedItem.qty).toPrecision(4));
    this.totalQty++;
    this.totalPrice = Number((this.totalPrice + storedItem.item.price).toPrecision(4));
  }
  this.generateArray = function() {
    var arr= [];
    for (var id in this.items){
      arr.push(this.items[id]);
    }
    return arr;
  };
};

