import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Clipboard from 'react-clipboard.js';

export default function Account (props) {
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
  },[]);
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

  if (baldata) {
    return (
          <Fragment>
            <div class="row">
	<div class="col-sm-3">
		<div class="list-group mtl">
			<Link class="list-group-item active" to="/account"><b><span class="icon icon-chevron-thin-right pull-right"></span>Account Information</b></Link>
			<Link class="list-group-item" to="/deposit"><b><span class="icon icon-chevron-thin-right pull-right"></span> Deposit</b></Link>
			<Link class="list-group-item" to="/withdraw"><b><span class="icon icon-chevron-thin-right pull-right"></span> Withdraw</b></Link>
			<Link class="list-group-item" to="/history"><b><span class="icon icon-chevron-thin-right pull-right"></span> Bet History</b></Link>
		</div>
	</div>
	<div class="col-sm-9">
		<div class="panel panel-default mtl">
		<div class="panel-heading text-center"><b>Account Information</b></div>
		<div class="panel-body ptl pbl">
			<div class="text-center">
	        <br/>
	        <b>Your balance ( <b>{baldata.balance}</b> ) $HODL will be available next time you visit this website by means of a cookie.</b>
	        <br/>
	        <b>If you would like to use your balance on another computer you may login at <Link to="/login">https://hodldice.com/login</Link> <br/>using the following credentials:</b>
	        </div>
	        <br/>

	        <div class="row mtm mbl">
	            <div class="col-md-6 col-md-offset-3"> 
					<ul class="list-group mbs">
			            <li class="list-group-item"><b>User ID:</b> <span class="pull-right"><b><samp>{data.userID}</samp></b><Clipboard className="clipb pull-right user" data-clipboard-text={data.userID}><i class="far fa-clipboard"></i></Clipboard></span></li>
			            <li class="list-group-item"><b>Password:</b> <span class="pull-right "><b><samp>{data.password} </samp></b> <Clipboard className="clipb pull-right user" data-clipboard-text={data.password}><i class="far fa-clipboard"></i></Clipboard></span></li>
			        </ul>
	            </div>
	
	        </div>
	        <small><center><b>Note:</b> Accounts are created only after the first deposit!</center></small>

	        <div class="text-center">
	            <hr class="mbl mts"/>
	            <small><b class="text-danger">Warning:</b> Make sure you save your login credential. If you deleted your cookies and/or forgot your User ID and/or Password and since we do not require <br/> an email address, password reset is not automated. Use the contact link at the bottom of the page. You will need to prove that you own one of the <br/> originating addresses of your first deposit. </small>
	        </div>

	    </div>
		</div>
	</div>
</div>
    </Fragment>
    )
  }
  return (
    <Fragment>
      <div class="row text-center">
        <h5>Loading ....</h5>
      </div>
    </Fragment>
    )
}