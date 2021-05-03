import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import Dotdotdot from 'react-dotdotdot';
import {Link} from 'react-router-dom';

import './movie-card.scss';
export default class MovieCard extends React.Component {

    isFavorite() {
        const favMovie = this.props.favorites && this.props.favorites.find(fav => fav._id === this.props.movie._id);
        if(favMovie) return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="red"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16">
                <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
            </svg>
        );
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart"
                viewBox="0 0 16 16">
                <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                />
            </svg>
        );
    }

    handleFavorite() {
        // console.log('click')
        const favMovie = this.props.favorites && this.props.favorites.find(fav => fav._id === this.props.movie._id);
        if(favMovie) return this.props.removeFavorite(this.props.movie._id)
        return this.props.addFavorite(this.props.movie._id)
    }

    render() {
        const {movie, AddFavorites} = this.props;
        const {_id: ID, ImageURL, Title, Synopsis, Release} = movie;

        return (
            <Card className="movie-card pop">
                <Link className="link" to={`/movies/${ID}`}>
                        <Card.Img variant="top" src={ImageURL}/>
                        <Card.Body>
                            <Card.Title>{Title}</Card.Title>
                            <Dotdotdot clamp={5}>
                                <Card.Text>{Synopsis}</Card.Text>
                            </Dotdotdot>
                            <Card.Text style={{marginTop: '20px'}}>{`Release: ${Release}`}</Card.Text>
                        </Card.Body>
                </Link>
                <div className="overlay d-flex align-items-center justify-content-center" onClick={() => this.handleFavorite()}>
                    <AddFavorites isFavorite={this.isFavorite()}/>
                </div>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        ImageURL: PropTypes.string,
        Release: PropTypes.string,
    }).isRequired,
};