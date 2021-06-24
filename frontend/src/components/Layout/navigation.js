import React, {Fragment} from 'react';
//import {Navbar,Nav, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Login (props) {
  return (
    <Fragment>
	<nav className="navbar navbar-default app-navbar">
	    <div className="container-fluid">
	        <div className="navbar-header">
	            <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" className="navbar-toggle collapsed" type="button">
	            <span className="sr-only">Toggle navigation</span>
	            <span className="icon-bar"></span>
	            <span className="icon-bar"></span>
	            <span className="icon-bar"></span>
	            </button>
	            <Link to="/" className="navbar-brand"><b>HodlDice.com</b></Link>
	        </div>
	        <div className="navbar-collapse collapse" id="navbar">
	            <ul className="nav navbar-nav navbar-right">
	                <li>
	                <Link to="/play">Play</Link></li>
	                <li><Link to="/account">Account</Link></li>
	                <li><Link to="/faq">FAQ</Link></li>
	                <li><Link to="/verification">Verification</Link></li>
	                <li><Link to="/stats">Stats</Link></li>
	            </ul>
	        </div>
	    </div>
	</nav>

    </Fragment>
    )
}