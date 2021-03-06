import React, { Component }from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';


class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignUp();
  }
  
  render () {
    //console.log(this.props.isAuthenticated);
    let routes = (
      <Switch>
        <Route path="/Auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/Checkout"  component={Checkout} />
          <Route path="/Orders" component={Orders} />
          <Route path="/Logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <BrowserRouter>
          <Layout>
            {routes}
          </Layout>
        </BrowserRouter> 
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return {
    isAuthenticated: state.auth.token!== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(App));
