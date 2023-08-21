import { Field } from "redux-form";
import { isSpecialIncrementCurrency } from "../../features/currencies/currencyOperations";

const InputField = ({item, disabled}) => {
    return (
        <Field label={item} name={item} component={renderField} step={isSpecialIncrementCurrency(item) ? 100 : 1} type="number" disabled={disabled} />
    )
};

const renderField = ({ input, label, type, disabled, step, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} disabled={disabled} step={step}/>
        {touched && (error && <span>{error}</span>)}
      </div>
    </div>
  )

export default InputField;