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

export default InputField;