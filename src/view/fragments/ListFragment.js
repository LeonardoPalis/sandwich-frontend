import React, {Component} from 'react';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import SubIcon from 'material-ui-icons/ExposureNeg1';
import AddIcon from 'material-ui-icons/ExposurePlus1';
import cartService from '../../service/CartService';

class ListFragment{

  constructor(context, typeList){
    this.context = context;
    this.typeList = typeList;
  }

  _exportModifyCreatedSanduiche(operator, position){
    let self = this.context;
    let currentPropety = self.state[this.typeList][position];
    let currentBurger = self.state.burgers[self.state.currentSanduiche];
    let { currentSanduiche } = self.state;
    if(operator == "add"){
      currentBurger[this.typeList] = currentPropety;
    }else{
        currentBurger.remove(this.typeList, currentPropety);
    }
    currentBurger.price = cartService.computePriceBySandwitch(currentBurger);
    self.setState(self.state);
  }

  get view(){
    return (
      <List>
          {
            this.context.state[this.typeList].map((element, index)=>{ return(
              <ListItem>
                  <ListItemText primary={element} />
                  <ListItemSecondaryAction>
                    <IconButton disabled={this.context.state.currentSanduiche == -1 || this.context.state.burgers.length == 0} onClick={this._exportModifyCreatedSanduiche.bind(this,"remove", index)} aria-label="Comments">
                      <SubIcon />
                    </IconButton>
                    <IconButton disabled={this.context.state.currentSanduiche == -1 || this.context.state.burgers.length == 0} onClick={this._exportModifyCreatedSanduiche.bind(this,"add", index)} aria-label="Comments">
                      <AddIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
              </ListItem>
            )})
          }
      </List>
    )
  }

}

export default ListFragment;
