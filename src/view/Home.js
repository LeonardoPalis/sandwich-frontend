import React, {Component} from 'react';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { styleSheet, SEED_URL } from '../constants';
import Snackbar from 'material-ui/Snackbar';
import BurgersFragment from './fragments/BurgersFragment';
import BurgerCreator from './componentsView/BurgerCreator';
import CartComponentView from './componentsView/CartComponentView';
import MountedBurger from './componentsView/MountedBurger';
import PubSub from 'pubsub-js';

class Home extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      vertical: "top",
      horizontal: "right",
      showPromotionalSnack: false,
      snackMessage: "",
      finishDataDownload: false
    }

    PubSub.subscribe('show-promotional-snack', (data, msg)=>{
      this.setState({
        snackMessage: msg,
        showPromotionalSnack: true
      }, ()=>{
        setTimeout(()=>{
          this.setState({
            showPromotionalSnack: false
          })
        }, 6000)
      })
    });
  }

  _getIngredientsValues(){
    return new Promise((resolve)=>{
      fetch(SEED_URL + "ingredients",
      {  method: "GET", headers: {"Content-Type": "application/json"}  })
      .then((response)=>{
          response.json().then((data)=>{
            resolve(data);
          }).catch(()=>{
            console.log("error");
          });
        })
      })
    }

  componentDidMount(){
    this._getIngredientsValues().then((data)=>{
      this.state.data = data;
      this.state.finishDataDownload = true;
      this.setState(this.state);
    })
  }

  render(){
    const { vertical, horizontal, showPromotionalSnack } = this.state;
    let content = [];

    if(this.state.finishDataDownload){
      content = [
        <div>
          <Grid container spacing={16}>
              <Grid item xs={6}>
                <MountedBurger data={this.state.data} />
              </Grid>

              <Grid item xs={6}>
                  <BurgerCreator data={this.state.data} />
              </Grid>
          </Grid>
          <CartComponentView />
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={showPromotionalSnack}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.snackMessage}</span>}
          />
        </div>
      ]
    }else{
      content = [
        <div style={{width: "100%", marginTop: "25%"}} >
          <CircularProgress size={50} />
        </div>
      ]
    }
    return (
      <div className={styleSheet.root} style={{marginLeft: 8, marginRight: 8, marginBottom: 8, width: "100%", textAlign: "center", marginTop: document.getElementById( "appBar") ? (document.getElementById( "appBar").clientHeight + 10) + "px" : "80px"}}>
        {content}
      </div>
    );
  }
}


export default Home;
