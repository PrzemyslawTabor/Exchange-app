import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createToken } from '../../authentication/tokenActions';

const CreateInitialWalletButton = () => {
  const navigate = useNavigate();

  return (
    <button className="btn btn-primary btn-block" onClick={() => navigate("/create-initial-wallet", {state: {token: createToken()}})}>
      Create wallet
    </button>
  );
};

export default CreateInitialWalletButton;