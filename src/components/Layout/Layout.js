import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    menuClicked = (prevState) => {
        return (this.setState({
            showSideDrawer: !this.state.showSideDrawer
        }))
    }

    render () {
        return <Aux>
        <Toolbar toggleClicked={this.menuClicked}/>
        <SideDrawer 
            open={this.state.showSideDrawer}
            closed={this.sideDrawerCloseHandler}/>
        <div className = {classes.content}>
            {this.props.children}
        </div>
    </Aux>
    }
    
}

export default Layout;
