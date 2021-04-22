import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Form} from 'react-bootstrap';

import './login-view.scss';

export default function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onLoggedIn(username);
        console.log(username, password);
    };

    const handleRegister = () => props.onRegister(false);

    const validateForm = () => username.length > 0 && password.length > 0;

    return (
        <div className="Login">
            <h1>Pocket Movies</h1>
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
                <Button block size="lg" variant="link" onClick= {handleRegister}>Register</Button>
            </Form>
        </div>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
};