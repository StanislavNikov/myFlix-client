import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="movie-view justify-content-md-center">
        <div className="movie-img">
          <img src={movie.ImageURL} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <Button
          onClick={() => {
            onBackClick();
          }}
        >
          Back
        </Button>

        <Link to={`/directors/${movie.Director.Name}`}>
          <Button style={{ textDecoration: "none" }} variant="link">
            Director
          </Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button style={{ textDecoration: "none" }} variant="link">
            Genre
          </Button>
        </Link>
      </Row>
    );
  }
}
