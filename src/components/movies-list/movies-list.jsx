import React, {useEffect} from 'react';
import {Col, Spinner} from 'react-bootstrap';
import {connect} from 'react-redux';

import MovieCard from '../movie-card/movie-card';

function MoviesList(props) {
    const {movies, visibilityFilter} = props;
    let filteredMovies = movies;
    const pathname = window.location.pathname
    
    useEffect(() => {
        if(pathname === '/favorites' && movies.length < 1) document.body.classList.add('no-header');
    
        return function cleanUp() {
            document.body.classList.remove('no-header');
        }
    }), [];
    
    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (pathname === '/favorites' && movies.length < 1) return <h1>Wow such empty!</h1>;
    if (pathname !== '/favorites' && movies.length < 1) return <Spinner animation="border" role="status"/>;

    return <>
        {filteredMovies.map((movie, index) => (
            <Col lg={4} md={6} sm={6} xs={12} key={index}>
                <MovieCard key={movie._id} movie={movie}/>
            </Col>
        ))}
    </>
}

const mapStateToProps = state => {
    return {
        visibilityFilter: state.visibilityFilter
    }
};

export default connect(mapStateToProps)(MoviesList);