import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button } from 'react-bootstrap';

import './movie-view.scss';

export default class MovieView extends React.Component {

    render() {
        const {movie, onBackClick} = this.props;

        return(
            <Row className="main-view justify-content-md-center">
                <Col md={6}>
            <Card>
                <Card.Img src={movie.ImageURL}/>
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{`Release: ${movie.Release}`}</Card.Text>
                    <Card.Text>{`Synopsis: ${movie.Synopsis}`}</Card.Text>
                    <Card.Text>{`Directors: ${movie.Directors.map((director) => director.Name).join(', ')}`}</Card.Text>
                    <Card.Text>{`Actors: ${movie.Actors.map((actor) => actor.Name).join(', ')}`}</Card.Text>
                    <Card.Text>{`Genres: ${movie.Genres.map((genre) => genre.Name).join(', ')}`}</Card.Text>

                    <Button onClick={() => onBackClick(null)} variant="link">Back</Button>
                </Card.Body>
            </Card>
            </Col>
            </Row>
            // <div className="movie-view">
            //     <div className="movie-poster">
            //         <img src={movie.ImageURL}/>
            //     </div>
            //     <div className="movie-title">
            //         <span className="label">Title: </span>
            //         <span className="value">{movie.Title}</span>
            //     </div>
            //     <div className="movie-release">
            //         <span className="label">Release: </span>
            //         <span className="value">{movie.Release}</span>
            //     </div>
            //     <div className="movie-synopsis">
            //         <span className="label">Synopsis: </span>
            //         <span className="value">{movie.Synopsis}</span>
            //     </div>
            //     <div className="movie-directors">
            //         <span className="label">Directors: </span>
            //         <span className="value">{movie.Directors.map((director) => director.Name).join(', ')}</span>
            //     </div>
            //     <div className="movie-actors">
            //         <span className="label">Actors: </span>
            //         <span className="value">{movie.Actors.map((director) => director.Name).join(', ')}</span>
            //     </div>
            //     <div className="movie-genres">
            //         <span className="label">Genres: </span>
            //         <span className="value">{movie.Genres.map((genre) => genre.Name).join(', ')}</span>
            //     </div>
            //     <button onClick={() => onBackClick(null)}>Back</button>
            // </div>
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