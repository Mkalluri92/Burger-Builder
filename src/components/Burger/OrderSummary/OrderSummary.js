import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = [];
    for (let key in props.ingredients) {
        ingredientSummary.push(<li key={key}>
            <span style={{textTransform: 'capitalize'}}> {key} </span>: {props.ingredients[key]}
            </li>)
    }

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseCotinued}>CONTINUE</Button>
        </Aux>
    )
};

export default OrderSummary;