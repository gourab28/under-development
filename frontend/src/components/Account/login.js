import React, { useState, useEffect } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import Clipboard from 'react-clipboard.js';
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  const [reg, setReg] = useState();
let history = useHistory();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  // logout the user
 {/* const handleLogout = () => {
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
  }; */}
  const continueLogin = () => {
    setReg();
  }
 console.warn(user);
  // login the user
  const handleSubmit = async e => {
    try {
    e.preventDefault();
    const user = { "userID": username, "password": password };
    // send the username and password to the servertry {
    const response = await axios.post(
      "http://localhost:5000/api/login",
      user
    );
    // set the state of the user
    setUser(response.data);
    
    // store the user in localStorage
    localStorage.setItem("user", JSON.stringify(response.data))
      
    } catch (err) {
    setError("Invalid UserID and password.")
  }
  };
  
  const getSignup = async()=> {
    const res = await axios('http://localhost:5000/api/');
     setReg(res.data)
  };
 console.log(error);
  // if there's a user show the message below
  if (user) {
    history.push('/account');
    return (
      <div>
        is loggged in
      </div>
    );
  }
 
 else if (reg) {
   return (
     <>
           <div className="col-sm-12">
        <div className="panel panel-default mtl">
          <div className="panel-heading text-center"><b>Registration Information</b></div>
          <div className="panel-body ptl pbl">
            <div className="text-center">
              <div className="row mtm mbl">
                <div className="col-md-6 col-md-offset-3"> 
                 <ul className="list-group mbs">
                 <li className="list-group-item"><b>User ID:</b><span className="wordbrk"> {reg.userID} <Clipboard className="clipb pull-right user" data-clipboard-text={reg.userID}><i class="far fa-clipboard"></i></Clipboard></span></li>
                 <li className="list-group-item"><b>Password:</b><span className="wordbrk"> {reg.password} <Clipboard className="clipb pull-right user" data-clipboard-text={reg.password}><i class="far fa-clipboard"></i></Clipboard></span></li>
			            <li className="list-group-item"><b>Depsit Address:</b><span className="wordbrk"> {reg.account_address} <Clipboard className="clipb pull-right user" data-clipboard-text={reg.account_address}><i class="far fa-clipboard"></i></Clipboard></span></li>

			        </ul>
                </div>
              </div>
       <div className="form-group">
        <button onClick={continueLogin} className="btn btn-primary btn-block" type="submit">Continue Login</button>
       </div>
              <small><center><b>Note:</b> Accounts are created only after the first deposit!</center></small>
              <div className="text-center">
                <hr className="mbl mts" />
                <small><b className="text-danger">Warning:</b> Make sure you save your login credential. If you deleted your cookies and/or forgot your User ID and/or Password and since we do not require <br /> an email address, password reset is not automated. Use the contact link at the bottom of the page. You will need to prove that you own one of the <br /> originating addresses of your first deposit. </small>
              </div>
            </div>
          </div>
        </div>
      </div>
     </>
     )
 }
  // if there's no user, show the login form
  return (
    <div className="panel panel-default mtl">
    	<div className="panel-heading">
    	 <h3 className="text-center panel-title">Login</h3>
      </div>
    <div className="panel-body">
    	<div className="row">
       <div className="col-md-4 col-md-offset-4 ptl pbl">
       <h5
       style={{color: "red",fontWeight: "bold", textAlign: "center",display: error.length<1  ? "none" : "",}}><i className="fas fa-times"></i> {error}</h5>
      <form onSubmit={handleSubmit}>
      <div className="form-group ">
        <label className="control-label">User ID </label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        </div>
        <div className="form-group ">
          <label className="control-label">Password </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
       <div className="form-group">
        <button className="btn btn-primary btn-block" type="submit">Login</button>
       </div>
      </form>
      <div style={{marginBottom: "5px"}}>
    <button onClick={getSignup} className="btn btn-secondary btn-block" type="submit"><b>Create Account</b></button>
    </div>
     </div>
    </div>
    
     <center><small>Note: Accounts are created once the first deposit is credited.</small></center>
    </div>
    </div>
  );
};

export default Login;