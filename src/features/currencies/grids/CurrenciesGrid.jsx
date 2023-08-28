import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getCurrencies } from '../../../store/currenciesSlice';
import { useNavigate } from 'react-router-dom';
import { createToken } from '../../authentication/tokenActions';

const useMount = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrencies())
    setInterval(() => dispatch(getCurrencies()), 10000)
  }, [])
}

const CurrenciesGrid = () => {
  const navigate = useNavigate();
  const currencies = useSelector((state) => state.currencies.currencies);
  const isCurrenciesLoading = useSelector((state) => state.currencies.isLoading);
  const isCurrenciesError = useSelector((state) => state.currencies.isError);
  useMount();

  const buyCurrency = (currency) => {
    navigate("/buy-currencies", {state: {token: createToken(), currency: currency}});
  }

  if (isCurrenciesError) {
    return (
      <div>
        <h4>We couldn't reach remote server. Please try again later.</h4>
      </div>
    )
  }

  if (isCurrenciesLoading) {
    return (
      <div>
        <h4>Loading data. Hold on.</h4>
      </div>
    )
  }

  return (
    <>      
    <div className="table-responsive col-md-5">
      <table className="table table-bordered border-dark text-left mt-4">
        <thead>
          <tr>
            <th colSpan="4"><span className="navbar-brand mb-0"><h4>Currencies</h4></span></th>
          </tr>
          <tr className="bg-secondary">
            <th scope="col-md-1">Currency</th>
            <th scope="col-md-2">Unit</th>
            <th scope="col-md-3">Values</th>
            <th scope="col-md-4">Actions</th>
          </tr>
        </thead>
        <tbody>
        {currencies.items.map((currency, index) => (
          <tr key={index} data-testid="list-item">
            <td scope="col-md-1">
              {currency.code}
            </td>
            <td scope="col-md-2">
              {currency.unit}
            </td>
            <td scope="col-md-3">
              {(currency.sellPrice).toFixed(2)}
            </td>
            <td scope="col-md-5">
              <button onClick={() => buyCurrency(currency)} className="btn btn-secondary btn-sm btn-block col-12">
                Buy
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <div>
      <p>
        Last update: {new Date(currencies.publicationDate).toString()}
      </p>
    </div>
    </div> 
    </>
  );

}

export default CurrenciesGrid