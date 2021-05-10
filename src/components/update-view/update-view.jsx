import React, {useState} from 'react';
import {Row, Col, Button, Card, Form, Alert} from 'react-bootstrap';
import axios from 'axios';
import {connect} from 'react-redux';

import {setProfile} from '../../actions/actions';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

function UpdateView(props) {
    const {onBackClick, profile, setProfile} = props;
    const {Username, Email, Birthday} = profile;

    if(!Birthday) return window.open('/profile', '_self');

    const [username, setUsername] = useState( Username);
    const [email, setEmail] = useState(Email);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [birthday, setBirthday] = useState(Birthday.substr(0, 10));
    const [alertMessage, setAlertMessage] = useState('');
    const [alertShow, setAlertShow] = useState(false);
    const [alertVariant, setAlerVaiant] = useState('warning');
    const [usernameErr, setUsernameErr] = useState(null);
    const [emailErr, setEmailErr] = useState(null);
    const [passwordErr, setPasswordErr] = useState(null);
    const [password2Err, setPassword2Err] = useState(null);

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
    return(
        <div className="Profile">
                <Row className="justify-content-md-center">
        <Col md={12}>
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
                        <Button block size="lg" type="submit" disabled={!validateForm()}>Update</Button>
                        <Button block size="lg" variant="link" style={{marginTop: '0px'}} onClick={onBackClick}>Cancel</Button>
                    </Form>
                </Card.Body>
            </Card>
            {/* <Card>
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
            </Card> */}
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