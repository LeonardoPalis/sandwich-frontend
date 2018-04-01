import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Sanduiche from '../../model/Sanduiche';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import cartService from '../../service/CartService';
import PubSub from 'pubsub-js';

class MountedBurgerFragment{

  constructor(context, img, sandwichName, ...defaultIngredientsProteins){
    this.context = context;
    this._img = img;
    this._defaultIngredientsProteins = defaultIngredientsProteins;
    this._sandwicheName = sandwichName;
  }

  _createObjSandwitch(ingredients){
    return ingredients.reduce((element, key) => ({ ...element, [key]: 1}), {})
  }

  sendToCart(){
    let objProteins = this._createObjSandwitch(this._defaultIngredientsProteins);
    cartService.sendToCart(objProteins, this._sandwicheName, undefined, cartService.computePriceBySandwitch({proteins: objProteins, salads: {}}));
    PubSub.publish('update-number-cart-button', {quantity:cartService.sandwichesQuantity, sandwiches: cartService.sandwiches});
  }

  customizeSandwich(){
    let self = this.context;
    let objProteins = this._createObjSandwitch(this._defaultIngredientsProteins);
    let currentSandwich = new Sanduiche(objProteins, this._sandwicheName, {}, cartService.computePriceBySandwitch({proteins: objProteins, salads: {}}));
    self.state.openCustomizeSandwichModal = true;
    self.state.burgers = [];
    self.state.burgers.push(currentSandwich);
    self.setState(self.state);
  }

  get view(){
    return (
      <Card style={{height: 120, borderRadius: 10, marginTop: 10}}>
        <div className={"container"}>
          <img src={this._img} alt="Avatar" className={"image"} style={{width:"100%", height: 120, borderRadius: 10}}/>
          <div className={"middle"}>
            <Button onClick={this.customizeSandwich.bind(this)} style={{margin: 10}} variant="raised" color="primary">
              Customizar
            </Button>
            <Button onClick={this.sendToCart.bind(this)} className={"text"} variant="raised" color="secondary">
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </Card>
    )
  }

}

export default MountedBurgerFragment;
