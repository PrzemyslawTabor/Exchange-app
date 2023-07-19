export const isSpecialIncrementCurrency = (code) => {
    if (['RUB', 'CZK'].includes(code)) {
        return true;
    } 

    return false;
}

export const calculateValue = (amount, unitPrice, code) => {
    if (isSpecialIncrementCurrency(code)) {
        return (unitPrice * (amount / 100)).toFixed(2);
    } 
  
    return (unitPrice * amount).toFixed(2);
}