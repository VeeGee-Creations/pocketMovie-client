export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_FAVORITES = 'SET_FAVORTIES';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const SET_GENRES = 'SET_GENRES';
export const SET_DIRECTORS = 'SET_DIRECTORS';

export function setMovies(movies) {
    return { type: SET_MOVIES, movies };
}

export function setFilter(value) {
    return { type: SET_FILTER, value };
}

export function setUser(user) {
    return { type: SET_USER, user };
}

export function setProfile(profile) {
    return { type: SET_PROFILE, profile };
}

export function setFavorites(favorites) {
    return { type: SET_FAVORITES, favorites };
}

export function addFavorite(movie) {
    return { type: ADD_FAVORITE, movie };
}

export function removeFavorite(index) {
    return { type: REMOVE_FAVORITE, index };
}

export function setGenres(genres) {
    return { type: SET_GENRES, genres };
}

export function setDirectors(directors) {
    return { type: SET_DIRECTORS, directors };
}