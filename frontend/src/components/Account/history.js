import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'; 
import Tippy from '@tippy.js/react';
export default function Login (props) {
    // User Information
  let Udata = localStorage.getItem("user");
  let obj = JSON.parse(Udata);
  const [data] = useState(obj);
  const [baldata, setBaldata] = useState();
  
  useEffect(() => {
    // POST request using axios inside useEffect React hook
    const userd = { "userID": data.userID, "password": data.password };
    axios.post('http://localhost:5000/api/login', userd)
        .then(response => setBaldata(response.data));
    // console.log(baldata);
  },1000);
  
  function getNumber (num) {
    
    var units = ["M","B","T","Q"]
    var unit = Math.floor((num / 1.0e+1).toFixed(0).toString().length)
    var r = unit%3
    var x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2)
    return x.toFixed(2)+ ' ' + units[Math.floor(unit / 3) - 2]
}
  if (baldata) {
  return (
    <Fragment>
          <div className="row">
        <div className="col-sm-3">
          <div className="list-group mtl">
            <Link class="list-group-item" to="/account"><b><span class="icon icon-chevron-thin-right pull-right"></span>Account Information</b></Link>
			<Link class="list-group-item" to="/deposit"><b><span class="icon icon-chevron-thin-right pull-right"></span> Deposit</b></Link>
			<Link class="list-group-item" to="/withdraw"><b><span class="icon icon-chevron-thin-right pull-right"></span> Withdraw</b></Link>
			<Link class="list-group-item active" to="/history"><b><span class="icon icon-chevron-thin-right pull-right"></span> Bet History</b></Link>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="panel panel-default mtl">
            <div className="panel-heading text-center"><b>Bet History</b></div>
            <div className="panel-body ptl pbl">
              <div className="text-center">
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
           {baldata.betHistory.map((value, index) => {
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
              <a>{getNumber(value.betAmount).replace("0.00 undefined", (value.betAmount))}</a>
             </Tippy>
              </td>
              <td>{value.multiplier}</td>
            </tr>
             )
         })}
            </tbody>
          </table>
              </div>
            </div>
          </div>
        </div></div>
    </Fragment>
    )
  } else {
    return (
      <div class="row text-center">
        <h5>Loading ....</h5>
      </div>
  )
  }
}
