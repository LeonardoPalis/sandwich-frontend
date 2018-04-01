export default class Sanduiche{
  constructor(proteins, sandwichName, salads, price){
    this._name = sandwichName || "Customizado";
    this._proteins = proteins || {};
    this._salads = salads || {};
    this._price = price || 0;
  }

  get name(){
    return this._name;
  }

  get proteins(){
    return this._proteins;
  }

  get salads(){
    return this._salads;
  }

  get price(){
    return this._price;
  }

  get formattedIngredients(){
    let text = "";
    Object.keys(this._proteins).forEach((iterator, index)=>{
      text += this._proteins[iterator] + " " + iterator + ", ";
    })
    Object.keys(this._salads).forEach((iterator, index)=>{
      text += this._salads[iterator] +  " " + iterator + ", ";
    })
    return text.slice(0, -1).slice(0, -1);
  }

  set price(price){
    this._price = price;
  }

  set proteins(protein){

    this._proteins[protein] =  this._proteins[protein] ? this._proteins[protein] + 1 : 1;
  }

  set salads(salad){
    this._salads[salad] =  this._salads[salad] ? this._salads[salad] + 1 : 1;
  }

  get proteinsQuantity(){
    return Object.keys(this._proteins).length;
  }

  get saladsQuantity(){
    return Object.keys(this._salads).length;
  }

  remove(type, element){
    if(this["_" + type]){
      this["_" + type][element] = this["_" + type][element] && this["_" + type][element] > 0 ? this["_" + type][element] - 1 : 0;
    }
  }

  propetiesInSanduiche(type){
    return Object.keys(this[type]);
  }

  countNumberOfPropeties(prop, element){
    return this[prop][element]
  }

}
