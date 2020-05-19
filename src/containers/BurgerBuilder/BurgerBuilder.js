import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    // updatePurchaseState (ingredients) {
        
    //     let sum = 0;
    //     for(let key in ingredients) {
    //         sum = sum + ingredients[key];
    //     }

    //     this.setState({
    //         purshasable: sum > 0
    //     })
    // }


    componentDidMount() {
        this.props.getIngredients()
        // axios.get('https://react-my-burger-22603.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data})
        // }).catch(error => {
        //     console.log(error.message);
        //     this.setState({error: true})
        // })
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount+1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = parseFloat(priceAddition) + parseFloat(oldPrice);
    //     this.setState({
    //         totalPrice: parseFloat(newPrice).toFixed(2),
    //         ingredients: updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = parseFloat(oldPrice) - parseFloat(priceDeduction);
        
    //     this.setState({
    //         totalPrice: parseFloat(newPrice).toFixed(2),
    //         ingredients: updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }
      

    render () {

        const disabledInfo = {...this.props.ings};

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p>: <Spinner />
        
        if (this.props.ings) {
            burger = (
                <Aux>
                     <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                    ingredientAdded = {this.props.onIngredientAdded}
                    ingredientRemoved = {this.props.onIngredientRemoved}
                    disabled = {disabledInfo}
                    purchasable = {this.props.purshasable}
                    price = {this.props.cost.toFixed(2)}
                    ordered = {this.purchaseHandler}/>
                </Aux>
            )
            orderSummary = <OrderSummary 
                ingredients={this.props.ings} 
                purchaseCancled = {this.purchaseCancelHandler}
                purchaseCotinued = {this.purchaseContinueHandler}
                price = {this.props.cost.toFixed(2)} />
        }
        
        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        cost: state.totalPrice,
        purshasable: state.purshasable,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        getIngredients: () => dispatch(burgerBuilderActions.getIngredients())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
