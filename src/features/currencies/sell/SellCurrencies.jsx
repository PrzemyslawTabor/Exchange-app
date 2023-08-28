import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/modal/Modal";
import classes from "../buy/BuyCurrencies.module.css";
import { sellCurrency } from "../../../store/walletSlice";
import { calculateValue } from "../currencyOperations";
import { getAuth0User } from "../../authentication/auth0Actions";
import { useEffect, useState } from "react";
import InputField from "../../../components/fields/InputField";

const validate = (values, currency) => {
  let errors = {};

  if (!values.units) {
    errors.units = "Field is required";
  } 

  if (values.units <= 0) {
    errors.units = "Units number must be higher then 0";
  } 

  if (isNaN(Number(values.units))) {
    errors.units = "Units number must be an integer";
  } 

  if (Math.round(values.units % currency.unit) / currency.unit !== 0) {
    errors.units = `Must be an increment of ${currency.unit}`;
  } 

  if (values.amount < values.units) {
    errors.units = "You don't have that much of the currency"
  }

  return errors;
}

function SellCurrencies() {
  const navigate = useNavigate();
  const user = getAuth0User();
  const location = useLocation();
  const dispatch = useDispatch();
  const currency = location.state.currency;
  const amount = useSelector((state) => state.wallet.wallet[currency.code]);
  const [errors, setErrors] = useState({});
  const [inputFields, setInputFields] = useState({
    purchasePrice: currency.purchasePrice.toFixed(2),
    units: currency.unit,
    totalValue: calculateValue(currency.unit, currency.purchasePrice, currency.unit),
    currencyCode: currency.code,
    amount: amount,
  });

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value, totalValue: calculateValue(e.target.value, currency.purchasePrice, currency.unit)});
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(sellCurrency({values: inputFields, userId: user.sub}));
    navigate("..");
  }

  useEffect(() => {
    setErrors(validate(inputFields, currency));  
  }, [inputFields]);

  return (
    <Modal redirect="..">
      <form onSubmit={handleSubmit} className={classes.form}>
        <h5>{currency.name}</h5>
        <InputField label="Purchase Price" name="purchasePrice" type="number" value={currency.purchasePrice.toFixed(2)} disabled={true} />
        <InputField label="Units" name="units" type="number" value={inputFields.units} step={currency.unit} onChange={handleChange} error={errors.units} />
        <InputField label="Total value" name="totalValue" type="number" value={inputFields.totalValue} disabled={true} error={errors.totalValue} />
        <p className="mt-2">
          <Link to="/" type="button" className="btn btn-outline-lightt">Cancel</Link>  
          <button className="btn btn-secondary" disabled={Object.keys(errors).length > 0}>Submit</button>  
        </p>
      </form>
    </Modal>
  );
}

export default SellCurrencies