import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getCurrencies } from '../../../store/currenciesSlice';
import { getWallet } from '../../../store/walletSlice';
import { useNavigate } from 'react-router-dom';
import { setCurrencyToUpdate } from '../../../store/popUpCurrencySlice';
import { createToken } from '../../authentication/tokenActions';
import { calculateValue } from '../currencyOperations';

const useMount = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrencies())
    dispatch(getWallet({userId: userId}))
  }, [])
}

const WalletGrid = ({userId}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.currencies).currencies;
  const wallet = useSelector((state) => state.wallet.wallet);
  useMount(userId);

  if (Object.keys(currencies).length > 0 && wallet !== undefined) {
    const mergeByCode = (currencies, wallet) =>
      currencies.map(currency => ({
      amount: wallet[currency.code],
        ...currency
    }));

    const sellCurrency = (currency) => {
      dispatch(setCurrencyToUpdate(currency));
      navigate("/sell-currencies", {state: {token: createToken()}});
    }
  
    const data = mergeByCode(currencies.items, wallet);

    return (
      <div className="table-responsive col-md-5">
        <table className="table table-bordered border-dark text-left mt-4">
          <thead>
            <tr>
              <th colSpan="5"><span className="navbar-brand mb-0"><h4>My Wallet</h4></span></th>
            </tr>
            <tr className="bg-secondary">
              <th scope="col-md-1">Currency</th>
              <th scope="col-md-2">Unit price</th>
              <th scope="col-md-3">Amount</th>
              <th scope="col-md-4">Value</th>
              <th scope="col-md-5">Actions</th>
            </tr>
          </thead>
          <tbody>
          {data.map((currency, index) => (
            <tr key={index} data-testid="list-item">
              <td scope="col-md-1">
                {currency.code}
              </td>
              <td scope="col-md-2">
                {currency.purchasePrice.toFixed(2)}
              </td>
              <td scope="col-md-3">
                {currency.amount}
              </td>
              <td scope="col-md-4">
                {calculateValue(currency.amount, currency.purchasePrice, currency.unit)}
              </td>
              <td scope="col-md-5">
                <button onClick={() => sellCurrency(currency)} className="btn btn-secondary btn-sm btn-block col-12">
                  Sell
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="5"></td>
          </tr>
          <tr>
            <td colSpan="5">
              Available: {wallet.availableMoney.toFixed(2)} PLN
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );    
  }

  return (
    <div>
      <h4>Loading data. Hold on.</h4>
    </div>
  )
}

export default WalletGrid;