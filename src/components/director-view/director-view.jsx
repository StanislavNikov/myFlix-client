import React from "react";
import PropTypes from "prop-types";
import { Row, Button } from "react-bootstrap";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Row className="director-view justify-content-md-center">
        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{director.Name}</span>
        </div>
        <div className="director-biography">
          <span className="label">Biography: </span>
          <span className="value">{director.Biography}</span>
        </div>
        <div className="director-date">
          <span className="label">Date of birth: </span>
          <span className="value">{director["Date of birth"]}</span>
        </div>

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

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Biography: PropTypes.string.isRequired,
    "Date of birth": PropTypes.string.isRequired,
  }).isRequired,

  onBackClick: PropTypes.func.isRequired,
};
