import React, {useRef} from 'react';
import axios from 'axios';
import {Row, Col, Spinner} from 'react-bootstrap';

import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import RegisterView from '../register-view/register-view';

import './main-view.scss'

export default class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: null,
            selectedMovie: null,
            user: null,
            registered: true,
            scrollPosition: 0,
        };
    }

    componentDidMount() {

        axios.get('https://pocket-movies.herokuapp.com/movies')
        .then(res => {
            this.setState({
                movies: res.data
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    onRegister(register) {
        this.setState({
            registered: register
        });
    }

    setScrollPosition(position) {
        this.setState({scrollPosition: position});
    }

    render() {
        const {movies, selectedMovie, user, registered, scrollPosition} = this.state;

        if(!registered) return <RegisterView onRegister={register => this.onRegister(register)}/>;

        if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={register => this.onRegister(register)}/>;

        if(!movies) return <Spinner animation="border" role="status"/>;
        
        return(
            <Row className="main-view justify-content-md-center">
                {selectedMovie 
                    ? (
                        <Col md={8}>
                            <MovieView movie={selectedMovie} scrollPosition={scrollPosition} onBackClick={newSelectedMovie => this.onMovieClick(newSelectedMovie)}/>
                        </Col>
                    )
                    : movies.map((movie, index) => (
                        <Col md={3} sm={6} key={index}>
                            <MovieCard key={movie._id} movie={movie} onClick={movie => {this.setScrollPosition(window.pageYOffset); this.onMovieClick(movie)}}/>
                        </Col>
                    ))
                }
            </Row>
        );
    }
}