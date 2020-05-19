import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    // componentDidMount() {
    //     this.props.onInitPurchase()
    // }

    // componentDidMount () {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {}
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         //['salad','1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //             console.log(price);
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({
    //         ingredients: ingredients,
    //         totalPrice: price});
    // }

    checkoutcancelledHandler = () => {
        //this.props.history.goBack();
        this.props.history.replace('/')
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }
    
    
    render () {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased? <Redirect to="/" /> : null
            summary = <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutcancelled={this.checkoutcancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                path = {this.props.match.path + '/contact-data'}
                component = {ContactData}/>
            </div>
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        purchased: state.order.purchased
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit())
//     }
// }
export default connect(mapStateToProps)(Checkout);
