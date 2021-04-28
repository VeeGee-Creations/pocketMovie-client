import React from 'react';
import axios from 'axios';
import {Row, Col, Spinner} from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
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
    
    onSearch(searchParams, token) {
        this.setState({movies: null});
        axios.get(`https://pocket-movies.herokuapp.com/movies/${searchParams}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => {
            this.setState({
                movies: res.data
            });
        })
        .catch(err => console.error(err));
    }

    onLoggedIn(authData) {
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

    render() {
        const {movies, user, registered} = this.state;

        if(!registered) return <RegisterView onRegister={register => this.onRegister(register)}/>;

        if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={register => this.onRegister(register)}/>;

        if(!movies) return <Spinner animation="border" role="status"/>;
        
        return(
            <Router>
                <Header onLogout={setNull => this.onLogout(setNull)} onSearch={(searchParams, accessToken) => this.onSearch(searchParams, accessToken)}/>
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        return movies.map((movie, index) => (
                            <Col md={3} sm={6} key={index}>
                                <MovieCard key={movie._id} movie={movie}/>
                            </Col>
                        ))
                    }}/>
                    <Route path="/movies/:movieID" render={({match, history}) => {
                        return <Col md={8}>
                        <MovieView movie={movies.find(movie => movie._id === match.params.movieID)} onBackClick={() => history.goBack()}/>
                    </Col>
                    }}/>
                    <Route path="/directors/:name" render={({match, history}) => {
                        return <Col md={8}>
                            <DirectorView director={movies.find(movie => movie.Directors.find(director => director.Name === match.params.name)).Directors} onBackClick={() => history.goBack()}/>
                        </Col>
                    }}/>
                    <Route path="/genres/:name" render={({match, history}) =>{
                        return <Col md={8}>
                            <GenreView genre={movies.find(movie => movie.Genres.find(genres => genres.Name === match.params.name)).Genres} onBackClick={() => history.goBack()}/>
                        </Col>
                    }}/>
                </Row>
            </Router>
        );
    }
}