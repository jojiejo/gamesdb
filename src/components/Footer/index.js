import React, { Component } from 'react';

export default class Footer extends Component {	
	render() {
		return (
			<footer className="footer">
                <div className="content has-text-centered">
                    <p>
                      <strong>GamesDB</strong> by <a href="https://jgthms.com">Djody Ramadhan</a>. 
                      <br />Designed using&nbsp; <a href="https://jgthms.com">Bulma</a>. Inspired by <a href="https://mythril.io">Mythril IO</a>.
                    </p>
                </div>
            </footer>
		);
	}
}
