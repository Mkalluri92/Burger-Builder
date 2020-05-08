import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render () {

        const ingredientSummary = [];
    for (let key in this.props.ingredients) {
        ingredientSummary.push(<li key={key}>
            <span style={{textTransform: 'capitalize'}}> {key} </span>: {this.props.ingredients[key]}
            </li>)
    }

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseCotinued}>CONTINUE</Button>
        </Aux>
    )
    }
    
};

export default OrderSummary;