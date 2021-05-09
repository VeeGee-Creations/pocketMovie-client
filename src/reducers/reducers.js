import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, SET_PROFILE, SET_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE, SET_GENRES, SET_DIRECTORS } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.movies;
        default:
            return state;
    }
}

function user(state = '', action) {
    switch (action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
}

function profile(state = {}, action) {
    switch (action.type) {
        case SET_PROFILE:
            return action.profile;
        default:
            return state;
    }
}

function favorites(state = [], action) {
    switch (action.type) {
        case SET_FAVORITES:
            return action.favorites;
        case ADD_FAVORITE:
            return [...state, action.movie];
        case REMOVE_FAVORITE:
            state.splice(action.index, 1);
            return [...state];
        default:
            return state;
    }
}

function genres(state = [], action) {
    switch (action.type) {
        case SET_GENRES:
            return action.genres;
        default: return state;
    }
}

function directors(state = [], action) {
    switch (action.type) {
        case SET_DIRECTORS:
            return action.directors;
        default: return state;
    }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user,
    profile,
    favorites,
    genres,
    directors
});

export default moviesApp;