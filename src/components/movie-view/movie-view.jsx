import React from 'react';
import PropTypes from 'prop-types';

export default class MovieView extends React.Component {

    render() {
        const {movie, onBackClick} = this.props;

        return(
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImageURL}/>
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-release">
                    <span className="label">Release: </span>
                    <span className="value">{movie.Release}</span>
                </div>
                <div className="movie-synopsis">
                    <span className="label">Synopsis: </span>
                    <span className="value">{movie.Synopsis}</span>
                </div>
                <div className="movie-directors">
                    <span className="label">Directors: </span>
                    <span className="value">{movie.Directors.map((director) => director.Name).join(', ')}</span>
                </div>
                <div className="movie-actors">
                    <span className="label">Actors: </span>
                    <span className="value">{movie.Actors.map((director) => director.Name).join(', ')}</span>
                </div>
                <div className="movie-genres">
                    <span className="label">Genres: </span>
                    <span className="value">{movie.Genres.map((genre) => genre.Name).join(', ')}</span>
                </div>
                <button onClick={() => onBackClick(null)}>Back</button>
            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        ImageURL: PropTypes.string,
        Release: PropTypes.string,
        Synopsis: PropTypes.string,
        Directors: PropTypes.array,
        Actors: PropTypes.array,
        Genres: PropTypes.array,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
}