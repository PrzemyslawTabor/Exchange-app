export const isSpecialIncrementCurrency = (code) => ['RUB', 'CZK'].includes(code);

export const calculateValue = (amount, unitPrice, currencyUnits) => {
    // console.log(units);
    // if (isSpecialIncrementCurrency(code)) {
        return (unitPrice * (amount / currencyUnits)).toFixed(2);
    // } 
  
    // return (unitPrice * amount).toFixed(2);
}
