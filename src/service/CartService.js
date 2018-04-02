import Cart from '../model/Cart';
import Sanduiche from '../model/Sanduiche';

class CartService{

  constructor(){
    this.cart = new Cart();
    this.ingredientsPrice = {};
    this.ingredientsInPromotion = ["Queijo", "Hambúrguer de carne"];
  }

  setIngredientsPrices(prices){
    this.ingredientsPrice = prices;
  }

  sendToCart(proteins, sandwichName, salads, price){
    this.cart.sandwiches = new Sanduiche(proteins, sandwichName, salads, price);
  }

  removeFromCart(pos){
    this.cart.removeSandwich(pos);
  }

  get totalPrice(){
    let totalPrice = 0.0;
    this.cart.sandwiches.forEach((sandwich)=>{
      totalPrice += sandwich.price;
    })
    totalPrice = totalPrice.toFixed(2)
    return totalPrice;
  }

  get sandwichesQuantity(){
    return this.cart.sandwiches.length;
  }

  get sandwiches(){
    return this.cart.sandwiches;
  }

  computePriceBySandwitch(sandwitch){
    let price = 0.0;
    Object.keys(sandwitch.proteins).map((iterator)=>{
      let currentPrice = this.getPriceWithPromotion(sandwitch.proteins[iterator], iterator) * this.ingredientsPrice[iterator];
      price += currentPrice - (currentPrice * this.getLightPromotion(sandwitch));
    })
    price = parseFloat(price.toFixed(2));
    Object.keys(sandwitch.salads).map((iterator)=>{
      let currentPrice = this.getPriceWithPromotion(sandwitch.salads[iterator], iterator) * this.ingredientsPrice[iterator]
      price += currentPrice - (currentPrice * this.getLightPromotion(sandwitch));
    })
    price = parseFloat(price.toFixed(2));
    return price;
  }

  getPriceWithPromotion(numberOfIngredients, ingredient){
    if(this.ingredientsInPromotion.includes(ingredient) && numberOfIngredients % 3 == 0){
      let promotionalNumberOfIngredients = (numberOfIngredients / 3) * 2;
      if(numberOfIngredients > 0)
        PubSub.publish('show-promotional-snack', `Já que você adicionou ${numberOfIngredients} unidades ao ingrediente ${ingredient}, você pagará por apenas ${promotionalNumberOfIngredients}! `);
      return promotionalNumberOfIngredients;
    }else{
      return numberOfIngredients;
    }
  }

  getLightPromotion(sandwitch){
    let promotion = 0;
    if(!sandwitch.proteins["Bacon"] || sandwitch.proteins["Bacon"] == 0){
      promotion += 0.5;
    }
    if(sandwitch.salads["Alface"] && sandwitch.salads["Alface"] > 0){
      promotion += 0.5;
    }
    if(promotion == 1){
      PubSub.publish('show-promotional-snack', "Oba! Você foi contemplato com a promoção Light!");
      return 0.1;
    }else{
      return 0;
    }
  }

}

export default new CartService();
