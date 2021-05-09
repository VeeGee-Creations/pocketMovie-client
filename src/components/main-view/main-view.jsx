import React from 'react';
import axios from 'axios';
import {Row, Col, Spinner} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {setMovies, setUser, setFavorites, setProfile, setGenres, setDirectors} from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import LoginView from '../login-view/login-view';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import RegisterView from '../register-view/register-view';
import Header from '../header/header';
import ProfileView from '../profile-view/profile-view';
import UpdateView from '../update-view/update-view';

import './main-view.scss';

class MainView extends React.Component {

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        if(accessToken) {
            this.props.setUser(localStorage.getItem('user'));
            if(this.props.movies.length < 1) this.getMovies(accessToken);
            if(this.props.profile.length < 1 || this.props.favorites.length < 1) this.getProfile(accessToken);
            if(this.props.genres.length < 1) this.getGenres(accessToken);
            if(this.props.directors.length < 1) this.getDirectors(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://pocket-movies.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => {
            this.props.setMovies(res.data);
        })
        .catch(err => console.error(err));
    }

    onLoggedIn(authData) {

        this.props.setUser(authData.user.Username);

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
        this.getProfile(authData.token);
        this.getDirectors(authData.token);
        this.getGenres(authData.token);
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
            
            this.props.setProfile(profileData);
            this.props.setFavorites(favoritesData);

        })
        .catch(err => console.error(err));
    }

    getDirectors(token) {
        axios.get('https://pocket-movies.herokuapp.com/directors', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => {
            this.props.setDirectors(res.data);
        })
        .catch(err => console.error(err));
    }

    getGenres(token) {
        axios.get('https://pocket-movies.herokuapp.com/genres', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => {
            this.props.setGenres(res.data);
        })
        .catch(err => console.error(err));
    }
    
    render() {  
        const {user, movies, favorites, profile} = this.props;
        if(user.length < 1) document.body.classList.add('no-header');
        if(user.length > 0) document.body.classList.remove('no-header');
        return(
            <Router>
                <Header/>
                <Row className="main-view justify-content-center">
                    <Route exact path="/" render={() => {
                        if(user.length < 1) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                        return <MoviesList movies={movies}/>;
                    }}/>
                    <Route path="/register" render={({history}) => {
                        if(user.length > 0) return <Redirect to="/"/>
                        return <RegisterView onBackClick={() => history.goBack()}/>
                    }}/>
                    <Route path="/movies/:movieID" render={({match, history}) => {
                        if(user.length < 1) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                        if(movies.length < 1) return <Spinner animation="border" role="status"/>;
                        return <Col md={8}>
                        <MovieView movie={movies.find(movie => movie._id === match.params.movieID)} onBackClick={() => history.goBack()}/>
                    </Col>
                    }}/>
                    <Route path="/directors/:name" render={({match, history}) => {
                        if(user.length < 1) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                        if(movies.length < 1) return <Spinner animation="border" role="status"/>;
                        return <Col md={8}>
                            <DirectorView match={match} onBackClick={() => history.goBack()}/>
                        </Col>
                    }}/>
                    <Route path="/genres/:name" render={({match, history}) =>{
                        if(user.length < 1) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                        if(movies.length < 1) return <Spinner animation="border" role="status"/>;
                        return <Col md={8}>
                            <GenreView match={match} onBackClick={() => history.goBack()}/>
                        </Col>
                    }}/>
                    <Route exact path="/profile" render={({history}) =>{
                        if(user.length < 1) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                        if(profile.length < 1) return <Spinner animation="border" role="status"/>;
                        return <Col md={12}>
                            <ProfileView onBackClick={() => history.goBack()}/>
                        </Col>
                    }}/>
                    <Route exact path="/profile/update" render={({history}) =>{
                        if(user.length < 1) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                        if(profile.length < 1) return <Spinner animation="border" role="status"/>;
                        return <Col md={12}>
                            <UpdateView onBackClick={() => history.goBack()}/>
                        </Col>
                    }}/>
                    <Route exact path="/favorites" render={() => {
                        if(user.length < 1) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                        return <MoviesList movies={favorites}/>
                    }}/>
                </Row>
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user,
        profile: state.profile,
        favorites: state.favorites,
        genres: state.genres,
        directors: state.directors
    }
};

export default connect(mapStateToProps, {setMovies, setUser, setFavorites, setProfile, setGenres, setDirectors})(MainView);