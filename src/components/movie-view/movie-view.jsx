import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="movie-view">
        <Card className="movie-card align-items-center">
          <a href={movie.ImageURL} target="_blank">
            <Card.Img
              className="movie-img"
              style={{ width: "20rem" }}
              variant="top"
              src={movie.ImageURL}
            />
          </a>
          <Card.Body className="d-flex flex-column">
            <Card.Img></Card.Img>
            <Card.Title className="movie-title align-self-center mb-3 fs-4">
              {movie.Title}
            </Card.Title>
            <Card.Text className="movie-description mb-0">
              <b>Description:</b> {movie.Description}
            </Card.Text>

            <Card.Text className="movie-director mb-0">
              <b>Director:</b>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button
                  className="text-decoration-none"
                  style={{
                    verticalAlign: "baseline",
                  }}
                  variant="link"
                >
                  {movie.Director.Name}
                </Button>
              </Link>
            </Card.Text>

            <Card.Text className="movie-genre mb-0">
              <b>Genre: </b>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button
                  className="text-decoration-none"
                  style={{
                    verticalAlign: "baseline",
                  }}
                  variant="link"
                >
                  {movie.Genre.Name}
                </Button>
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>

        <Button
          onClick={() => {
            onBackClick();
          }}
        >
          Back
        </Button>
      </Row>
    );
  }
}

// =======================================================
{
  /* <div className="movie-img">
          <img src={movie.ImageURL} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div> */
}
