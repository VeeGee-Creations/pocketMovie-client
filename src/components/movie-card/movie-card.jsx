import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import Dotdotdot from 'react-dotdotdot';
import {Link} from 'react-router-dom';

import './movie-card.scss';

export default class MovieCard extends React.Component {
    render() {
        const {movie} = this.props;
        return (
            <Link className="link" to={`/movies/${movie._id}`}>
            <Card className="pop">
                <Card.Img variant="top" src={movie.ImageURL}/>
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Dotdotdot clamp={5}>
                        <Card.Text>{movie.Synopsis}</Card.Text>
                    </Dotdotdot>
                    <Card.Text style={{marginTop: '20px'}}>{`Release: ${movie.Release}`}</Card.Text>
                </Card.Body>
            </Card>
            </Link>
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