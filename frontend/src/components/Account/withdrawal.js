import React, {Fragment, useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

const Login = () => {
  const [withamt, setWithamt] = useState("");
  const [withdrawaddess, setWithdrawaddess] = useState("");
  const [user, setUser] = useState();
  const [error, setError] = useState();
//let history = useHistory();
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
  // logout the user
 {/* const handleLogout = () => {
    setUser({});
    setWithamt("");
    setWithdrawaddess("");
    localStorage.clear();
  }; */}
// console.warn(user);
  // login the user
  const handleSubmit = async e => {
    try {
    e.preventDefault();
    const user = { "userID": data.userID,
    "withdrawAmount": withamt, "password": data.password, "withdrawAddress": withdrawaddess };
    // send the username and password to the servertry {
    const response = await axios.post(
      "http://localhost:5000/api/withdraw",
      user
    );
    // set the state of the user
    setUser(response.data);
      
    } catch (err) {
      setError("Insufficient account balance for requested withdrawal.");
  }
  };
 console.log(error);
 const maxWith = () => {
    setWithamt(baldata.balance);
  }
  // if there's a user show the message below
  // if there's no user, show the login form
  if(user) {
    return (
      <>
       <div className="row">
	<div className="col-sm-3">
		<div className="list-group mtl">
			<Link className="list-group-item" to="/account"><b><span className="icon icon-chevron-thin-right pull-right"></span>Account Information</b></Link>
			<Link className="list-group-item" to="/deposit"><b><span className="icon icon-chevron-thin-right pull-right"></span> Deposit</b></Link>
			<Link className="list-group-item active" to="/withdraw"><b><span className="icon icon-chevron-thin-right pull-right"></span> Withdraw</b></Link>
			<Link className="list-group-item" to="/history"><b><span className="icon icon-chevron-thin-right pull-right"></span> Bet History</b></Link>
		</div>
	</div>
	<div className="col-sm-9">
		<div className="panel panel-default mtl">
		<div className="panel-heading text-center"><b>Withdraw {user.transactionStatus}</b></div>
		<div className="panel-body ptl pbl">
			<div className="text-center">
	        <br/>
	        <b>Your balance ( <b>{baldata.balance}</b> ) $HODL.</b>
	        <br/>
	        <b>If you would like to use your balance on another computer you may login at <Link to="/login">https://hodldice.com/login</Link> <br/>using the following credentials:</b>
	        </div>
	        <br/>
	             <h5 style={{color: "green", textAlign: "center"}}> Withdrawal is {user .transactionStatus}</h5>
	         <br/>
	        <small><center><b>Note:</b> Accounts are created only after the first deposit!</center></small>

	        <div className="text-center">
	            <hr className="mbl mts"/>
	            <small><b className="text-danger">Warning:</b> Make sure you save your login credential. If you deleted your cookies and/or forgot your User ID and/or Password and since we do not require <br/> an email address, password reset is not automated. Use the contact link at the bottom of the page. You will need to prove that you own one of the <br/> originating addresses of your first deposit. </small>
	        </div>

	    </div>
		</div>
	</div>
</div>

      </>
      )
  } else if (baldata) {
  return (
   <>
 <div className="row">
	<div className="col-sm-3">
		<div className="list-group mtl">
			<Link className="list-group-item" to="/account"><b><span className="icon icon-chevron-thin-right pull-right"></span>Account Information</b></Link>
			<Link className="list-group-item" to="/deposit"><b><span className="icon icon-chevron-thin-right pull-right"></span> Deposit</b></Link>
			<Link className="list-group-item active" to="/withdraw"><b><span className="icon icon-chevron-thin-right pull-right"></span> Withdraw</b></Link>
			<Link className="list-group-item" to="/history"><b><span className="icon icon-chevron-thin-right pull-right"></span> Bet History</b></Link>
		</div>
	</div>
	<div className="col-sm-9">
		<div className="panel panel-default mtl">
		<div className="panel-heading text-center"><b>Withdraw Information</b></div>
		<div className="panel-body ptl pbl">
			<div className="text-center">
	        <br/>
	        <b>Your balance ( <b>{baldata.balance}</b> ) $HODL.</b>
	        <br/>
	        <b>If you would like to use your balance on another computer you may login at <Link to="/login">https://hodldice.com/login</Link> <br/>using the following credentials:</b>
	        </div>
	        <br/>

	   <form onSubmit={handleSubmit}>
      <div className="form-group ">
        <label className="control-label">Withdraw Amount </label>
        <div className="">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <div className="input-group">
                         <input type="tel" className="form-control text-left" placeholder="0.00000000"
                       value={withamt}
                       onChange={({ target }) => setWithamt(target.value)} /><span onClick={maxWith}
                       style={{color: '#fff', background: '#0d47a1'}}
                       className="input-group-addon has-success btn"><b>Max</b></span>
                          </div>
                        </div>
                      </div>
                      </div>
                      </div>
        </div>
        <div className="form-group ">
          <label className="control-label">Withdraw Address </label>
          <input
            type="text"
            className="form-control"
            value={withdrawaddess}
            onChange={({ target }) => setWithdrawaddess(target.value)}
          />
        </div>
       <div className="form-group">
        <button className="btn btn-primary btn-block" type="submit">Withdraw</button>
       </div>
      </form>
	        <small><center><b>Note:</b> Accounts are created only after the first deposit!</center></small>

	        <div className="text-center">
	            <hr className="mbl mts"/>
	            <small><b className="text-danger">Warning:</b> Make sure you save your login credential. If you deleted your cookies and/or forgot your User ID and/or Password and since we do not require <br/> an email address, password reset is not automated. Use the contact link at the bottom of the page. You will need to prove that you own one of the <br/> originating addresses of your first deposit. </small>
	        </div>

	    </div>
		</div>
	</div>
</div>

   </>
  )
  } return (
    <Fragment>
      <div class="row text-center">
        <h5>Loading ....</h5>
      </div>
    </Fragment>
    )
};

export default Login;