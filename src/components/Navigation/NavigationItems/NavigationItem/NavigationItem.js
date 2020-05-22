import React from 'react';
import classes from './NavigationItem.module.css'
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink
                exact = {props.exact}
                to={props.link}
                activeClassName={classes.active} 
                activeStyle={{
                    backgroundColor: '#8F5C2C',
                    borderBottom: '4px solid #40A4C8',
                    color: 'white'
                }}>
                    {props.children}
            </NavLink>
        </li>
    );
}

export default NavigationItem;