import React from 'react';
import PropTypes from 'prop-types';

const Button = ({type, children, onClick}) => {
  return (
    <button
      className={`btn ${type} btn-block`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
