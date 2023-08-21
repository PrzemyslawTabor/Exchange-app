import React from 'react';

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

export default Button;

