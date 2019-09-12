export const daysIntoYear=(date)=>{
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

export const daysInTheYear=()=>
{
    return daysIntoYear(new Date(`${ new Date().getFullYear() }-12-31`))
}
export const heatMapColorforValue=(value)=>{
  var h = value * 240
  return "hsl(" + h + ", 100%, 50%)";
}
export const sortList=(list,field)=>{
  return list.sort((a,b)=> new Date(a[field]).getTime() - new Date(b[field]).getTime() )
}
export const groupBy=(objectArray, property)=> {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}



