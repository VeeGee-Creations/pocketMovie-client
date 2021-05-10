import React, {useState} from 'react';
import PropTypes from 'prop-types';
import emailPropType from 'email-prop-type';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import axios from 'axios';


export default function RegisterView(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertShow, setAlertShow] = useState(false);
    const [alertVariant, setAlerVaiant] = useState('warning');
    const {onBackClick} = props;


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://pocket-movies.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
        .then(res => {
            window.open('/', '_self');
        })
        .catch(e => {
            setAlertShow('show')
            setAlertMessage(e.response.data);
        });
    };

    const validateForm = () => username.length > 2 && email.length > 0 && password.length > 0 && birthday.length > 0;

    return (
        <div className="Register">
            <h1>Pocket Movies</h1>
            <Alert className="alert" role="alert alert-warning" variant={alertVariant} show={alertShow} onClose={() => setAlertShow(false)} dismissible>{alertMessage}</Alert>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group size="lg" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control autoFocus type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                            <small id="usernameHelp" className="form-text text-muted">Minimum 3 characters</small>
                        </Form.Group>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group size="lg" controlId="birthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)}/>
                        </Form.Group>
                        <Button block size="lg" type="submit" disabled={!validateForm()}>Register</Button>
                        <Button block size="lg" variant="link" onClick={onBackClick}>Login</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

RegisterView.propTypes = {
    register: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: emailPropType.isRequired,
        password: PropTypes.string.isRequired,
        birthday: PropTypes.instanceOf(Date).isRequired
    })
};