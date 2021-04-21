import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './login-view.scss';
import { Form } from 'react-bootstrap';

export default function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onLoggedIn(username);
        console.log(username, password);
    };

    const handleRegister = () => {
        props.onRegister(false);
    };

    return (
        <Row className="justify-content-md-center h-100">
            <Col className="col-center" md="3">
                <form>
                    <div>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                    </label>
                    </div>
                    <div>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </label>
                    </div>
                    <Button type="submit" onClick={handleSubmit}>Login</Button>
                    <Button className="register-button" type="button" onClick= {handleRegister}>Register</Button>
                </form>
            </Col>
        </Row>
    )
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
};