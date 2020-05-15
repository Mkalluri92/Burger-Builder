    import React, { Component } from 'react';
    import { connect } from 'react-redux';

    import Button from '../../../components/UI/Button/Button';
    import classes from './ContactData.module.css';
    import axios from '../../../axios-orders';
    import Spinner from '../../../components/UI/Spinner/Spinner';
    import Input from '../../../components/UI/Input/Input';

    class ContactData extends Component {
        _isMounted = false;

        state = {
            orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false

                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: 'fastest',
                    validation: {},
                    valid: true
                }
            },
            formIsValid: false,
            loading: false
        }

        componentDidMount () {
            this._isMounted = true;
        }

        checkValidity(value, rules) {
            let _isValid = true;

            if(!rules) {
                return true;
            }

            if(rules.required) {
                _isValid = value.trim() !== '' && _isValid;
            }


            if(rules.minLength) {
                _isValid = value.length >= rules.minLength && _isValid;
            }

            if(rules.maxLength) {
                _isValid = value.length <= rules.maxLength && _isValid;
            }

            return _isValid
        }

        orderHandler = (event) => {
            event.preventDefault();
            this.setState({loading: true})
            const formData = {};
            for (let formElementIndentifier in this.state.orderForm) {
                formData[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value
            }
            const order = {
                ingredients: this.props.ings,
                price: this.props.cost,
                orderData: formData
            }
                
            axios.post('/orders.json', order)
                .then(response => {
                    console.log(this._isMounted);
                    if(this._isMounted) {
                        this.setState({
                            loading: false
                        })
                        this.props.history.push('/');
                    }
                }).catch(error => {
                    this.setState({
                        loading: false
                })
            })
        }

        inputChangeHandler = (event, inputIndentifier) => {
            const updatedOrderForm = {
                ...this.state.orderForm
            }
            const updatedFormElement = {
                ...updatedOrderForm[inputIndentifier]
            }
            updatedFormElement.value = event.target.value
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
            updatedFormElement.touched = true;
            updatedOrderForm[inputIndentifier] = updatedFormElement;
             
            let isFormValid = true;

            for(let inputIndentifier in updatedOrderForm) {
                isFormValid = updatedOrderForm[inputIndentifier].valid && isFormValid
            }
            //console.log(isFormValid);
            
            this.setState({
                orderForm: updatedOrderForm,
                formIsValid: isFormValid
            })
        }

        componentWillUnmount () {
            this._isMounted = false;
        }

        render () {

            let formElemenetsArray = [];
            for (let key in this.state.orderForm) {
                formElemenetsArray.push({
                    id: key,
                    config: this.state.orderForm[key]
                })
            }

            let form = ( 
                <form onSubmit={this.orderHandler}>
                    {formElemenetsArray.map(formElement => (
                        <Input
                            key={formElement.id} 
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            shouldValidate={formElement.config.validation}
                            invalid= {!formElement.config.valid}
                            touched= {formElement.config.touched}
                            changed={(event) => this.inputChangeHandler(event, formElement.id)} />
                    ))}
                    <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>Order</Button>
            </form>
            );
            if(this.state.loading) {
                form = <Spinner />;
            }
            return (
                <div className={classes.ContactData}>
                    <h4>Enter your Contact data</h4>
                    {form}
                </div>
            )
        }
    }

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        cost: state.totalPrice
    }
}
    export default connect(mapStateToProps)(ContactData);
