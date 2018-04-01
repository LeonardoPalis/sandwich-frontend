import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import styles from '../../assets/css/style.css';
import cartService from '../../service/CartService';
import { coinFormatter } from '../../helper/stringFormatter';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import CloseIcon from 'material-ui-icons/Close';
import RemoveIcon from 'material-ui-icons/IndeterminateCheckBox';
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import PubSub from 'pubsub-js';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CartComponentView extends Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      open: false,
      numberOfSandwiches: 0,
      sandwiches: [],
      totalPrice: cartService.totalPrice
    }
    PubSub.subscribe('update-number-cart-button', (data, msg)=>{
      this.setState({
        numberOfSandwiches: msg.quantity,
        sandwiches: msg.sandwiches
      })
    });
  }

  handleStateChange(state, value){
    this.setState({
      [state]: value
    })
  }

  formattedIngredients(sandwich){
    let response = "";
    Object.keys(sandwitch).forEach((iterator)=>{
      response +=  `${iterator}: ${sandwitch[iterator]} `
    })
    return response;
  }

  removeItemInCart(pos){
    this.state.sandwiches = this.state.sandwiches.filter((iterator, index)=>{
      return pos != index;
    })
    this.setState(this.state, ()=>{
      cartService.removeFromCart(pos);
      this.forceUpdate();
    });
  }

  render(){
    return (
      <div>
        <Badge color="secondary" badgeContent={cartService.sandwichesQuantity} style={{position: "fixed", bottom: 20, right: 20}} >
          <Button onClick={this.handleStateChange.bind(this, "open", true)} variant="fab" color="primary" aria-label="add" >
            <ShoppingCartIcon />
          </Button>
        </Badge>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleStateChange.bind(this, "open", false)}
          transition={Transition}
        >
          <AppBar>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleStateChange.bind(this, "open", false)} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" >
                Meu carrinho
              </Typography>
            </Toolbar>
          </AppBar>
          <List style={{maxHeight: 508, overflowY: "scroll"}}>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            {
              this.state.sandwiches.map((sandwich, index)=>{
                return (
                  <ListItem button>
                    <ListItemText primary={`${sandwich.name} - ${coinFormatter(sandwich.price)}`} secondary={sandwich.formattedIngredients} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={this.removeItemInCart.bind(this, index)} style={{color: "red"}} aria-label="Remover item">
                        <RemoveIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })
            }
          </List>

          <Typography style={{position: "absolute", bottom: 25, right: 25}} variant="headline" >
            <span style={{color: "#f50057"}}>Total: </span>{coinFormatter(cartService.totalPrice)}
          </Typography>
        </Dialog>
      </div>
    );
  }
}

export default CartComponentView;
