import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      loggedInStatus: 'NOT_LOGGED_IN!'
    }
  }

  componentDidMount(){
    axios.get('https://myflixxxdb.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(registered) {
    this.setState({
      registered,
    });
  }
  

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (!user) {
      return (
        <>
          <h1>Status: {this.state.loggedInStatus}</h1>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          <RegistrationView onRegister={reg => this.onRegister(reg)} />
        </>
      )
    }      

    if (movies.length === 0) return <div className="main-view"></div>;
   
    return (      
      <div className="main-view">
        {selectedMovie
          ? <MovieView movieData={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
           <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); }} />         
         ))
        }
      </div>
    )
  }   
}