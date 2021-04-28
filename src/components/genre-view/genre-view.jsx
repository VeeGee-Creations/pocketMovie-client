import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import './genre-view.scss';

export default class GenreView extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        const {genre, onBackClick} = this.props;

        return(
            <Row className="justify-content-md-center">
                <Col md={9}>
            <Card style={{height: 'auto', marginBottom: '0'}}>
                <Card.Body>
                    <Card.Title>{genre.map(genre => genre.Name)}</Card.Title>
                    <Card.Text>{genre.map(genre => genre.Description)}</Card.Text>
                    <Button onClick={() => onBackClick()} variant="link">Back</Button>
                </Card.Body>
            </Card>
            </Col>
            </Row>
        );
    }
}

GenreView.propTypes = {
    // movie: PropTypes.shape({
    //     Title: PropTypes.string,
    //     ImageURL: PropTypes.string,
    //     Release: PropTypes.string,
    //     Synopsis: PropTypes.string,
    //     Directors: PropTypes.array,
    //     Actors: PropTypes.array,
    //     Genres: PropTypes.array,
    // }).isRequired,
    onBackClick: PropTypes.func,
}