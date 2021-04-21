import React from 'react';
import axios from 'axios';

import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import RegisterView from '../register-view/register-view';

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

    render() {
        const {movies, selectedMovie, user, registered} = this.state;

        if(!registered) return <RegisterView onRegister={register => this.onRegister(register)}/>;

        if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={register => this.onRegister(register)}/>;

        if(!movies) return <div className="main-view"/>;
        
        return(
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => this.onMovieClick(newSelectedMovie)}/>
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
                    ))
                }
            </div>
        );
    }
}