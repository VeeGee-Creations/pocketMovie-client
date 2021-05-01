import React, {useEffect} from 'react';
import {Row, Col, Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProfileView(props) {
    const {profile, onLogout} = props;
    const {Username, Email, Birthday} = profile;

    useEffect(() => {
            document.body.classList.add('no-header');

        return function cleanUp() {
            document.body.classList.remove('no-header');
        }
    }), [];

    const confirmDelete = () => {
        const token = localStorage.getItem('token');
        const deleteTrue = confirm('Your account will be deleted!\n\nThis action cannot be reversed!');
        if (deleteTrue === true) {
            return (
                axios.delete(`https://pocket-movies.herokuapp.com/users/`, {
                    headers: {Authorization: `Bearer ${token}`}
                })
                .then(res => {
                    onLogout(null);
                    window.open('/', '_self');k
                })
                .catch(err => console.error(err))
            );
        }
            return
        console.log(deleteTrue);
}

    return (
        <Row className="justify-content-md-center">
            <Col md={12}>
                <Card>
                    <Card.Body>
                        <Card.Title>Profile Details</Card.Title>
                        <Card.Text>{`Name: ${Username}`}</Card.Text>
                        <Card.Text>{`Email: ${Email}`}</Card.Text>
                        <Card.Text>{`Birthday: ${Birthday.substr(0, 10)}`}</Card.Text>
                            <Link to="/profile/update">
                            <Button block size="lg" variant="link">Edit</Button>
                            </Link>
                            <Button block size="lg" variant="danger" style={{marginTop: '60px'}} onClick={() => confirmDelete()}>Delete</Button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}