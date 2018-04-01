import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import styles from '../../assets/css/style.css';
import Grid from 'material-ui/Grid';
import ListFragment from '../fragments/ListFragment';
import Sanduiche from '../../model/Sanduiche';
import CartService from '../../service/CartService';
import { coinFormatter } from '../../helper/stringFormatter';
import "../overlay.css";
import xBaconImage from '../../assets/images/X-BACON.png'
import xBurguerImage from '../../assets/images/X-BURGUER.png'
import xEggImage from '../../assets/images/X-EGG.png';
import Button from 'material-ui/Button';
import MountedBurgerFragment from '../fragments/MountedBurgerFragment';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import PubSub from 'pubsub-js';
import cartService from '../../service/CartService';

class MountedBurger extends Component {

  constructor(props, context){
    super(props, context);

    this.state = {
      burgers: [],
      ingredientsBacon: this.props.data.ingredientsBacon,
      ingredientsBurger: this.props.data.ingredientsBurger,
      ingredientsEgg: this.props.data.ingredientsEgg,
      ingredientsEggBacon: this.props.data.ingredientsEggBacon,
      proteins: this.props.data.proteins,
      ingredientsPrice: this.props.data.ingredientsPrice,
      salads: this.props.data.salads,
      currentSanduiche: 0,
      openCustomizeSandwichModal: false
    }
    this.burgerFragmentBacon = new MountedBurgerFragment(this, xBaconImage, "X-BACON", ...this.state.ingredientsBacon);
    this.burgerFragmentBurguer = new MountedBurgerFragment(this, xBurguerImage, "X-BURGER", ...this.state.ingredientsBurger);
    this.burgerFragmentEgg = new MountedBurgerFragment(this, xEggImage, "X-EGG", ...this.state.ingredientsEgg);
    this.burgerFragmentEggBacon = new MountedBurgerFragment(this, xBaconImage, "X-EGG-BACON", ...this.state.ingredientsEggBacon);
    this.listFragmentProtein = new ListFragment(this, "proteins");
    this.listFragmentSalad = new ListFragment(this, "salads");

  }

  handleChangeState(state, value){
    this.setState({
      [state]: value
    })
  }

  sendToCart(){

    cartService.sendToCart(this.state.burgers[this.state.currentSanduiche].proteins, `${this.state.burgers[this.state.currentSanduiche].name} (Alterado)`, this.state.burgers[this.state.currentSanduiche].salads, this.state.burgers[this.state.currentSanduiche].price);
    this.setState({
      openCustomizeSandwichModal: false
    })
    PubSub.publish('update-number-cart-button', {quantity:cartService.sandwichesQuantity, sandwiches: cartService.sandwiches});
  }

  render(){
    return (
      <div style={{marginBottom:-10}}>
        {this.burgerFragmentBacon.view}
        {this.burgerFragmentBurguer.view}
        {this.burgerFragmentEgg.view}
        {this.burgerFragmentEggBacon.view}

        <Dialog
          fullScreen={false}
          open={this.state.openCustomizeSandwichModal}
          onClose={this.handleChangeState.bind(this, "openCustomizeSandwichModal", false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{`Customize o seu ${this.state.burgers[this.state.currentSanduiche] && this.state.burgers[this.state.currentSanduiche].name}`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Você pode adicionar ou remover ingredientes do seu sanduíche!
            </DialogContentText>
            <Grid container spacing={8} style={{marginTop: 10, marginBottom:10}}>
                <Grid item xs={6} style={{textAlign: "left"}}>
                    <Typography variant="subheading">
                        Ingredientes:
                    </Typography>
                </Grid>
                <Grid item xs={6} style={{textAlign: "right"}}>
                  <Typography variant="display1">
                    {this.state.burgers[this.state.currentSanduiche] ? coinFormatter(this.state.burgers[this.state.currentSanduiche].price) : "R$0,00"}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{textAlign: "left"}}>
                  {

                    this.state.burgers[this.state.currentSanduiche] && this.state.burgers[this.state.currentSanduiche].propetiesInSanduiche("proteins").map((iterator)=>{
                      return (
                        this.state.burgers[this.state.currentSanduiche].countNumberOfPropeties("proteins", iterator) > 0 &&
                        <Typography variant="Headline">
                            {`${iterator}: +${this.state.burgers[this.state.currentSanduiche].countNumberOfPropeties("proteins", iterator)}`}
                        </Typography>
                      )
                    })
                  }
                  {
                    this.state.burgers[this.state.currentSanduiche] && this.state.burgers[this.state.currentSanduiche].propetiesInSanduiche("salads").map((iterator)=>{
                      return (
                        this.state.burgers[this.state.currentSanduiche].countNumberOfPropeties("salads", iterator) > 0 &&
                        <Typography variant="Headline">
                            {`${iterator}: +${this.state.burgers[this.state.currentSanduiche].countNumberOfPropeties("salads", iterator)}`}
                        </Typography>
                      )
                    })
                  }
                </Grid>
            </Grid>
            <Grid container spacing={8} style={{marginTop: 10}}>
                <Grid item xs={6}>
                    <Typography variant="Headline">
                        Escolha suas proteinas
                    </Typography>
                    { this.listFragmentProtein.view }
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="Headline">
                        Escolha sua salada
                    </Typography>
                    { this.listFragmentSalad.view }
                </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleChangeState.bind(this, "openCustomizeSandwichModal", false)} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.sendToCart.bind(this)} color="primary" autoFocus>
              Adicionar ao carrinho
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}

export default MountedBurger;
