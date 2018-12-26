import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    userActions,
} from '../../actions';

class Header extends Component {
	
    handleLogout = () => {
        this.props.logout();
        this.props.history.push('/');
    }
    
	render() {
		return (
			<nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-item" style={{ display:'flex', justifyContent:'space-between', width:'175px' }}>
                            <span className="icon is-large has-text-success" style={{ marginTop:'5px' }}>
                                <i className="fas fa-lg fa-gamepad "></i>
                            </span>
                            <h4 className="title is-4">GamesDB</h4>
                        </Link>
                        <Link to="#" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </Link>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="navbar-end">
                                    <div className="navbar-item" style={{ display:'flex', width:'470px', justifyContent:'flex-end' }}>
                                        <p>You are logged in as &nbsp;</p>
                                        <div className="dropdown is-hoverable">
                                            <div className="dropdown-trigger">
                                                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                                    <span className="icon is-large has-text-success is-small">
                                                        <i className="fas fa-lg fa-user" style={{ width:'16px', height:'16px' }}></i>
                                                    </span>
                                                    <span>{ this.props.email }</span>
                                                    <span className="icon is-small"><i className="fas fa-angle-down" aria-hidden="true"></i></span>
                                                </button>
                                            </div>
                                            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                                <div className="dropdown-content">
                                                    <Link to="/" onClick={ () => this.handleLogout() } className="dropdown-item">Logout</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
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
        logout: () => dispatch( userActions.logout() )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);