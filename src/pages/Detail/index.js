import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Content from '../../components/Content';
import Footer from '../../components/Footer';
import './style.css';

const styles = {
    colorWhite:{
        color: '#FFFFFF',
        textAlign: 'center'
    },
    gameThumbnail:{ 
        backgroundColor: '#FFFFFF', 
        padding: '5px'
    },
    alignLeft:{
        textAlign: 'left'
    },
    gameBackground:{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
    }
};

class Detail extends Component {
    
    componentDidMount(){
        setTimeout(() => {
            if(localStorage.getItem('email') === null){
                this.props.history.push('/403');
            }
        }, 1000);
        
        const { id } = this.props.match.params;
        
        axios.get(`https://us-central1-games-db-630c4.cloudfunctions.net/getGameDetails/${id}`)
        .then(response => {
            response.data.map((detail) => {
                this.setState({
                    name: detail.name,
                    thumbnail: detail.thumbnail,
                    description: detail.description,
                    background: detail.background,
                    genre: detail.genre,
                    publisher: detail.publisher,
                    review: detail.review
                });
            });  
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    renderGenre(){
        if(this.state.genre){
            return this.state.genre.map((genre, index) => {
                return (
                    <span className="tag is-dark genre-link has-text-success" key={ index }>
                        <a href="#" title="Action" className="has-text-success">{ genre }</a>
                    </span>
                )
            });
        }
    }
    
    renderReviews(){
        if(this.state.review){
            return this.state.review.slice(0).reverse().map((rev, index) => {
                return (
                    <div className="card" key={ index }>
                        <div className="card-content">
                            <div className="media">
                                <div className="media-content">
                                    <p className="title is-4">{ rev.name }</p>
                                </div>
                            </div>

                            <div className="content">
                                { rev.content }
                                <br />
                                <time>{ rev.datetime }</time>
                            </div>
                        </div>
                    </div>
                )
            });
        }
        else{
            return (
                <p>No one has reviewed this game yet.</p>
            );
        }
    }
    
    handleOnChangeText(text, state){
        this.setState({
            [state] : text
        });
    }
    
    renderContent(){
        if(this.state){
            
            return (
                <Content>
                    <section className="hero is-primary is-medium">
                        <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url( ${this.state.background} )` }}>
                            <div className="hero-body">
                                <div className="container is-clearfix" style={{ display:'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                                    <span>
                                        <h1 className="title" style={ styles.colorWhite }>
                                            { this.state.name }
                                        </h1>
                                        <h2 className="subtitle" style={ styles.colorWhite }>
                                            <i>Developed by : <a href="#" className="has-text-success" style={ styles.colorWhite }>{ this.state.publisher }</a></i>
                                        </h2>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <section className="section">
                        <div className="container is-clearfix">
                            <div className="cover-sidebar is-pulled-left is-hidden-touch" style={{ marginTop: '90px' }}>
                                <div className="card">
                                    <div className="card-image imageFade">
                                        <figure className="image" style={ styles.gameThumbnail }>
                                            <img alt={ this.state.name } className="imageFade" data-src={ this.state.thumbnail } src={ this.state.thumbnail } lazy="loaded" />
                                        </figure>
                                    </div>
                                </div>
                                <div className="break"></div>
                                <div className="cover-content" style={{ marginTop:'20px' }}>
                                    <div className="tags">
                                        
                                        { this.renderGenre() }
                                        
                                    </div>
                                    
                                    <h4>Also played this game</h4>
                                    <div className="columns is-multiline is-mobile">
                                        <div className="column is-4">
                                            <Link to="#">
                                                <div className="card image is-square username-hover profile-icon"><img alt="" title="Jojiejo" data-src="https://mythril.nyc3.cdn.digitaloceanspaces.com/users/avatars/default.jpg" src="https://mythril.nyc3.cdn.digitaloceanspaces.com/users/avatars/default.jpg" lazy="loaded" />
                                                    <div className="username-text"></div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="column is-4">
                                            <Link to="#" className="">
                                                <div className="card image is-square username-hover profile-icon"><img alt="" title="Djody Ramadhan" data-src="https://mythril.nyc3.cdn.digitaloceanspaces.com/users/avatars/default.jpg" src="https://mythril.nyc3.cdn.digitaloceanspaces.com/users/avatars/default.jpg" lazy="loaded" />
                                                    <div className="username-text"></div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="column is-4">
                                            <Link to="#" className="">
                                                <div className="card image is-square username-hover profile-icon"><img alt="" title="djodyramadhan" data-src="https://mythril.nyc3.cdn.digitaloceanspaces.com/users/avatars/default.jpg" src="https://mythril.nyc3.cdn.digitaloceanspaces.com/users/avatars/default.jpg" lazy="loaded" />
                                                    <div className="username-text"></div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="cover-content right-content" style={{ marginTop:'-10px' }}>
                                <div className="content" style={ styles.alignLeft }>
                                    <h2>Description</h2>
                                    <p>{ this.state.description }</p>
                                </div>
                                
                                <div className="content" style={ styles.alignLeft }>
                                    <h2>Recent Reviews</h2>
                                    
                                    { this.renderReviews() }
                                    
                                </div>
                                
                                <div className="content" style={ styles.alignLeft }>
                                    <h2>Write a Review</h2>
                                    
                                    <div className="container" style={{ width:'inherit', marginTop:'30px' }}>
                                        <textarea className="textarea" placeholder="e.g. Hello world" onChange={ (e) => this.handleOnChangeText(e.target.value, 'type') }></textarea>
                                    </div>
                                    
                                    <button className="button is-success is-pulled-right" style={{ marginTop:'10px' }} >Success</button>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </section>
                </Content>
            )
        }
    }
	
	render() {
		return (
            <div>
                <Header
                    email={ localStorage.getItem('email') }
                />
                
                { this.renderContent() }
                
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
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
