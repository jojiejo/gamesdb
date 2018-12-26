import React, { Component } from 'react';

import Content from '../../components/Content';

export default class NotFound extends Component {
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
                                        <h4 className="title has-text-grey">404 Not Found</h4>
                                        <p>The page you are looking for could not be found.</p>
                                    </div>
                                </div>
                            </div>
                    </section>
                </Content>
            </div>
        );
	}
}
