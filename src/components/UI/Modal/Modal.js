import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    componentDidMount () {
       // console.log(this.props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    style = {{
                        tranform: this.props.show? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show? '1': '0',
                        display: this.props.show? 'inline-block':'none'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
    
} 

export default Modal;
