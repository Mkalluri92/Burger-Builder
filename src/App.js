import React, { Component }from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  
  render () {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/Checkout" component={Checkout} />
            <Route path="/Orders" component={Orders} />
            <Route path="/Auth" component={Auth} />
            <Route path="/Logout" component={Logout} />
          </Layout>
        </BrowserRouter> 
      </div>
    )
  }
}

export default App;
