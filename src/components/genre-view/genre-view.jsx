import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button } from 'react-bootstrap';

import './genre-view.scss';

export default function GenreView(props){
    const {genre, match, onBackClick} = props;

    useEffect(() => {
        document.body.classList.add('no-header');

        return function cleanUp() {
            document.body.classList.remove('no-header');
        }
    }), [];

    const filterGenre = () => { 
        const data = genre.find(genre => genre.Name == match);
        return data;
    }

    const genreData = filterGenre();

    return(
        <Row className="justify-content-md-center">
            <Col md={9}>
        <Card style={{height: 'auto', marginBottom: '0'}}>
            <Card.Body>
                <Card.Title>{genreData.Name}</Card.Title>
                <Card.Text>{genreData.Description}</Card.Text>
                <Button onClick={() => onBackClick()} variant="link">Back</Button>
            </Card.Body>
        </Card>
        </Col>
        </Row>
    );
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