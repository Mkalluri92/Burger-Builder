import * as actionTypes from './actionTypes';
import axios from 'axios';

export  const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName:ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName:ingName
    }
}

const getIngredientsFromUrl = (ingredients) => {
    return {
        type: actionTypes.GET_INGREDIENT,
        ingredients: ingredients
    }
}

const getIngredientsFailed = () => {
    return {
        type: actionTypes.GET_INGREDIENTS_FAILED
    }
}
    
export const getIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-22603.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch (getIngredientsFromUrl(response.data))
        }).catch(error => {
            console.log(error);
            dispatch (getIngredientsFailed())
        })
    }
}

