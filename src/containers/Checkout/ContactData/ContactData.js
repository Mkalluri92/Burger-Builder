    import React, { Component } from 'react';

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
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: ''
                }
            },
            loading: false
        }

        componentDidMount () {
            this._isMounted = true;
        }

        orderHandler = (event) => {
            
            event.preventDefault();
            this.setState({
                loading: true
            })
            //alert('You Continue');
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.price
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

            let form = ( <form>
                {formElemenetsArray.map(formElement => (
                    <Input
                        key={formElement.id} 
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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

    export default ContactData;