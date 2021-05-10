import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Form, Alert} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';

import './login-view.scss';

export default function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertShow, setAlertShow] = useState(false);
    const [alertVariant, setAlerVaiant] = useState('warning');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://pocket-movies.herokuapp.com/login',{}, {params:{
            Username: username,
            Password: password
        }})
        .then(res => {
            const data = res.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            if(e.response.status === 400) {
                return (
                    setAlertShow(true),
                    setAlertMessage('Username or Password is incorrect')
                );
            }
            console.error(e.response.data)
        });
    };

    const validateForm = () => username.length > 2 && password.length > 0;

    return (
        <div className="Login">
            <h1>Pocket Movies</h1>
            <Alert className="alert" role="alert alert-warning" variant={alertVariant} show={alertShow} onClose={() => setAlertShow(false)} dismissible>{alertMessage}</Alert>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group size="lg" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control autoFocus type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button block size="lg" type="submit" disabled={!validateForm()}>Login</Button>
                        <Link to="/register">
                        <Button block size="lg" variant="link">Register</Button>
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired
};