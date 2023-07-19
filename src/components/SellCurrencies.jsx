import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./BuyCurrencies.module.css";
import Modal from "../components/Modal";
import { Field, reduxForm } from "redux-form";
import { updateWallet } from "../store/walletSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { isSpecialIncrementCurrency, calculateValue } from "../utils/currencyOperations";

const validate = values => {
  const errors = {};

  if (!values.units) {
    errors.units = "Field is required";
  } else if (values.units <= 0) {
    errors.units = "Units number must be higher then 0";
  } else if (isNaN(Number(values.units))) {
    errors.units = "Units number must be an integer";
  } else if (isSpecialIncrementCurrency(values.currencyCode) && (Math.round(values.units % 100) / 100) !== 0) {
    errors.units = "Must be an increment of 100";
  } else if (values.amount < values.units) {
    errors.units = "You don't have that much of the currency"
  }

  return errors;
}

const renderField = ({ input, label, type, disabled, step, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} disabled={disabled} step={step}/>
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
)

function SellCurrencies(props) {
  const {
    handleSubmit,
    currencyName,
    initialValues,
    change
  } = props

  const navigate = useNavigate();
  const {user} = useAuth0();

  const submitSell = (values, dispatch) => {
    dispatch(updateWallet({values: values, option: "sell", userId: user.sub}));
    navigate("/");
  }

  function changeTotalValue(event) {
    change('totalValue', calculateValue(event.target.value, initialValues.purchasePrice, initialValues.currencyCode));
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit(submitSell)} className={classes.form}>
        <h5>{currencyName}</h5>
        <Field name="currencyCode" component="input" type="hidden"/>
        <Field label="Sell price" name="purchasePrice" component={renderField} type="number" disabled={true} />
        <Field label="Units" name="units" component={renderField} type="number" disabled={false} onChange={changeTotalValue} 
              step={isSpecialIncrementCurrency(initialValues.currencyCode) ? 100 : 1}/>
        <Field label="Total value" name="totalValue" component={renderField} type="number" disabled={true} />
        <p className="mt-2">
          <Link to="/" type="button" className="btn btn-outline-lightt">Cancel</Link>  
          <button className="btn btn-secondary">Submit</button>  
        </p>
      </form>
    </Modal>
  );
}

function mapStateToProps(state) {
  const popUpCurrency = state.popUpCurrency.popUpCurrency;

  return {
    initialValues: {
      purchasePrice: popUpCurrency.purchasePrice.toFixed(2),
      units: popUpCurrency.unit,
      currencyCode: popUpCurrency.code,
      totalValue: calculateValue(popUpCurrency.unit, popUpCurrency.purchasePrice, popUpCurrency.code),
      amount: state.wallet.wallet[popUpCurrency.code],
    },
    currencyName: popUpCurrency.name
  }
}

SellCurrencies = reduxForm({
  form: "sell_currencies",
  enableReinitialize: true,
  validate,
})(SellCurrencies)

export default connect(mapStateToProps)(SellCurrencies)