import React from "react";
import "./CircleButton.css";
import PropTypes from "prop-types";

CircleButton.propTypes = {
  onClick: PropTypes.func,
};

CircleButton.propDefault = {
  onClick: null,
};

function CircleButton(props) {
  return (
    <div className="circle-button" onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default CircleButton;
