import React from 'react';
import axios from 'axios';
import {Row, Col, Spinner} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import RegisterView from '../register-view/register-view';
import Header from '../header/header';
import ProfileView from '../profile-view/profile-view';
import UpdateView from '../update-view/update-view';

import './main-view.scss';

export default class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: null,
            user: null,
            profile: null,
            favorites: null,
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        if(accessToken) {
            this.setState({
                user: localStorage.getItem('user')
            });
        }
        if(!this.movies) this.getMovies(accessToken);
        if(!this.profile || !this.favorites) this.getProfile(accessToken);
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
            user: authData.user.Username,
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
        this.getProfile(authData.token);
    }

    onLogout(setNull) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: setNull,
        });
    }

    getProfile(token){
        axios.get('https://pocket-movies.herokuapp.com/users/profile', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => {
            const profileData = {
                Username: res.data.Username,
                Email: res.data.Email,
                Birthday: res.data.Birthday
            };
            const favoritesData = res.data.Favorites;
            
            this.setState({
                profile: profileData,
                favorites: favoritesData
            });
        })
        .catch(err => console.error(err));
    }

    addFavorite(id) {
        const token = localStorage.getItem('token');
        axios.post(`https://pocket-movies.herokuapp.com/users/favorites/push/${id}`,{}, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => {
            this.getProfile(token);
        })
        .catch(err => console.error(err));
    }

    removeFavorite(id) {
        const token = localStorage.getItem('token');
        axios.post(`https://pocket-movies.herokuapp.com/users/favorites/pull/${id}`,{}, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => {
            this.getProfile(token);
        })
        .catch(err => console.error(err));
    }
    
    render() {  
        const {user, movies, profile, favorites} = this.state; 
        if(!user) document.body.classList.add('no-header');
        if(user) document.body.classList.remove('no-header');
        return(
            <Router>
                <Header user={user} onLogout={setNull => this.onLogout(setNull)} onSearch={(searchParams, accessToken) => this.onSearch(searchParams, accessToken)}/>
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                        if(!movies) return <Spinner animation="border" role="status"/>;
                        return movies.map((movie, index) => (
                            <Col md={3} sm={6} key={index}>
                                <MovieCard key={movie._id} movie={movie} favorites={favorites} addFavorite={movieID => this.addFavorite(movieID)} removeFavorite={movieID => this.removeFavorite(movieID)}/>
                            </Col>
                        ))
                    }}/>
                    <Route path="/register" render={({history}) => {
                        if(user) return <Redirect to="/"/>
                        return <RegisterView onBackClick={() => history.goBack()}/>
                    }}/>
                    <Route path="/movies/:movieID" render={({match, history}) => {
                        if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                        if(!movies) return <Spinner animation="border" role="status"/>;
                        return <Col md={8}>
                        <MovieView movie={movies.find(movie => movie._id === match.params.movieID)} onBackClick={() => history.goBack()}/>
                    </Col>
                    }}/>
                    <Route path="/directors/:name" render={({match, history}) => {
                        if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                        if(!movies) return <Spinner animation="border" role="status"/>;
                        return <Col md={8}>
                            <DirectorView director={movies.find(movie => movie.Directors.find(director => director.Name === match.params.name)).Directors} onBackClick={() => history.goBack()}/>
                        </Col>
                    }}/>
                    <Route path="/genres/:name" render={({match, history}) =>{
                        if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                        if(!movies) return <Spinner animation="border" role="status"/>;
                        return <Col md={8}>
                            <GenreView genre={movies.find(movie => movie.Genres.find(genre => genre.Name === match.params.name)).Genres} match={match.params.name} onBackClick={() => history.goBack()}/>
                        </Col>
                    }}/>
                    <Route exact path="/profile" render={({history}) =>{
                        if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                        if(!profile) return <Spinner animation="border" role="status"/>;
                        return <Col md={12}>
                            <ProfileView profile={profile} onLogout={setNull => this.onLogout(setNull)} onBackClick={() => history.goBack()}/>
                        </Col>
                    }}/>
                    <Route exact path="/profile/update" render={({history}) =>{
                        if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                        if(!profile) return <Spinner animation="border" role="status"/>;
                        return <Col md={12}>
                            <UpdateView profile={profile} onBackClick={() => history.goBack()}/>
                        </Col>
                    }}/>
                    <Route exact path="/favorites" render={() => {
                        if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                        if(!favorites) return <Spinner animation="border" role="status"/>;
                        return favorites.map((movie, index) => (
                            <Col md={3} sm={6} key={index}>
                                <MovieCard key={movie._id} movie={movie} favorites={favorites} addFavorite={movieID => this.addFavorite(movieID)} removeFavorite={movieID => this.removeFavorite(movieID)}/>
                            </Col>
                        ))
                    }}/>
                </Row>
            </Router>
        );
    }
}