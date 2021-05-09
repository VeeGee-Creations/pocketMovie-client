import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button } from 'react-bootstrap';
import {connect} from 'react-redux';

import './genre-view.scss';

function GenreView(props){
    const {match, onBackClick, genres} = props;
    const genre = genres.find(genre => genre.Name === match.params.name);
    const {Name, Description} = genre;

    useEffect(() => {
        document.body.classList.add('no-header');

        return function cleanUp() {
            document.body.classList.remove('no-header');
        }
    }), [];

    return(
        <Row className="justify-content-md-center">
            <Col md={9}>
        <Card style={{height: 'auto', marginBottom: '0'}}>
            <Card.Body>
                <Card.Title>{Name}</Card.Title>
                <Card.Text>{Description}</Card.Text>
                <Button onClick={onBackClick} variant="link">Back</Button>
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

let mapStateToProps = state => {
    return{
        genres: state.genres
    }
}

export default connect(mapStateToProps)(GenreView);