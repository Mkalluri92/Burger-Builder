import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';

class Orders extends Component {
    _isMounted= false;
    state = {
        orders: [],
        loading: true
    }

    
    componentDidMount () {
        this._isMounted= true;
        axios.get('/orders.json')
            .then(res => {
                if (this._isMounted) {
                    const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({loading: false, orders: fetchedOrders})
                }
            }).catch(err => {
                this.setState({loading: false})
            })
    }

    componentWillUnmount () {
        this._isMounted = false
    }
    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
