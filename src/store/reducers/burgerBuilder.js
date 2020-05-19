import * as actionTypes from '../actions/actionTypes';

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

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                purshasable: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            let sum = 0;
            for(let key in state.ingredients) {
                sum = sum + state.ingredients[key];
            }
            
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                purshasable: sum > 1
            };
        case actionTypes.GET_INGREDIENT:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            }
        case actionTypes.GET_INGREDIENTS_FAILED:
            console.log(state);
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;
