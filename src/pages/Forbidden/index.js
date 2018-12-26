import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Content from '../../components/Content';

export default class Forbidden extends Component {
	render() {
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
                                        <h4 className="title has-text-grey">403 Access Denied</h4>
                                        <p>Forbidden Error. Try to <Link to="/">Login</Link></p>
                                    </div>
                                </div>
                            </div>
                    </section>
                </Content>
            </div>
        );
	}
}
