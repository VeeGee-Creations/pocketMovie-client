import React from 'react';
import axios from 'axios';
import {Row, Col, Spinner} from 'react-bootstrap';

import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import RegisterView from '../register-view/register-view';
import Header from '../header/header';

import './main-view.scss';

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
        const accessToken = localStorage.getItem('token');
        if(accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://pocket-movies.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => {
            this.setState({
                movies: res.data
            });
        })
        .catch(err => console.error(err));
    }
    
    onSearch(searchParams) {
        const token = localStorage.getItem('token');
        console.log(token);
        axios.get(`https://pocket-movies.herokuapp.com/movies/${searchParams}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => {
            console.log(res.data);
            this.setState({
                movies: res.data
            });
        })
        .catch(err => console.error(err));
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
            this.getMovies(authData.token);
    }

    onRegister(register) {
        this.setState({
            registered: register
        });
    }

    onLogout(setNull) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: setNull
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
            <div>
                <Header onLogout={setNull => this.onLogout(setNull)} onSearch={searchParams => this.onSearch(searchParams)}/>
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
            </div>
        );
    }
}