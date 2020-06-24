import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    toggleClicked={this.menuClicked}/>
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}/>
                <div className = {classes.content}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
    
}

const mapStateToProps = state => {
        return {
            isAuthenticated: state.auth.token !== null
        }
}

export default connect(mapStateToProps)(Layout);
