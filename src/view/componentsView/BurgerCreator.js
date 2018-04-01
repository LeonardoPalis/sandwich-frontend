import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import styles from '../../assets/css/style.css';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import ListFragment from '../fragments/ListFragment';
import BurgersFragment from '../fragments/BurgersFragment';
import Sanduiche from '../../model/Sanduiche';
import cartService from '../../service/CartService';
import { coinFormatter } from '../../helper/stringFormatter';

class BurgerCreator extends Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      burgers: [new Sanduiche()],
      proteins: this.props.data.proteins,
      ingredientsPrice: this.props.data.ingredientsPrice,
      salads: this.props.data.salads,
      currentSanduiche: 0
    }
    this.listFragmentProtein = new ListFragment(this, "proteins");
    this.listFragmentSalad = new ListFragment(this, "salads");
    this.burgersFragment = new BurgersFragment(this);
    cartService.setIngredientsPrices(this.state.ingredientsPrice);
  }

  _exportNewSanduiche(){

    let selfie = this.state
    this.state.burgers.push(new Sanduiche());
    this.setState(this.state);
  }

  _exportModifySaladCreatedSanduiche(prop, quantity, operator){

    operator = operator == "add" ? 1 : -1;
    let { currentSanduiche } = this.state;
    let propetySanduiche = operator * quantity ;
    this.state.burgers[currentSanduiche][prop] = propetySanduiche;
    this.setState(this.state);
  }

  render(){
    return (
      <Card>
          <CardContent>
              <Typography variant="display1" style={{fontWeight: 200}}>
                  Monte seu <span style={{color: "#f50057", fontWeight: "bold"}}>delicioso</span> sanduíche!
              </Typography>
              <Grid container spacing={8} style={{marginTop: 10, marginBottom:10}}>
                  <Grid item xs={12} style={{textAlign: "left"}}>
                      <Typography variant="subheading">
                          Seus sanduíches
                      </Typography>
                  </Grid>
                  <Grid item xs={12} >
                    {this.burgersFragment.view}
                  </Grid>

              </Grid>
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

              <Divider />

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
          </CardContent>
      </Card>
    );
  }
}

export default BurgerCreator;
