import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button } from 'react-bootstrap';

import './movie-view.scss';

export default class MovieView extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        const {movie, onBackClick} = this.props;

        return(
            <Row className="main-view justify-content-md-center">
                <Col md={9}>
            <Card style={{height: 'auto', marginBottom: '0'}}>
                <Card.Img src={movie.ImageURL}/>
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{`Release: ${movie.Release}`}</Card.Text>
                    <Card.Text>{`Synopsis: ${movie.Synopsis}`}</Card.Text>
                    <Card.Text>{`Directors: ${movie.Directors.map((director) => director.Name).join(', ')}`}</Card.Text>
                    <Card.Text>{`Actors: ${movie.Actors.map((actor) => actor.Name).join(', ')}`}</Card.Text>
                    <Card.Text>{`Genres: ${movie.Genres.map((genre) => genre.Name).join(', ')}`}</Card.Text>

                    <Button onClick={() => {onBackClick(null); window.scrollTo(0, 0)}} variant="link">Back</Button>
                </Card.Body>
            </Card>
            </Col>
            </Row>
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