import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

export default function Login (props) {
  const [reg, setReg] = useState();
  
  useEffect(() => {
    getSignup();
  },[]);
  
  const getSignup = async()=> {
    const res = await axios('http://localhost:5000/api');
     setReg(res.data)
  }
  console.log(reg)
  return (
    <Fragment>
      	<div class="col-sm-9">
		<div class="panel panel-default mtl">
		<div class="panel-heading text-center"><b>Registration Information</b></div>
		<div class="panel-body ptl pbl">
			<div class="text-center">
	        
	        <br/>
	        <b>If you would like to use your balance on another computer you may login at <Link to="/login">https://hodldice.com/login</Link> <br/>using the following credentials:</b>
	        </div>
	        <br/>

	        <div class="row mtm mbl">
	            <div class="col-md-6 col-md-offset-3"> 
					<ul class="list-group mbs">
					       <li class="list-group-item"><b>Depsit Address:</b> <span class="pull-right wordbrk"><b><samp>{reg.account_address}</samp></b></span></li>
			            <li class="list-group-item"><b>User ID:</b> <span class="pull-right"><b><samp>{reg.userID}</samp></b></span></li>
			            <li class="list-group-item"><b>Password:</b> <span class="pull-right "><b><samp>{reg.password}</samp></b></span></li>
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
    </Fragment>
    )
}