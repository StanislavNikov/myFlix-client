import React from "react";
import axios from "axios";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { Col, Row } from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      loggedInStatus: "NOT_LOGGED_IN!",
      registered: false,
    };
  }

  /* componentDidMount() {
    axios
      .get("https://myflixxxdb.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("+++++++++");
  } */

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      /* loggedInStatus: 'LOGGED_IN', */
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get("https://myflixxxdb.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /* onRegister(registered) {
    this.setState({
      registered: true,
    });
  }   
  <RegistrationView onRegister={(reg) => this.onRegister(reg)} />*/

  render() {
    const { movies, selectedMovie, user, registered, loggedInStatus } =
      this.state;

    if (!user) {
      return (
        <>
          <h1>Status: {this.state.loggedInStatus}</h1>
          <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
          <RegistrationView />
        </>
      );
    }

    if (movies.length === 0) return <div className='main-view'></div>;

    return (
      <Row className='justify-content md-center main-view'>
        {selectedMovie ? (
          <Col md={8}>
            <MovieView
              movieData={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col md={3}>
              <MovieCard
                key={movie.__id}
                movieData={movie}
                onMovieClick={(movie) => {
                  this.setSelectedMovie(movie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
    );
  }
}

console.log("=========");

// "jsxSingleQuote": true - NOT WORKING!!!
