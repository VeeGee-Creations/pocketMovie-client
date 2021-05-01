import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import Dotdotdot from 'react-dotdotdot';
import {Link} from 'react-router-dom';

import './movie-card.scss';

export default class MovieCard extends React.Component {
    render() {
        const {movie} = this.props;
        const {_id: ID, ImageURL, Title, Synopsis, Release} = movie;
        return (
            <Link className="link" to={`/movies/${ID}`}>
                <Card className="movie-card pop">
                    <Card.Img variant="top" src={ImageURL}/>
                    <Card.Body>
                        <Card.Title>{Title}</Card.Title>
                        <Dotdotdot clamp={5}>
                            <Card.Text>{Synopsis}</Card.Text>
                        </Dotdotdot>
                        <Card.Text style={{marginTop: '20px'}}>{`Release: ${Release}`}</Card.Text>
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