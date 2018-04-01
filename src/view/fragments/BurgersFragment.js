import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import burgerImg from '../../assets/images/burger.png';
import Sanduiche from '../../model/Sanduiche';
import cartService from '../../service/CartService';
import PubSub from 'pubsub-js';

class BurgersFragment{

  constructor(context){
    this.context = context;
    this.sendedToCart = [];
  }

  exportNewSanduiche(){

    let self = this.context
    self.state.burgers.push(new Sanduiche());
    self.state.currentSanduiche++;
    self.setState(self.state);
  }

  selectCurrentSanduiche(pos){

    let self = this.context
    self.state.currentSanduiche = pos;
    self.setState(self.state);
  }

  sendToCart(){
    let self = this.context;
    this.sendedToCart.push(self.state.currentSanduiche);
    cartService.sendToCart(self.state.burgers[self.state.currentSanduiche].proteins, this._sandwicheName, self.state.burgers[self.state.currentSanduiche].salads, self.state.burgers[self.state.currentSanduiche].price);
    self.state.burgers = self.state.burgers.filter((sandwich, iterator)=>{
      return self.state.currentSanduiche != iterator;
    })
    self.state.currentSanduiche = -1;
    self.setState(this.state);
    PubSub.publish('update-number-cart-button', {quantity:cartService.sandwichesQuantity, sandwiches: cartService.sandwiches});
  }


  get view(){
    return (
      <div>
        <div style={{textAlign: "left", whiteSpace: "nowrap", overflowX: "scroll", width: "100%"}}>
          {
            this.context.state.burgers.map((element, index)=>{ return(
                <Button color="secondary" onClick={this.selectCurrentSanduiche.bind(this, index)} style={{"border": "1px #d2d2d2 solid","width": "70px", "height": "70px", borderRadius: 4, background: "#f50057", marginRight: 10, marginBottom: 10}} >
                  <img src={burgerImg} />
                </Button>
            )})
          }
          <Button onClick={this.exportNewSanduiche.bind(this)} style={{"border": "1px #d2d2d2 solid","width": "70px", "height": "70px", borderRadius: 4, background: "#f50057", marginRight: 10, marginBottom: 10}} >
            <Icon>add_circle</Icon>
          </Button>
        </div>
        <Button color="secondary" disabled={ !this.context.state.burgers[this.context.state.currentSanduiche] || (this.context.state.burgers[this.context.state.currentSanduiche] && this.context.state.burgers[this.context.state.currentSanduiche].price == 0) || this.context.state.currentSanduiche == -1} onClick={this.sendToCart.bind(this)} variant="raised" color="primary" style={{marginTop: 10}} >
          {this.context.state.currentSanduiche == -1 ? "Selecione ou adicione um sanduíche" : this.context.state.burgers[this.context.state.currentSanduiche].price == 0 ? "Adicione ingredientes à este sanduíche" : "Adicionar ao carrinho este sanduíche"}
        </Button>
      </div>
    )
  }

}

export default BurgersFragment;
