import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;

    return (
      <Card>
        <Card.Img
          style={{ width: '15rem' }}
          variant="top"
          src={movieData.ImageURL}
        />
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Button
            onClick={() => {
              onMovieClick(movieData);
            }}
            variant="link"
          >
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
