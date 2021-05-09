import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import Dotdotdot from 'react-dotdotdot';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import {addFavorite, removeFavorite} from '../../actions/actions';


import './movie-card.scss';

import AddFavorites from '../add-favorites/add-favorites';

class MovieCard extends React.Component {

    addFavorite(id) {
        const token = localStorage.getItem('token');
        axios.post(`https://pocket-movies.herokuapp.com/users/favorites/push/${id}`,{}, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => {
            if(res.statusText === 'OK') {
                this.props.addFavorite(this.props.movie);
            }
        })
        .catch(err => console.error(err));
    }

    removeFavorite(id) {
        const token = localStorage.getItem('token');
        axios.post(`https://pocket-movies.herokuapp.com/users/favorites/pull/${id}`,{}, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => {
            if(res.statusText === 'OK') {
                const favIndex = this.props.favorites.findIndex(fav => fav._id === this.props.movie._id)
                this.props.removeFavorite(favIndex);
            }
        })
        .catch(err => console.error(err));
    }

    handleFavorite() {
        const favMovie = this.props.favorites.find(fav => fav._id === this.props.movie._id);
        if(favMovie) return this.removeFavorite(this.props.movie._id)
        return this.addFavorite(this.props.movie._id)
    }

    render() {
        const {movie} = this.props;
        const {_id: ID, ImageURL, Title, Synopsis, Release} = movie;

        return (
            <Card className="movie-card pop">
                <Link className="link" to={`/movies/${ID}`}>
                        <Card.Img variant="top" src={ImageURL}/>
                        <Card.Body>
                            <Card.Title>{Title}</Card.Title>
                            <Dotdotdot clamp={5}>
                                <Card.Text>{Synopsis}</Card.Text>
                            </Dotdotdot>
                            <Card.Text style={{marginTop: '20px'}}>{`Release: ${Release}`}</Card.Text>
                        </Card.Body>
                </Link>
                <div tabIndex="0" className="overlay d-flex align-items-center justify-content-center z-index-master" onClick={() => this.handleFavorite()}>
                    <AddFavorites movie={movie}/>
                </div>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        ImageURL: PropTypes.string,
        Release: PropTypes.string,
    }).isRequired,
};

let mapStateToProps = state => {
    return {
        movies: state.movies,
        favorites: state.favorites
    }
}

export default connect(mapStateToProps, {addFavorite, removeFavorite})(MovieCard);