import React from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

export default class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                {
                    _id: '605fb65b036abe2b60c6e2a9',
                    Title: 'Odd Thomas',
                    Synopsis: 'In a California desert town, a short-order cook with clairvoyant abilities encounters a mysterious man with a link to dark, threatening forces.',
                    ImagePath: 'https://pocket-movies.herokuapp.com/covers/odd-thomas.jpg',
                    Director: 'Stephen Sommers',
                    Genres: ['Comedy', 'Fantasy', 'Horror']
                },
                {
                    _id: '605fb65b036abe2b60c6e2a8',
                    Title: 'John Dies at the End',
                    Synopsis: 'A new street drug that sends its users across time and dimensions has one drawback: some people return no longer human. Can two college drop-outs save humanity from this silent, otherworldly invasion?',
                    ImagePath: 'https://pocket-movies.herokuapp.com/covers/john-dies-at-the-end.jpg',
                    Director: 'Don Coscarelli',
                    Genres: ['Comedy', 'Fantasy', 'Horror']
                },
                {
                    _id: '605fb65b036abe2b60c6e2ae',
                    Title: 'The Hitchhiker\'s Guide to the Galaxy',
                    Synopsis: 'Mere seconds before the Earth is to be demolished by an alien construction crew, journeyman Arthur Dent is swept off the planet by his friend Ford Prefect, a researcher penning a new edition of "The Hitchhiker\'s Guide to the Galaxy."',
                    ImagePath: 'https://pocket-movies.herokuapp.com/covers/hitchhikers-guide-to-the-galaxy.jpg',
                    Director: 'Garth Jennings',
                    Genres: ['Adventure', 'Comedy', 'Sci-Fi']
                }
            ],
            selectedMovie: null
        }
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const {movies, selectedMovie} = this.state;

        if(movies.length === 0) return <div className="main-view">The list is empty!</div>;
        
        return(
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie);}}/>
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => {this.setSelectedMovie(movie)}}/>
                    ))
                }
            </div>
        );
    }
}