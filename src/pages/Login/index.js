import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    userActions,
} from '../../actions';

import Content from '../../components/Content';

class Login extends Component {
	constructor(){
		super();
        
        this.state = {
            email: '',
            password: ''
        };
	}
    
    handleOnChangeText(text, state){
        this.setState({
            [state] : text
        });
    }
    
    handleLogin = async(e) => {
        e.preventDefault();
        
        let { email, password } = this.state;
        await this.props.login( email, password );
    }
    
	render() {
        let { email, password } = this.state;
        let { isLoginPending, isLoginSuccess, loginError } = this.props.user;
        
		return (
            <div>
                <Content>
                    <section className="hero is-fullheight">
                            <div className="hero-body">
                                <div className="container has-text-centered">
                                    <div className="column is-4 is-offset-4">
                                        <span className="icon is-large has-text-success" style={{ marginTop:'5px' }}>
                                            <i className="fas fa-lg fa-gamepad "></i>
                                        </span>
                                        <h4 className="title has-text-grey">Login</h4>
                                        
                                        { isLoginPending ? <div className="notification is-info"><button className="delete"></button>Please wait...</div> : '' }
                                        { isLoginSuccess ? this.props.history.push('/home') : '' }
                                        { loginError ? <div className="notification is-danger"><button className="delete"></button>{ loginError }</div> : '' }
                                        
                                        <div className="box">
                                            <form>
                                                <div className="field">
                                                    <div className="control">
                                                        <input className="input" type="email" placeholder="Email" onChange={ (e) => this.handleOnChangeText(e.target.value, 'email') } autoFocus value={ email } />
                                                    </div>
                                                </div>

                                                <div className="field">
                                                    <div className="control">
                                                        <input className="input" type="password" placeholder="Password" onChange={ (e) => this.handleOnChangeText(e.target.value, 'password') } value={ password } />
                                                    </div>
                                                </div>
                                                <Link to={`/home`} onClick={(e) => this.handleLogin(e)} className="button is-block is-success">Login</Link>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </section>
                </Content>
                
            </div>
        );
	}
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch( userActions.login(email, password) )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);