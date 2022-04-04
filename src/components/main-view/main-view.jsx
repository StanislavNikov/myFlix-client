import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, 
          Title: 'Star Wars', 
          Description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.', 
          ImagePath: 'https://www.imdb.com/title/tt0076759/mediaviewer/rm3263717120/' },
        { _id: 2, 
        Title: 'A Clockwork Orange', 
        Description: 'In the future, a sadistic gang leader is imprisoned and volunteers for a conduct-aversion experiment, but it doesn\'t go as planned.', ImagePath: 'https://www.imdb.com/title/tt0066921/mediaviewer/rm1351407872/' },
        { _id: 3, 
        Title: 'The Matrix', 
        Description: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth - the life he knows is the elaborate deception of an evil cyber-intelligence.', 
        ImagePath: 'https://www.imdb.com/title/tt0133093/mediaviewer/rm525547776/' }
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
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">This list is empty!</div>;
   
    return (      
      <div className="main-view">
        {selectedMovie
          ? <MovieView movieData={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
           <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />         
         ))
        }
      </div>
    )
  }   
}