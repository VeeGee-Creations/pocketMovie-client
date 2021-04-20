import React from 'react';
import PropTypes from 'prop-types';

export default class MovieCard extends React.Component {
    render() {
        const {movie, onClick} = this.props;
        return <div className="movie-card" onClick={() => onClick(movie)}>
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
            </div>;
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        ImageURL: PropTypes.string,
        Release: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired
};