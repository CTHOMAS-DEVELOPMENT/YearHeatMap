export const daysIntoYear=(date: any)=>{
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}
export const daysInTheYear=()=>
{
    return daysIntoYear(new Date(`${ new Date().getFullYear() }-12-31`))
}
export const heatMapColorforValue=(value: number)=>{
  var h = value * 240
  return "hsl(" + h + ", 100%, 50%)";
}
export const sortList=( list: any,field: string )=>{
  return list.sort((a: string,b: string)=> new Date(a[field]).getTime() - new Date(b[field]).getTime() )
}
export const groupBy=(objectArray: any, property: string )=> {
  return objectArray.reduce(function (acc : any, obj : Object) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}



