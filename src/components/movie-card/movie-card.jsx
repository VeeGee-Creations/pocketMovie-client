import React from 'react';

export default class MovieCard extends React.Component {
    render() {
        const {movie, onMovieClick} = this.props;
        return <div className="movie-card" onClick={() => {onMovieClick(movie);}}>
            <img src={movie.ImagePath}/>
            <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
            </div>
            </div>;
    }
}