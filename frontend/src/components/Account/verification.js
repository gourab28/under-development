import React, {Fragment , useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Verification (props) {
  const [betId , setBetId] = useState("");
  const [resbetId, setResbet] = useState();
  const [error, setError] = useState("");
 
 const handleSubmit = async e => {
    e.preventDefault();
    const user = {"seedPhrase": betId};
    // send the username and password to the server
    const response = await axios.post(
      "http://localhost:5000/api/verifyBet",
      user
    );
    // set the state of the user
    setResbet(response);
    // store the user in localStorage
  console.log(resbetId);
  };
 if (resbetId) {
   return(
     <Fragment>
        <div className="panel panel-default mtl">
	<div className="panel-body">
		<div className="row">
			<div className="col-sm-8">
			<form onSubmit={handleSubmit}>
						<div className="row">
							<div className="col-xs-8">
								<div className="form-group">
									<div className="input-group">
										<div className="input-group-addon">BET ID</div>
										<input type="tel" 
										 className="form-control input-block" 
										 placeholder="Enter seedPhrase"
										 onChange={event => setBetId(event.target.value)}
										 maxlength="12"/>
									</div>
								</div>
							</div>
							<div className="col-xs-4">
								<button 
								className="btn btn-primary btn-block waves-effect waves-button waves-float"
								type="submit">Lookup</button>
							</div>
						</div>
						
					</form>
			
        <div className="panel panel-default">
					<div className="panel-heading">Results</div>
					<div className="panel-body">
					<div class="row mtm mbl">
	            <div class="col-md-6 col-md-offset-3"> 
					<ul class="list-group mbs">
			            <li class="list-group-item"><b>Seed:</b> <span class="pull-right"><b><samp>{resbetId.data.seedPhrase}</samp></b></span></li>
			            <li class="list-group-item"><b>Dice :</b> <span class="pull-right "><b><samp>{resbetId.data.diceValue}</samp></b></span></li>
			        </ul>
	            </div>
	
	        </div>
					</div>
				</div>
		 
				<div className="panel panel-default">
					<div className="panel-heading">Verifying a bet</div>
					<div className="panel-body">
					Each bet can be verified using the day's secret and the last deposit's TXID. To produce a stream of numbers a nonce is appended which is incremented by 1 on every bet. The nonce is reset to 0 on every deposit.
					<br/><br/>
					The lucky number is computed by the first 4 hex digits of <b>hmac_sha512(secret, lastdeposittxid:nonce)</b>
					<br/><br/>
					For more information on how to verify a bet enter its ID at the top of the page. <Link to="/bet/d36d5d1b0664">(Example)</Link></div>
				</div>

				<div className="panel panel-default">
					<div className="panel-heading">Secrets</div>
					<div className="panel-body">A different secret is used each day. SHA256 hashes of all secrets until 2030 have been precomputed and are available <Link to="/files/secrethashes.txt">here</Link>. Secrets are released 4 hours after the day has ended.</div>
				</div>

				<div className="panel panel-default">
					<div className="panel-heading">Database dumps</div>
					<div className="panel-body">In the interest of transparency all accounts, deposits and withdrawals are available publicly and are updated every 60 minutes.</div>
				</div>



			</div>
			<div className="col-sm-4">
				<div className="panel panel-default">
					<div className="panel-heading">Secrets</div>
					<div className="list-group">
						<Link className="list-group-item" to="/files/secrethashes.txt"><b>secrethashes.txt <span className="pull-right text-primary"><i className="fa fa-cloud-download" aria-hidden="true"></i> Download</span></b></Link>
						<Link className="list-group-item" to="/files/secrets.txt"><b>secrets.txt <span className="pull-right text-primary"><i className="fa fa-cloud-download" aria-hidden="true"></i> Download</span></b></Link>
					</div>		
				</div>

				<div className="panel panel-default">
					<div className="panel-heading">Accounts</div>
					<div className="list-group">
				  		<Link className="list-group-item" to="/files/accounts.txt"><b>accounts.txt <span className="pull-right text-primary"><i className="fa fa-cloud-download" aria-hidden="true"></i> Download</span></b></Link>
					</div>		
				</div>

				<div className="panel panel-default">
					<div className="panel-heading">Deposits & Withdrawals</div>
					<div className="list-group">
				  		<Link className="list-group-item" to="/files/deposits.txt"><b>deposits.txt <span className="pull-right text-primary"><i className="fa fa-cloud-download" aria-hidden="true"></i> Download</span></b></Link>
				  		<Link className="list-group-item" to="/files/withdrawals.txt"><b>withdrawals.txt  <span className="pull-right text-primary"><i className="fa fa-cloud-download" aria-hidden="true"></i> Download</span></b></Link>
					</div>		
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
  <div className="panel panel-default mtl">
	<div className="panel-body">
		<div className="row">
			<div className="col-sm-8">
			<form onSubmit={handleSubmit}>
						<div className="row">
							<div className="col-xs-8">
								<div className="form-group">
									<div className="input-group">
										<div className="input-group-addon">BET ID</div>
										<input type="tel" 
										 className="form-control input-block" 
										 placeholder="Enter seedPhrase"
										 onChange={event => setBetId(event.target.value)}
										 maxlength="12"/>
									</div>
								</div>
							</div>
							<div className="col-xs-4">
								<button 
								className="btn btn-primary btn-block waves-effect waves-button waves-float"
								type="submit">Lookup</button>
							</div>
						</div>
						
					</form>

				<div className="panel panel-default">
					<div className="panel-heading">Verifying a bet</div>
					<div className="panel-body">
					Each bet can be verified using the day's secret and the last deposit's TXID. To produce a stream of numbers a nonce is appended which is incremented by 1 on every bet. The nonce is reset to 0 on every deposit.
					<br/><br/>
					The lucky number is computed by the first 4 hex digits of <b>hmac_sha512(secret, lastdeposittxid:nonce)</b>
					<br/><br/>
					For more information on how to verify a bet enter its ID at the top of the page. <Link to="/bet/d36d5d1b0664">(Example)</Link></div>
				</div>

				<div className="panel panel-default">
					<div className="panel-heading">Secrets</div>
					<div className="panel-body">A different secret is used each day. SHA256 hashes of all secrets until 2030 have been precomputed and are available <Link to="/files/secrethashes.txt">here</Link>. Secrets are released 4 hours after the day has ended.</div>
				</div>

				<div className="panel panel-default">
					<div className="panel-heading">Database dumps</div>
					<div className="panel-body">In the interest of transparency all accounts, deposits and withdrawals are available publicly and are updated every 60 minutes.</div>
				</div>



			</div>
			<div className="col-sm-4">
				<div className="panel panel-default">
					<div className="panel-heading">Secrets</div>
					<div className="list-group">
						<Link className="list-group-item" to="/files/secrethashes.txt"><b>secrethashes.txt <span className="pull-right text-primary"><i className="fa fa-cloud-download" aria-hidden="true"></i> Download</span></b></Link>
						<Link className="list-group-item" to="/files/secrets.txt"><b>secrets.txt <span className="pull-right text-primary"><i className="fa fa-cloud-download" aria-hidden="true"></i> Download</span></b></Link>
					</div>		
				</div>

				<div className="panel panel-default">
					<div className="panel-heading">Accounts</div>
					<div className="list-group">
				  		<Link className="list-group-item" to="/files/accounts.txt"><b>accounts.txt <span className="pull-right text-primary"><i className="fa fa-cloud-download" aria-hidden="true"></i> Download</span></b></Link>
					</div>		
				</div>

				<div className="panel panel-default">
					<div className="panel-heading">Deposits & Withdrawals</div>
					<div className="list-group">
				  		<Link className="list-group-item" to="/files/deposits.txt"><b>deposits.txt <span className="pull-right text-primary"><i className="fa fa-cloud-download" aria-hidden="true"></i> Download</span></b></Link>
				  		<Link className="list-group-item" to="/files/withdrawals.txt"><b>withdrawals.txt  <span className="pull-right text-primary"><i className="fa fa-cloud-download" aria-hidden="true"></i> Download</span></b></Link>
					</div>		
				</div>

			</div>
		</div>
	</div>
</div>

    </Fragment>
    )
}