import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createToken } from '../../authentication/tokenActions';
import Button from '../../../components/buttons/Button';
import { getCurrencies } from '../../../store/currenciesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const CreateInitialWalletButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.currencies.currencies.items);

  useEffect(() => {
    dispatch(getCurrencies());
  }, [])

  return (
    <Button type="btn-primary" onClick={() => navigate("/create-initial-wallet", {state: {token: createToken(), currencies: currencies}})}>
      Create wallet
    </Button>
  )
};

export default CreateInitialWalletButton;