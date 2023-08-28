import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./BuyCurrencies.module.css";
import Modal from "../../../components/modal/Modal";
import { buyCurrency } from "../../../store/walletSlice";
import { calculateValue } from "../currencyOperations";
import { getAuth0User } from "../../authentication/auth0Actions";
import { useEffect, useState } from "react";
import InputField from "../../../components/fields/InputField";

const validate = (values, currency) => {
  let errors = {};

  if (values.totalValue > values.availableMoney) {
    errors.totalValue = `You cannot afford that, available money: ${values.availableMoney.toFixed(2)} PLN`;
  }

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

  return errors;
}

function BuyCurrencies() {
  const navigate = useNavigate();
  const user = getAuth0User();
  const location = useLocation();
  const dispatch = useDispatch();
  const currency = location.state.currency;
  const availableMoney = useSelector((state) => state.wallet.wallet.availableMoney);
  const [errors, setErrors] = useState({});
  const [inputFields, setInputFields] = useState({
    sellPrice: currency.sellPrice,
    units: currency.unit,
    totalValue: calculateValue(currency.unit, currency.sellPrice, currency.unit),
    currencyCode: currency.code,
    availableMoney: availableMoney,
  });

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value, totalValue: calculateValue(e.target.value, currency.sellPrice, currency.unit)});
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(buyCurrency({values: inputFields, userId: user.sub}));
    navigate("..");
  }

  useEffect(() => {
    setErrors(validate(inputFields, currency));  
  }, [inputFields]);

  return (
    <Modal redirect="..">
      <form onSubmit={handleSubmit} className={classes.form}>
        <h5>{currency.name}</h5>
        <InputField label="Sell Price" name="sellPrice" type="number" value={currency.sellPrice.toFixed(2)} disabled={true} />
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

export default BuyCurrencies