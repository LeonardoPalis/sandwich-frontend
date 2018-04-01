export function coinFormatter(value){
  let splittedValue = value.toString().split(".");
  if(splittedValue.length == 1){
    value = `${value}.00`
  }else if(splittedValue.length == 2){
    if(splittedValue[1].length == 1){
      value = `${value}0`
    }else if(splittedValue[1].length == 2){
    }
  }

  value = value.toString().replace(".", ",");
  return `R$${value}`;
}
