import React, {useState} from 'react';
import PropTypes from 'prop-types';
import emailPropType from 'email-prop-type';
import {Form, Button, Card, Alert, InputGroup} from 'react-bootstrap';
import axios from 'axios';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

export default function RegisterView(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [birthday, setBirthday] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertShow, setAlertShow] = useState(false);
    const [alertVariant, setAlerVaiant] = useState('warning');
    const [usernameErr, setUsernameErr] = useState(null);
    const [emailErr, setEmailErr] = useState(null);
    const [passwordErr, setPasswordErr] = useState(null);
    const [password2Err, setPassword2Err] = useState(null);

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

    const handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;

        switch(name) {
            case 'username':
                const usernameTest = value.length < 3 ? 'Minimum 3 characters required' : null;
                setUsernameErr(usernameTest);
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                const emailTest = emailRegex.test(value) ? null : 'Invalid Email Address';
                setEmailErr(emailTest);
                break;
            case 'password':
                if(value.length > 0) setPasswordErr(null);
                const password2Retest = value === password2 ? null : 'Passwords must match';
                setPassword(value);
                setPassword2Err(password2Retest);
                break;
            case 'password2':
                const passwordTest = value.length > 0 && password.length < 1 ? 'Password is required' : null;
                const password2Test = value === password ? null : 'Passwords must match';
                setPassword2(value)
                setPasswordErr(passwordTest);
                setPassword2Err(password2Test);
                break;
            case 'birthday':
                setBirthday(value);
            default:
                break;
        }

    }

        const validateForm = () => username.length > 0 && !usernameErr && email.length > 0 && !emailErr && password.length > 0 && !passwordErr && password2.length > 0 && !password2Err && birthday.length > 0;

        return (
            <div className="Register">
            <h1>Pocket Movies</h1>
            <Alert className="alert" role="alert alert-warning" variant={alertVariant} show={alertShow} onClose={() => setAlertShow(false)} dismissible>{alertMessage}</Alert>
            <Card>
                <Card.Body>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group size="lg" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control className={usernameErr ? 'is-invalid' : null} autoFocus name="username" type="text" value={username} onChange={handleChange}/>
                            <small className="text-danger">{usernameErr}</small>
                        </Form.Group>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className={emailErr ? 'is-invalid' : null} type="email" name="email" value={email} onChange={handleChange}/>
                            <small className="text-danger">{emailErr}</small>
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className={passwordErr ? 'is-invalid' : null} type="password" name="password" value={password} onChange={handleChange}/>
                            <small className="text-danger">{passwordErr}</small>
                        </Form.Group>
                        <Form.Group size="lg" controlId="password2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control className={password2Err ? 'is-invalid' : null} type="password" name="password2" value={password2} onChange={handleChange} validated='true'/>
                            <small className="text-danger">{password2Err}</small>
                        </Form.Group>
                        <Form.Group size="lg" controlId="birthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="date" name="birthday" value={birthday} onChange={handleChange}/>
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