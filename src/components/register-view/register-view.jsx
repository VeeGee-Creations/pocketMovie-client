import React, {useState} from 'react';
import PropTypes from 'prop-types';
import emailPropType from 'email-prop-type';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function RegisterView(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onRegister(true);
        console.log(username, email, password, birthday);
    };

    const validateForm = () => username.length > 0 && email.length > 0 && password.length > 0 && birthday.length > 0;

    return (
        <div className="Register">
            <h1>Pocket Movies</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control autoFocus type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control autoFocus type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group size="lg" controlId="birthday">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)}/>
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>Register</Button>
                <Button block size="lg" variant="link" onClick={() => props.onRegister(true)}>Return to Login</Button>
            </Form>
        </div>
    );
}

RegisterView.propTypes = {
    register: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: emailPropType.isRequired,
        password: PropTypes.string.isRequired,
        birthday: PropTypes.instanceOf(Date).isRequired
    }),
    onRegister: PropTypes.func.isRequired
};