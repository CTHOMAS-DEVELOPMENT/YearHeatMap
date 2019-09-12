import * as React from "react";
import "./css/app.scss"
import Heatmap from "./components/Heatmap"
import { daysIntoYear, daysInTheYear, heatMapColorforValue, sortList, groupBy } from "./common"
import { Transactions } from './data/transactions'

export const App = () => {
  const [name, setName] = React.useState("initialName");
  const [result, setResult] = React.useState([]);
  const [daysInYear, setDaysInYear] = React.useState(0);
  /**
  * transactionSuccess -
  * 
  * Param
  *  total - The aggregated object
  *  currentValue - The trade object one of potentially many that made up that day's trading
  * About/Returns - 
  *  Reducer function which is used to aggregate the success and failure attributes of the result object
  */
  const transactionSuccess=(total, currentValue)=>{
      let successAmount=currentValue.transactionType==="success"?currentValue.amount:0
      let failureAmount=currentValue.transactionType==="failed"?currentValue.amount:0
      
      return { success : total.success + successAmount , failure: total.failure + failureAmount, daysIntoYear: daysIntoYear(new Date(currentValue.date)) }
  }
  /**
  * getDaysTransactionSuccess -
  * 
  * Param -
  *  dayData - A trade object
  * 
  * About/Returns -
  *  Aggregates the success and failure totals for each trading day. Adds the daysIntoYear attribute.
  */
  const getDaysTransactionSuccess=(dayData)=>{
      return dayData[1].reduce(transactionSuccess,{ success : 0, failure : 0, daysIntoYear: 0});
  }
  /**
   * getNoTransactionDay -
   * 
   * Param -
   *  daysIntoYear - The correct "trading day" number
   * About/Returns -
   *  Returns the "No trading day" object
   * 
   */
  const getNoTransactionDay=(daysIntoYear)=>{
     return {success: 0, failure: 0, daysIntoYear: daysIntoYear, colorNumber: 0, heatColor: "hsl(0, 100%, 50%)"}
  }
      /**
     * reduceTransactions -
     * 
     * Params -
     *  allData - The derived data from the json file. Ordered and Aggregated array of objects
     *  results - The result array reference
     * About/Returns - 
     *  (1) Totals success and failure for the day and adds these attributes to the "result" object
     *  allData - All the processed (Ordered/aggregated) data
     *  (2) Adds the "Days into year" value to the "result" object
     *  (3) Adds missing "No trade day object" to the "result" object
     */
  const reduceTransactions=(allData,results)=>
  {
        let missingDayInsert=0;
        allData.forEach(function(dayData,index,arr) {
            let aggegatedValues=getDaysTransactionSuccess(dayData);

            //'Success', and the associated color, is derived from success/(success+failure) 
            aggegatedValues.colorNumber=(aggegatedValues.success/(aggegatedValues.success + aggegatedValues.failure))/2
            aggegatedValues.heatColor=heatMapColorforValue(aggegatedValues.colorNumber)

            //Was there a 'No trading day' ? 
            if(aggegatedValues.daysIntoYear > index+1+missingDayInsert)
            {
                missingDayInsert++;
                results.push(getNoTransactionDay(index+missingDayInsert))
            }

            results.push(aggegatedValues)
            
        },this);

        let remainingCollections=daysInTheYear() - results.length;

        //Append 'No trading' object to the incomplete year result set
        for (let i = 0; i<remainingCollections; i++) {
           results.push(getNoTransactionDay(results.length + 1))
    }
  }
  const setUsernameState = (event) => {
    setName(event.target.value);
  };
  React.useEffect(() => {
    //Read, order and aggregate/reduce the data
    let results=[];
    let ordereredList=sortList(Transactions,"date");
    let groupedtransactions = groupBy(ordereredList, "date")
    let arrayFromObject=Object.entries(groupedtransactions)
    reduceTransactions(arrayFromObject, results)
    //console.log("reduceTransactions", results)
    setResult(results)
    setDaysInYear(daysIntoYear(new Date(`${ new Date().getFullYear() }-12-31`)))

  }, []);
  
//console.log("result",result)
  return (
    <>
      <Heatmap userName={name} result={result} daysInYear={daysInYear} />
    </>
  );
};
