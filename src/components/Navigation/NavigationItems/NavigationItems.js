import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const NavigationItems = (props) => {

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            { !props.isAuthenticated ?
                <NavigationItem link="/auth">Authenticate</NavigationItem> :
                <NavigationItem link="/auth">Logout</NavigationItem> }
        </ul>
    );
}

export default NavigationItems;