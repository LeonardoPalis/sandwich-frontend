export default class Cart{

  constructor(sandwiches, promotions){

    this._sandwiches = [];
    this._promotions = [];
  }

  get sandwiches(){
    return [].concat(this._sandwiches);
  }

  get promotions(){
    return [].concat(this._promotions);
  }

  set sandwiches(sandwich){
    this._sandwiches.push(sandwich);
  }

  set promotions(promotion){
    this._promotions.push(promotion);
  }

  removeSandwich(pos){
    this._sandwiches = this._sandwiches.filter((sandwich, iterator)=>{
      return iterator != pos;
    })
  }

}
