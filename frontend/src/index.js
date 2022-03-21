import React from 'react';
import Login from './Login';
import Logout from './Logout';
import Music from './Music';
import Create from './Create';
import Cart from './Cart';
import Checkout from './Checkout';
import ReactDOM from 'react-dom';
import './index.css';
import './header.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Redirect to="/Music"/>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/music' component={Music} />
          <Route exact path='/create' component={Create} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/checkout' component={Checkout} />
          <Route exact path='/logout' component={Logout} />
        </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
