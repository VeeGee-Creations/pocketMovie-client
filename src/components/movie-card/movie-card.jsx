import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import Dotdotdot from 'react-dotdotdot';
import {Link} from 'react-router-dom';

import './movie-card.scss';

import AddFavorites from '../add-favorites/add-favorites';

export default class MovieCard extends React.Component {

    handleFavorite() {
        // console.log('click')
        const favMovie = this.props.favorites && this.props.favorites.find(fav => fav._id === this.props.movie._id);
        if(favMovie) return this.props.removeFavorite(this.props.movie._id)
        return this.props.addFavorite(this.props.movie._id)
    }

    render() {
        const {movie, favorites} = this.props;
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
                <div tabIndex="0" className="overlay d-flex align-items-center justify-content-center z-index-master" onClick={() => this.handleFavorite()}>
                    <AddFavorites movie={movie} favorites={favorites}/>
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