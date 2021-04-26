import React, {useState} from 'react';
import {Row, Col, Navbar, Nav, Form, FormControl, Button,} from 'react-bootstrap';

import './header.scss';

export default function Header(props) {
    const [searchParam, setSearchParam] = useState('');

    const handleLogout = () => props.onLogout(false);

    const handleSearch= (e) =>{
        e.preventDefault();
        const accessToken = localStorage.getItem('token');
        props.onSearch(searchParam, accessToken);
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand>
                <h2>Pocket Movies</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline className="ml-auto justify-content-md-center">
                    <FormControl type="text" placeholder="Search" value={searchParam} onChange={e => setSearchParam(e.target.value)} size="lg" className="mr=sm-2"/>
                    <Button type="submit" variant="outline-success" onClick={handleSearch}>Search</Button>
                </Form>
                <Nav className="ml-auto">
                    <Nav.Link href="#">Featured</Nav.Link>
                    <Nav.Link href="#">Directors</Nav.Link>
                    <Nav.Link href="#">Genres</Nav.Link>
                    <Button block size="md" onClick= {handleLogout}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}