import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    purshasable: false,
    loading: false,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updatedState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        purshasable: true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state,action) => {
    let sum = 0;
    for(let key in state.ingredients) {
        sum = sum + state.ingredients[key];
    }

    const updateIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updateIngs = updateObject(state.ingredients, updateIng);
    const updateState = {
        ingredients: updateIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        purshasable: sum > 1
    }
    return  updateObject(state, updateState);
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
            
        case actionTypes.GET_INGREDIENT:
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false,
                totalPrice: 4
            })
                
        case actionTypes.GET_INGREDIENTS_FAILED:
            console.log(state);
            return updateObject(state, {error: true})

        default:
            return state;
    }
}

export default reducer;
