import React, {useState} from 'react';
import {Row, Col, Button, Card, Form, Alert} from 'react-bootstrap';
import axios from 'axios';
import {connect} from 'react-redux';

import {setProfile} from '../../actions/actions';

function UpdateView(props) {
    const {onBackClick, profile, setProfile} = props;
    const {Username, Email, Birthday} = profile;

    if(!Birthday) return window.open('/profile', '_self');

    const [username, setUsername] = useState( Username);
    const [email, setEmail] = useState(Email);
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState(Birthday.substr(0, 10));
    const [alertMessage, setAlertMessage] = useState('');
    const [alertShow, setAlertShow] = useState(false);
    const [alertVariant, setAlerVaiant] = useState('warning');

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        axios.put('https://pocket-movies.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => {
            if(res.statusText === 'OK'){
                setProfile({
                    Username: username,
                    Password: password,
                    Email: email,
                    Birthday: birthday
                });
                window.open('/profile', '_self');
            }
        })
        .catch(e => {
            setAlertShow('show')
            setAlertMessage(e.response.data);
        });
    };
    
    const validateForm = () => username.length > 2 && email.length > 0 && password.length > 0 && birthday.length > 0;
    return(
        <div className="Profile">
                <Row className="justify-content-md-center">
        <Col md={12}>
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
                        <Form.Control autoFocus type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group size="lg" controlId="birthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)}/>
                    </Form.Group>
                    <div style={{display: 'flex'}}>
                        <Button block size="lg" type="submit" disabled={!validateForm()}>Update</Button>
                        <Button block size="lg" variant="link" style={{marginTop: '0px'}} onClick={onBackClick}>Cancel</Button>
                    </div>
                </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
        </div>
    );
}

let mapStateToProps = state => {
    return {
        profile: state.profile
    }
};

export default connect(mapStateToProps, {setProfile})(UpdateView);