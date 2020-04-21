import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {

    /*
    const transformedIngredients = Object.keys(props.ingeridents)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                <BurgerIngredient key= {igkey + i} type = {igKey} />
            })
        });
    */

    var transformedIngredients = [];

    for (var items in props.ingredients){
        const eachItem =  props.ingredients[items];
        for(var i=0; i<eachItem; i++){
            transformedIngredients.push(items);
            }
    }

    const allIngredients = transformedIngredients.map((current, index) => {
        return <BurgerIngredient key={current+index} type={current}/>
    })

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {allIngredients.length === 0? <p>Please add the Ingredients</p>: allIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
        
    );
}

export default Burger;
