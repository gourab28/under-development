import React,{Fragment , useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function Footer (props) {
const [user, setUser] = useState();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  
  if(user) {
    return (
      <Fragment>
      <div className="panel panel-default  panel-link-list">
        <div className="panel-body">
           &copy; 2021 HodlDice.com
           <span className="pull-right">
	          <Link to="/logout">Logout</Link>
	          <Link to="/contact">Contact</Link>
           </span>
        </div>
     </div>
      </Fragment>
      )
  } else {
  return (
    <Fragment>
     	<div className="panel panel-default  panel-link-list">
        <div className="panel-body">
           &copy; 2021 HodlDice.com
           <span className="pull-right">
	          <Link to="/login">Login</Link>
	          <Link to="!#">Contact</Link>
           </span>
        </div>
     </div>
    </Fragment>
    )
} }