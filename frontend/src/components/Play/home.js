import React, {Fragment , useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

export default function PlayGame (props) {
  const [less , setLess] = useState("32440");
  const [odd , setOdd] = useState("");
  const [multip, setMultip] = useState("");
  const [max, setMax] = useState("");
  const [maxwin, setMaxwin] = useState("");
  const [betamt, setBetamt] = useState("");
  const [betresponse, setBetresponse] = useState([]);
  const [error, setError] = useState("");
  // User Information
  let Udata = localStorage.getItem("user");
  let obj = JSON.parse(Udata);
  const [data] = useState(obj);
  const [baldata, setBaldata] = useState();
  const [balupdate, setBalupdate] = useState();
  
 //Counting 
  
 let diceV = betresponse.diceValue;
//First Load
{/* useEffect(() => {
  const userd = { "userID": data.userID, "password": data.password };
    axios.post('http://localhost:5000/api/login', userd)
        .then(response => setBalupdate(response.data.balance));
},) */}
useEffect(() => {
    // POST request using axios inside useEffect React hook
    const userd = { "userID": data.userID, "password": data.password };
    axios.post('http://localhost:5000/api/login', userd)
        .then(response => setBaldata(response.data));
    // console.log(baldata);
  },);
  /// Load
useEffect(() => {
  getMaxwin();
  odds();
  multiplier();
  maxBet();
  lessVal();
});
function formatNUM (n)  {
    let dotPos, i, len, num, _i;
    num = (n / 1e8).toFixed(7);
    if (dotPos = num.indexOf(".")) {
        len = num.length - 1;
        for (i = _i = len; len <= 0 ? _i <= 0 : _i >= 0; i = len <= 0 ? ++_i : --_i) {
            if (num[i] !== "0") {
                if (i - dotPos <= 2) {
                    return num.substr(0, 3 + dotPos)
                } else {
                    return num.substr(0, i + 1);
                }
            }
        }
    } else {
        return num;
    }
}

// Validation
const lessVal = () => {
  if(less < 1) {
    setLess("1");
  } else if(less > 64000) {
    setLess("64000");
  }
}


function sigDigits(n, sig) {
  let mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
    return Math.floor(n * mult) / mult;
} 

// getMaxwin

const getMaxwin = () => {
  setMaxwin("20000000000");
}

//Max Bet 
const maxBet = () => {
  let max = maxwin / multip;
 let respn = Math.round(sigDigits(max, 2));
  let numbet = formatNUM((respn));
  setMax(numbet);
}
// Odds Calculation
  const odds = () => {
    let res = (less / 65536 * 100).toPrecision(3);
   // let oddsf = formatNUM(res);
    setOdd(res);
  }
 // multiplier Calculation
  const multiplier = () => {
    let multi   = sigDigits(65536 / less * .99, 5);
    setMultip(multi);
  }
  //console.log(data);
  //mAx
// const cMax = () => {
 //  let game = less;
  // let bala = data.balance * 1;
   
 //}
  const dobBet = () => {
    if (betamt.length === 0) {
       setBetamt("0.0000100");
     } else {
      let doubled = betamt * 2;
      setBetamt(doubled.toFixed(7));
    }
  }
  const minBet = () => {
    setBetamt("0.0000100");
  }
  const halfBet = () => {
    if (betamt.length === 0) {
       setBetamt("0.0000100");
     } else {
      let doubled = betamt / 2;
      setBetamt(doubled.toFixed(7));
    }
  }
  
  const maxxBet = () => {
    let balance = baldata.balance;
    let balan =  balance * 1;
    setBetamt(balan.toFixed(7));
  }
  // Bet Request to api
   const handleSubmit = async e => {
    try {
    e.preventDefault();
    const user = { "lessThanAmount": less , "userID": data.userID, "password": data.password, "betAmount": betamt };
    // send the username and password to the servertry {
    const response = await axios.post(
      "http://localhost:5000/api/makeBet",
      user
    );
    // set the state of the user
    setBetresponse(response.data);
    //Error Response
    } catch (err) {
     setError("Insufficient account balance for making bet.");
  }
  //console.log(error)
  
   }
   
   if (baldata) {
     
     //Validation
      const betamtVal = () => {
        if(betamt < 0.0000000) {
          setBetamt("");
          } else if(betamt > baldata.balance) {
            setBetamt(baldata.balance);
            }
      }
     // Total Bet
      let totalBet = baldata.betHistory.length;
    //Total 
    let twin = baldata.betHistory.filter(item => item.betLucky === true);
    let twinl = twin.length;
     // Total Loss Count
    let tloss = baldata.betHistory.filter(item => item.betLucky === false);
   let lossl = tloss.length;
     
  //Balance Formatting
  //let resBetid = baldata.betHistory.betID;
  return (
    <Fragment>
     <div className="row  mtl mbs">
          <div className="col-sm-9">
            <div className="panel panel-default mbn">
              <div className="panel-body">
                <div className="row">
                  <div className="col-sm-7">
                    <div className="row">
                      <div className="col-sm-7">
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon">Less Than</span>
                       <input type="tel" className="form-control text-center"
                       onChange={event => setLess(event.target.value)}
                       onClick={odds}
                       value={less}
                       />
                            <div className="input-group-btn">
                              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options <span className="caret" /></button>
                              <ul className="dropdown-menu dropdown-menu-right bet oppv">
                              <li
                                onClick={event => setLess("60000")}>&nbsp;&nbsp;&nbsp; {"<"} &nbsp; 60000 &nbsp; 91.6% &nbsp; 1.0813x &nbsp;&nbsp;&nbsp;</li>
                             <li
                                onClick={event => setLess("55000")}>&nbsp;&nbsp;&nbsp; {"<"} &nbsp; 55000 &nbsp; 83.9%  &nbsp; 1.1796x &nbsp;&nbsp;&nbsp;</li>
                                <li
                                onClick={event => setLess("32768")}>&nbsp;&nbsp;&nbsp; {"<"} &nbsp; 32768 &nbsp; 50.0% &nbsp; 1.98x &nbsp;&nbsp;&nbsp;</li>
                                <li
                                onClick={event => setLess("16384")}>&nbsp;&nbsp;&nbsp; {"<"} &nbsp; 16384 &nbsp; 25.0% &nbsp; 3.96x &nbsp;&nbsp;&nbsp;</li>
                                <li
                                onClick={event => setLess("7000")}>&nbsp;&nbsp;&nbsp; {"<"} &nbsp; 7000 &nbsp; 10.7% &nbsp; 9.2686x &nbsp;&nbsp;&nbsp;</li>
                                <li
                                onClick={event => setLess("2400")}>&nbsp;&nbsp;&nbsp; {"<"} &nbsp; 2400 &nbsp; 3.66% &nbsp; 27.033x &nbsp;&nbsp;&nbsp;</li>
                                <li
                                onClick={event => setLess("1000")}>&nbsp;&nbsp;&nbsp; {"<"} &nbsp; 1000 &nbsp; 1.53% &nbsp; 64.88x &nbsp;&nbsp;&nbsp;</li>
                                <li
                                onClick={event => setLess("1")}>&nbsp;&nbsp;&nbsp; {"<"} &nbsp; 1 &nbsp; 0.00153% &nbsp; 64880x &nbsp;&nbsp;&nbsp;</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-5">
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon">Max Bet</span><b><input disabled="disabled" className="form-control text-right" value={max} /></b>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group  mbs">
                          <div className="input-group">
                            <span className="input-group-addon">Odds</span><b><input disabled="disabled" className="form-control text-center" value={odd} /></b><span className="input-group-addon">%</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group  mbs">
                          <div className="input-group">
                            <span className="input-group-addon">Multiplier</span><b><input disabled="disabled" className="form-control text-center" value={multip} /></b><span className="input-group-addon">x</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="row">
                      <div className="col-sm-7">
                        <div className="form-group has-success">
                          <div className="input-group">
                            <span className="input-group-addon">Bet</span><input type="tel" className="form-control text-right" placeholder="0.00000000"
                       value={betamt}
                       onChange={event => {setBetamt(event.target.value); betamtVal()}}
                       />
                          </div>
                        </div>
                      </div>
                   
                      <div className="col-sm-5">
                        <p onClick={handleSubmit} className="btn btn-success btn-block">Roll &nbsp;<b className="text-info">L</b></p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="btn-group btn-group-justified btn-group-halves">
                          <p onClick={minBet} className="btn btn-primary">MIN &nbsp;<b className="text-info">A</b></p>
                          <p onClick={halfBet} className="btn btn-primary">/2 &nbsp;<b className="text-info">S</b></p>
                          <p onClick={dobBet} className="btn btn-primary">X2 &nbsp;<b className="text-info">D</b></p>
                          <p onClick={maxxBet} className="btn btn-primary">MAX &nbsp;<b className="text-info">F</b></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="panel panel-default mbn">
              <div className="panel-body pbm">
                <ul className="list-group mbs">
                  <li className="list-group-item pts pbs">
                    <h4 className="man"><span className="pull-left">$HODL:</span> <span className="pull-right">{baldata.balance}</span></h4>
                    <div className="clearfix" />
                  </li>
                </ul>
                <div className="clearfix" />
                <div className="btn-group btn-group-justified btn-group-halves mbm mtm ptx">
                  <Link to="/deposit" className="btn btn-primary-outline">Deposit</Link>
                  <Link to="/withdraw" className="btn btn-success-outline">Withdraw</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
         <p className="text-danger"
                      style={{textAlign: "center"}}><b>{error}</b></p>
        <div className="row">
          <div className="col-sm-3">
            <ul className="list-group mbs">
              <li className="list-group-item"><b>Bets:</b> <span className="pull-right text-success"><b >{totalBet}</b></span></li>
            </ul>
          </div>
          <div className="col-sm-3">
            <ul className="list-group mbs">
              <li className="list-group-item"><b>Win/Lose:</b> <span className="pull-right"><b className="text-success">{twinl}</b><b> / </b><b className="text-danger">{lossl}</b></span></li>
            </ul>
          </div>
          <div className="col-sm-3">
            <ul className="list-group mbs">
              <li className="list-group-item"><b>Wagered:</b> <span className="pull-right text-success"><b id="wagered">0.00000000</b></span></li>
            </ul>
          </div>
          <div className="col-sm-3">
            <ul className="list-group mbs">
              <li className="list-group-item"><b>Profit:</b> <span className="pull-right text-success" id="profit"><b>0.00000000</b></span></li>
            </ul>
          </div>
        </div>
        <div className="panel panel-default">
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
              <th className="betid">{value.betID}</th>
              <td>{value.betTime}</td>
              <td>{value.betLucky === true ? (
              <p><b className="text-success">Win</b></p> ) : (
                <p><b className="text-danger"> Lose </b></p>
                     )}</td>
              <td>{value.betAmount}</td>
              <td>{value.multiplier}</td>
              
            </tr>
             )
         })}
            </tbody>
          </table>
        </div>
    {/* <iframe scrolling="no" frameBorder="0" src="/play.html"  style={{ width: '100%', height: '130vh',  overflow: 'hidden'}}></iframe> */}

    </Fragment>
    ) }
    return (
      <Fragment>
      <div class="row text-center">
        <h5>Loading ....</h5>
      </div>
    </Fragment>
      )
}