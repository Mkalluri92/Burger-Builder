import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div 
                className={classes.Modal}
                style = {{
                    tranform: props.show? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show? '1': '0',
                    display: props.show? 'inline-block':'none'
                }}>
                {props.children}
            </div>
        </Aux>
    )
} 

export default Modal;
