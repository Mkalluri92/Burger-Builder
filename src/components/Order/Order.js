import React from 'react';
import classes from './Order.module.css'

const Order = (props) => {

   let ingredients = [];
    for (var items in props.ingredients){
       ingredients.push({
           item: items,
           quantity: props.ingredients[items]
       })
    }

    let ingredientsAndQuantity = ingredients.map(current => (
        <span 
            key={current.item}
            style={{textTransform: 'capitalize',
                    display: 'inine-block',
                    margin: '0px 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                    }}>
                {current.item} ({current.quantity})
        </span>
    ))

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsAndQuantity}</p>
    <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    )
}

export default Order;
