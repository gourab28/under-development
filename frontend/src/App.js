import React,{Fragment} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

// CSS FILES
import './App.css';
import './assets/css/toolkit.css';
import './assets/css/application.css';
// Layout Components
import Navbar from './components/Layout/navigation'
import Footer from './components/Layout/footer';
// Page Components
import Home from './components/HomePage/home';
import Login from './components/Account/login';
import Register from './components/Account/register';
import History from './components/Account/history';
import Logout from './components/Account/logout';
import Verification from './components/Account/verification';
import AccountHome from './components/Account/home';
import Deposit from './components/Account/deposit';
import Withdrawal from './components/Account/withdrawal';
import Play from './components/Play/home';

import Faq from './components/FAQ/home';
import Stats from './components/Stats/home';
//Login Protected
import Protected from './components/Protected';
import Test from './components/test';

function App() {
  return (
    <Fragment>
     <div className="container p-t-md">
      <Router>
        <Navbar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <Protected path="/verification" component={Verification} />
            <Protected path="/account" component={AccountHome} />
            <Protected path="/history" component={History} />
            <Protected path="/deposit" component={Deposit} />
            <Protected path="/withdraw" component={Withdrawal} />
            <Protected path="/play" component={Play} />
            <Route path="/faq" component={Faq} />
            <Protected path="/stats" component={Stats} />
        </Switch>
        <Footer />
      </Router>
     </div>
    </Fragment>
  );
}

export default App;
