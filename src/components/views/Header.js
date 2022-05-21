import React from "react";
import PropTypes from "prop-types";
import "styles/views/Header.scss";


const Header = props => (
  <div className="header container" style={{height: props.height}}>
    <div className="header uno">UNO</div>
    <div className="header extreme">EXTREME</div>
  </div>
);

Header.propTypes = {
  height: PropTypes.string
};

export default Header;
