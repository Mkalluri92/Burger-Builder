import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';

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

        }
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

    render () {
        let formElemenetsArray = [];
            for (let key in this.state.controls) {
                formElemenetsArray.push({
                    id: key,
                    config: this.state.controls[key]
                })
            }

            const form = formElemenetsArray.map(formElement => (
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
        return (
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
            </div>
        )
    }
}

export default Auth;
