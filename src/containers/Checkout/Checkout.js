import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    
    state = {
        ingredients: null
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        for (let param of query.entries()) {
            //['salad','1']
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }

    checkoutcancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () =>{
        console.log(this.props.history);
        this.props.history.replace('/checkout/contact-data');
    }
    
    
    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutcancelled={this.checkoutcancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
            </div>
        )
    }
}

export default Checkout;
