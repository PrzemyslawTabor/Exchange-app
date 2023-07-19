import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getCurrencies } from '../store/currenciesSlice';
import { useNavigate } from 'react-router-dom';
import { setCurrencyToUpdate } from '../store/popUpCurrencySlice';
import { createToken } from '../utils/tokenActions';

const CurrenciesGrid = () => {
  const {currencies} = useSelector((state) => state.currencies);
  const dispatch = useDispatch();

  useEffect(() => {
    const dataFetch = async () => {
      await Promise.all([
        dispatch(getCurrencies())
      ]);
    }

    setInterval(() => dataFetch(), 10000)
  }, [])

  const navigate = useNavigate();
  const buyCurrency = (currency) => {
    dispatch(setCurrencyToUpdate(currency));
    navigate("/buy_currencies", {state: {token: createToken()}});
  }

  if (Object.keys(currencies).length > 0) {
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
  else {
    return (
      <div>
        <h4>Loading data. Hold on.</h4>
      </div>
    )
  }

}

export default CurrenciesGrid