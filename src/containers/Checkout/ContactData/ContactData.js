import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    _isMounted = false;
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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
            price: this.props.price,
            customer: {
                name: 'Mounika Kalluri',
                address: {
                    street: 'Test street 1',
                    zipcode: '97291',
                    country: 'USA'
                },
                email: 'test@gmail.com'
           },
            deliveryMethod: 'fastest'
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

        let form = ( <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
            <input className={classes.Input} type="text" name="email" placeholder="Your Mail" />
            <input className={classes.Input} type="text" name="street" placeholder="Street" />
            <input className={classes.Input} type="text" name="postalcode" placeholder="Postalcode" />
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
