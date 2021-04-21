import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default class MovieCard extends React.Component {
    render() {
        const {movie, onClick} = this.props;
        return (
            <Card>
                <Card.Img variant="top" src={movie.ImageURL}/>
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Synopsis}</Card.Text>
                    <Button onClick={() => onClick(movie)} variant="link">Open</Button>
                </Card.Body>
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
    onClick: PropTypes.func.isRequired
};