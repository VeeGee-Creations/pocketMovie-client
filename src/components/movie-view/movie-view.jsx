import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import './movie-view.scss';

export default function MovieView(props) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const movie = props.movie;
    const {Title, Release, Synopsis, Directors, Actors, Genres, ImageURL} = movie;
    const onBackClick = () => props.onBackClick();

    return(
        <Row className="main-view justify-content-md-center">
            <Col md={9}>
        <Card style={{height: 'auto', marginBottom: '0'}}>
            <Card.Img src={ImageURL}/>
            <Card.Body>
                <Card.Title>{Title}</Card.Title>
                <Card.Text>{`Release: ${Release}`}</Card.Text>
                <Card.Text>{`Synopsis: ${Synopsis}`}</Card.Text>
                <Card.Text>Directors: {Directors.map((director, index) => (<Link key={index} className="movie-view-link" to={`/directors/${director.Name}`}>{director.Name}</Link>)).reduce((prev, curr) => [prev, ', ', curr])}</Card.Text>
                <Card.Text>Actors: {Actors.map((actor, index) => (<Link key={index} className="link" to={`/actors/${actor.Name}`}>{actor.Name}</Link>)).reduce((prev, curr) => [prev, ', ', curr], '')}</Card.Text>
                <Card.Text>Genres: {(Genres.map((genre, index) => (<Link key={index} className="movie-view-link" to={`/genres/${genre.Name}`}>{genre.Name}</Link>))).reduce((prev, curr) => [prev, ', ', curr])}</Card.Text>
                <Button onClick={onBackClick} variant="link">Back</Button>
            </Card.Body>
        </Card>
        </Col>
        </Row>
    );
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
    onBackClick: PropTypes.func,
}