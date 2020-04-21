import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    return <Aux>
        <Toolbar />
        <SideDrawer />
        <div>Toolbar, sidebar, backdrop</div>
        <div className = {classes.content}>
            {props.children}
        </div>
    </Aux>
}

export default Layout;
