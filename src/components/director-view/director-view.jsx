import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button } from 'react-bootstrap';


import './director-view.scss';

export default function DirectorView(props) {
    const [{Name, Birth, Death, Bio}] = props.director;
    const onBackClick = () => props.onBackClick();

    useEffect(() => {
        window.scrollTo(0, 0);
    }), [];

    const isDeath = (death) => {
            if(!death) return 'N/A';
            return death;
    }

    return(
        <Row className="justify-content-md-center">
            <Col md={9}>
        <Card style={{height: 'auto', marginBottom: '0'}}>
            <Card.Body>
                {console.log(Name)}
                <Card.Title>{Name}</Card.Title>
                <Card.Text>Birth: {Birth}</Card.Text>
                <Card.Text>Death: {isDeath(Death)}</Card.Text>
                <Card.Text>{Bio}</Card.Text>
                <Button onClick={onBackClick} variant="link">Back</Button>
            </Card.Body>
        </Card>
        </Col>
        </Row>
    );
}


DirectorView.propTypes = {
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