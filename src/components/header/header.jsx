import React, {useState} from 'react';
import {Navbar, Nav, Form, FormControl, Button,} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import './header.scss';

export default function Header(props) {
    const [searchParam, setSearchParam] = useState('');
    const {onLogout, onSearch, user} = props;

    const handleLogout = () => onLogout(null);

    const handleSearch= (e) =>{
        e.preventDefault();
        const accessToken = localStorage.getItem('token');
        onSearch(searchParam, accessToken);
    }

    if(!user) return null
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="/">
                <h2>Pocket Movies</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline className="ml-auto justify-content-center align-items-center">
                    <FormControl type="text" placeholder="Search" value={searchParam} onChange={e => setSearchParam(e.target.value)} size="lg" className="mr=sm-2"/>
                    <Button type="submit" variant="outline-success" onClick={handleSearch}>Search</Button>
                </Form>
                <Nav className="ml-auto">
                    <Link to="/profile">
                        <Button block size="lg" variant="link">{user}</Button>
                    </Link>
                    <Button block size="md" onClick= {handleLogout}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}