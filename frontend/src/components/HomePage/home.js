import React,{Fragment} from 'react';
import payout from '../../assets/img/payout.png';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

export default function Home (props) {
  
  return (
    <Fragment>
    <Helmet>
      <title>HodlDice.Com</title>
    </Helmet>
<div className="panel panel-default mtl">
	<div className="panel-body">
		<center><h1>The Next Generation of Gambling</h1></center>
		<div className="row mtl">
			<div className="col-md-6 col-md-offset-1">
				<ul className="list-group mtl">
				  <li className="list-group-item"><i className="fa fa-check-circle mrs text-success" aria-hidden="true"></i> <b>Play instantly</b> <span className="pull-right hidden-xs">No registration required— deposit and start playing</span><span className="clearfix"></span></li>
				  <li className="list-group-item"><i className="fa fa-check-circle mrs text-success" aria-hidden="true"></i> <b>Bet as low as 0.00001 $HODL</b><span className="pull-right hidden-xs">All bets are instant and off-the-chain</span><span className="clearfix"></span></li>
				  <li className="list-group-item"><i className="fa fa-check-circle mrs text-success" aria-hidden="true"></i> <b>Cryptographically verifiable</b> <span className="pull-right hidden-xs">Provably fair and guaranteed by cryptography</span><span className="clearfix"></span></li>
				  <li className="list-group-item"><i className="fa fa-check-circle mrs text-success" aria-hidden="true"></i> <b>No blockchain spam</b> <span className="pull-right hidden-xs">We respect our beloved cryptocurrency</span><span className="clearfix"></span></li>
				</ul>
			</div>
			<div className="col-md-5">
				<div className="row mtl">
					<div className="col-md-8 col-md-offset-2 text-center">
						<img src={payout} alt="PayOut" width="92%" />
					</div>
				</div>

				<div className="row mtl">
					<div className="col-md-4 col-md-offset-2">
						<Link to="/faq" className="btn btn-primary-outline btn-block mts">Learn More</Link>
					</div>
					<div className="col-md-4">
						<Link to="/play" className="btn btn-success btn-block mts">Play Now</Link>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
    </Fragment>
    )
}