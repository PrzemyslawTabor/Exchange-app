import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./BuyCurrencies.module.css";
import Modal from "../components/Modal";
import { Field, reduxForm } from "redux-form";
import { createWallet } from "../store/walletSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { isSpecialIncrementCurrency } from "../utils/currencyOperations";

const validate = values => {
  const errors = {};
    Object.keys(values).map((item, index) => {
        if (values[item] < 0 && item !== 'availableMoney') {
            errors[item] = "Units number must be higher then 0";
        } else if (isNaN(Number(values[item]))) {
            errors[item] = "Units number must be an integer";
        } else if (isSpecialIncrementCurrency(item) && (Math.round(values[item] % 100) / 100) !== 0) {
            errors[item] = "Must be an increment of 100";
        } else if (values[item] <= 0 && item === 'availableMoney') {
            errors[item] = "You need to declare some money in your pocket";
        }
    })

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

function CreateInitialWallet(props) {
  const {
    handleSubmit,
    initialValues,
    change
  } = props

  const navigate = useNavigate();
  const {user} = useAuth0();

  const submitCreate = (values, dispatch) => {
    dispatch(createWallet({values: values, userId: user.sub}));
    navigate("/");
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit(submitCreate)} className={classes.form}>
        {Object.keys(initialValues).map((item, index) => (
            <div key={index}>
                <Field label={item} name={item} component={renderField} step={isSpecialIncrementCurrency(item) ? 100 : 1} type="number" disabled={false} />
            </div>
        ))}
        <p className="mt-2">
          <Link to="/" type="button" className="btn btn-outline-lightt">Cancel</Link>  
          <button className="btn btn-secondary">Submit</button>  
        </p>
      </form>
    </Modal>
  );
}

function mapStateToProps(state) {
  console.log(state);
  const wallet = state.wallet.wallet;
  const { ['userId']: userId, ...splicedWallet } = wallet  

  return {
    initialValues: splicedWallet
  }
}

CreateInitialWallet = reduxForm({
  form: "sell_currencies",
  enableReinitialize: true,
  validate,
})(CreateInitialWallet)

export default connect(mapStateToProps)(CreateInitialWallet)