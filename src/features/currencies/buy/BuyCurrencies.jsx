import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./BuyCurrencies.module.css";
import Modal from "../../../components/modal/Modal";
import { Field, reduxForm } from "redux-form";
import { buyCurrency } from "../../../store/walletSlice";
import { isSpecialIncrementCurrency, calculateValue } from "../currencyOperations";
import { getAuth0User } from "../../authentication/auth0Actions";

const validate = values => {
  const errors = {};

  if (values.totalValue > values.availableMoney) {
    errors.totalValue = `You cannot afford that, available money: ${values.availableMoney}`;
  }

  if (!values.units) {
    errors.units = "Field is required";
    return errors;
  } 
  
  if (values.units <= 0) {
    errors.units = "Units number must be higher then 0";
    return errors;
  }

  if (isNaN(Number(values.units))) {
    errors.units = "Units number must be an integer";
    return errors;
  } 
  
  if (isSpecialIncrementCurrency(values.currencyCode) && (Math.round(values.units % 100) / 100) !== 0) {
    errors.units = "Must be an increment of 100";
    return errors;
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

function BuyCurrencies(props) {
  const {
    handleSubmit,
    currencyName,
    initialValues,
    change,
  } = props

  const navigate = useNavigate();
  const user = getAuth0User();

  const submitBuy = (values, dispatch) => {
    dispatch(buyCurrency({values: values, userId: user.sub}));
    navigate("/");
  }

  function changeTotalValue(event) {
    change('totalValue', calculateValue(event.target.value, initialValues.sellPrice, initialValues.units));
  }

  return (
    <Modal redirect="/">
      <form onSubmit={handleSubmit(submitBuy)} className={classes.form}>
        <h5>{currencyName}</h5>
        <Field name="currencyCode" component="input" type="hidden"/>
        <Field name="availableMoney" component="input" type="hidden"/>
        <Field label="Sell price" name="sellPrice" component={renderField} type="number" disabled={true} />
        <Field label="Units" name="units" component={renderField} type="number" disabled={false} onChange={changeTotalValue} 
              step={initialValues.units}/>
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
      sellPrice: popUpCurrency.sellPrice.toFixed(2),
      units: popUpCurrency.unit,
      currencyCode: popUpCurrency.code,
      totalValue: calculateValue(popUpCurrency.unit, popUpCurrency.sellPrice, popUpCurrency.unit),
      availableMoney: state.wallet.wallet.availableMoney
    },
    currencyName: popUpCurrency.name,
  }
}

BuyCurrencies = reduxForm({
  form: "buy-currencies",
  enableReinitialize: true,
  validate
})(BuyCurrencies)

export default connect(mapStateToProps)(BuyCurrencies)