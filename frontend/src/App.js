import Login from './Login';
import Music from './Music';
import Create from './Create';
import Cart from './Cart';
import Checkout from './Checkout';
import './header.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router-dom';

  

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/music' component={Music} />
        <Route exact path='/create' component={Create} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/checkout' component={Checkout} />
    </Switch>
    </Router>
    
  );
}

export default App;
