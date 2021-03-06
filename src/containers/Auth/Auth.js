import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    checkValidity(value, rules) {
        let _isValid = true;

        if(!rules) {
            return true;
        }

        if(rules.required) {
            _isValid = value.trim() !== '' && _isValid;
        }


        if(rules.minLength) {
            _isValid = value.length >= rules.minLength && _isValid;
        }

        if(rules.maxLength) {
            _isValid = value.length <= rules.maxLength && _isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            _isValid = pattern.test(value) && _isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            _isValid = pattern.test(value) && _isValid
        }

        return _isValid
    }

    componentDidMount () {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render () {
        let formElemenetsArray = [];
            for (let key in this.state.controls) {
                formElemenetsArray.push({
                    id: key,
                    config: this.state.controls[key]
                })
            }

            let form = formElemenetsArray.map(formElement => (
                <Input 
                    key = {formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    shouldValidate={formElement.config.validation}
                    invalid= {!formElement.config.valid}
                    touched= {formElement.config.touched}
                    changed={(event) => this.inputChangeHandler(event, formElement.id)} />
            ));

            if(this.props.loading) {
                form = <Spinner />
            }

            let errorMessage = null;

            if(this.props.error) {
                errorMessage= (
                    <p>{this.props.error.message}</p>
                )
            }

            let authRedirect = null;
            if(this.props.isAuthenticated) {
                authRedirect = <Redirect to={this.props.authRedirect} />
            }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup? 'SINGIN': 'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        isBuildingBurger: state.burger.buildingBurger,
        authRedirect: state.auth.authRedirectPath
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
