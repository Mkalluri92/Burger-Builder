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
