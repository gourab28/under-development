import React, {Fragment, useState, useEffect} from 'react';
 import axios from 'axios';
 import Tippy from '@tippy.js/react';
 //import millify from "millify";

export default function MyComponent() {
  const [total, setTotal] =useState([]);
  
  let Udata = localStorage.getItem("stats");
  let obj = JSON.parse(Udata);
  const [data] = useState(obj);
  
  useEffect(() => {
    sendTableRequest();
  },[])
  
  const sendTableRequest = async () => {
    try {
        const resp = await axios.get('http://localhost:5000/api/stats');
        
        localStorage.setItem("stats", JSON.stringify(resp.data))
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
   function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
    var abbrev = [ "K", "M", "B", "T" ];

    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);

        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.round(number*decPlaces/size)/decPlaces;

             // Handle special case where we round up to the next abbreviation
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }

             // Add the letter for the abbreviation
             number += abbrev[i];

             // We are done... stop
             break;
        }
    }

    return number;
}
function getNumber (num) {
    
    var units = ["M","B","T","Q"]
    var unit = Math.floor((num / 1.0e+1).toFixed(0).toString().length)
    var r = unit%3
    var x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2)
    return x.toFixed(2)+ ' ' + units[Math.floor(unit / 3) - 2]
}
 if(data) {
   return(
     <>
      <table className="table table-bordered table-condensed text-center">
            <thead>
              <tr>
                <th className="active text-center"><b>BET ID</b></th>
                <th className="active text-center"><b>When</b></th>
                <th className="active col-sm-1 text-center"><b>Lucky</b></th>
                {/*<th className="active col-sm-1 text-center"><b>Target</b></th> */}
                <th className="active col-sm-2 text-center"><b>Bet</b></th>
                <th className="active col-sm-1 text-center"><b>Multiplier</b></th>
              </tr>
            </thead>
           <tbody id="history">
      {data.list[37].new_history.map((value, index) => {
        return(
            <tr>
              <th className="betid">{value.betID.substring(20)}</th>
              <td>{value.betTime}</td>
              <td>{value.betLucky === true ? (
              <p><b className="text-success">Win</b></p> ) : (
                <p><b className="text-danger"> Lose </b></p>
                     )}</td>
              <td>
              <Tippy content={value.betAmount}>
              <a>{getNumber(value.betAmount). replace("0.00 undefined",(value.betAmount)).replace("undefined","K")}</a>
             </Tippy>
              </td>
              <td>{value.multiplier}</td>
            </tr>
             )
         })}
               {data.list[0].new_history.map((value, index) => {
        return(
            <tr>
              <th className="betid">{value.betID.substring(20)}</th>
              <td>{value.betTime}</td>
              <td>{value.betLucky === true ? (
              <p><b className="text-success">Win</b></p> ) : (
                <p><b className="text-danger"> Lose </b></p>
                     )}</td>
              <td>
              <Tippy content={value.betAmount}>
              <a>{getNumber(value.betAmount). replace("0.00 undefined",(value.betAmount)).replace("undefined","K")}</a>
             </Tippy>
              </td>
              <td>{value.multiplier}</td>
            </tr>
             )
         })}
            </tbody>
          </table>
     </>
     )
 }
  return(
    <Fragment>
    Loading
    </Fragment>
    )
}

