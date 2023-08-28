export const calculateValue = (amount, unitPrice, currencyUnits) => {
    return (unitPrice * (amount / currencyUnits)).toFixed(2);
}
