import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "../buy/BuyCurrencies.module.css";
import Modal from "../../../components/modal/Modal";
import { getAuth0User } from "../../authentication/auth0Actions";
import { useEffect, useState } from "react";
import { createWallet } from "../../../store/walletSlice";
import InputField from "../../../components/fields/InputField";

const findStep = (item, currencies) => {
    let step = 1;
    currencies.forEach(currency => {
        if (currency.code == item) {
            step = currency.unit;
        }
    });

    return step;
};

const validate = (values, currencies) => {
  let errors = {};

  Object.keys(values).map((item, index) => {
    const step = findStep(item, currencies);

    if (values[item] < 0 && item !== 'availableMoney') {
        errors[item] = "Units number must be higher then 0";
    } 

    if (isNaN(Number(values[item]))) {
        errors[item] = "Units number must be an integer";
    } 

    if (Math.round(values[item] % step) / step !== 0) {
        errors[item] = `Must be an increment of ${step}`;
    } 

    if (values[item] <= 0 && item === 'availableMoney') {
        errors[item] = "You need to declare some money in your pocket";
    }
})

  return errors;
}

function CreateInitialWallet() {
  const navigate = useNavigate();
  const user = getAuth0User();
  const dispatch = useDispatch();
  const location = useLocation();
  const currencies = location.state.currencies;
  const [errors, setErrors] = useState({});
  const wallet = useSelector((state) => state.wallet.wallet);
  const { ['userId']: userId, ...splicedWallet } = wallet;
  const [inputFields, setInputFields] = useState(splicedWallet);

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createWallet({values: inputFields, userId: user.sub}));
    navigate("..");
  };

  useEffect(() => {
    setErrors(validate(inputFields, currencies));  
  }, [inputFields]);

  return (
    <Modal redirect="..">
      <form onSubmit={handleSubmit} className={classes.form}>
        {Object.keys(inputFields).map((item, index) => (
            <div key={index}>
              <InputField label={item} name={item} type="number" value={item.value} disabled={false} onChange={handleChange} step={findStep(item, currencies)} error={errors[item]}/>
            </div>
        ))}
        <p className="mt-2">
          <Link to=".." type="button" className="btn btn-outline-lightt">Cancel</Link>  
          <button className="btn btn-secondary" disabled={Object.keys(errors).length > 0}>Submit</button>  
        </p>
      </form>
    </Modal>
  );
}

export default CreateInitialWallet