import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button } from 'react-bootstrap';

import './genre-view.scss';

export default class GenreView extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        const {genre, onBackClick} = this.props;
        const [{Name, Description}] = genre;

        return(
            <Row className="justify-content-md-center">
                <Col md={9}>
            <Card style={{height: 'auto', marginBottom: '0'}}>
                <Card.Body>
                    <Card.Title>{Name}</Card.Title>
                    <Card.Text>{Description}</Card.Text>
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