import PropTypes from "prop-types"

const InputField = ({ label, type, disabled, name, value, onChange, step, error}) => {
  return (
      <div>
      <label>{label}</label>
      <div>
        <input value={value} name={name} placeholder={label} type={type} disabled={disabled} onChange={onChange} step={step}/>
        {error && <span>{error}</span>}
      </div>
    </div>
  )
}

InputField.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  step: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.any
}

export default InputField;