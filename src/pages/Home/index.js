import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    userActions,
} from '../../actions';

import Header from '../../components/Header';
import Content from '../../components/Content';
import Footer from '../../components/Footer';

const styles = {
    heroBody:{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://mythril.nyc3.cdn.digitaloceanspaces.com/games/banners/256.jpeg")',
        backgroundSize: 'cover'
    },
    imageSize: {
        minWidth: '150px',
        maxWidth: '228px'
    },
    colorWhite:{
        color: '#FFFFFF'
    },
    bottomLeft:{
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        fontSize: '0.75rem',
        textAlign: 'left',
        width: '100%',
        padding: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#FFFFFF'
    }
};

class Home extends Component {
	constructor(){
		super();
        
        this.state = {
            games: []
        }
	}
    
    componentDidMount(){
        setTimeout(() => {
            if(localStorage.getItem('email') === null){
                this.props.history.push('/403');
            }
        }, 1000);
        
        axios.get("https://us-central1-games-db-630c4.cloudfunctions.net/getGames")
        .then(response => {
            let games = response.data.map((game, index) => {
                return (
                     <div className="column" style={ styles.imageSize } key={ index }>
                        <Link to={`detail/${ game.id }`}>
                            <span className="is-primary is-top is-medium tooltip">
                                <figure className="card image imageFade item-shadow">
                                    <div className="text-container">
                                        <img alt="Super Mario Odyssey" data-src={ game.thumbnail } src={ game.thumbnail } lazy="loaded" /> 
                                        <div style={ styles.bottomLeft }>{ game.name }</div>
                                    </div>
                                </figure>
                            </span>
                        </Link>
                    </div>
                );
            });
            
            this.setState({games: games});
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    renderTrendingComponent(){
        if(this.state.games.length !== 0){
            return (
                <section className="section">
                    <div className="container">
                        <div>
                            <h1 className="title">Trending</h1>
                            <div className="columns is-multiline is-mobile is-centered">
                                { this.state.games }
                            </div>
                        </div>
                        <div className="section-break"></div>
                    </div>
                </section>
            );
        }
    }
    
	render() {
		return (
            <div>
                <Header 
                    email={ localStorage.getItem('email') }
                />
                
                <Content>
                    <section className="hero is-primary is-medium">
                        <div style={ styles.heroBody }>
                            <div className="hero-body">
                                <div className="container">
                                    <h1 className="title">Welcome to GamesDB!</h1>
                                    <h2 className="subtitle">All about video games.</h2>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    { this.renderTrendingComponent() }
                    
                </Content>
                
                <Footer />
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
        updateEmail: (email) => dispatch( userActions.updateEmail(email) )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);