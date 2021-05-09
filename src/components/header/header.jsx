import React from 'react';
import {Navbar, Nav, Button,} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import {setUser} from '../../actions/actions';

import './header.scss';

function Header(props) {
    const {user, visibilityFilter, setUser} = props;

    const onLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser('');
        window.open('/', '_self');
    }

    if(user.length < 1) return null
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="/">
                <h2>Pocket Movies</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <VisibilityFilterInput visibilityFilter={visibilityFilter}/>
                <Nav className="ml-auto">
                    <Link to="/profile">
                        <Button block size="lg" variant="link">{user}</Button>
                    </Link>
                    <Link to="/favorites">
                        <Button block size="lg" variant="link">Favorites</Button>
                    </Link>
                    <Button block size="md" onClick= {onLogout}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = state => {
    return {
        visibilityFilter: state.visibilityFilter,
        user: state.user
    }
};

export default connect(mapStateToProps, {setUser})(Header);