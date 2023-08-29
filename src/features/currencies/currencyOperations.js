export const calculateValue = (amount, unitPrice, currencyUnits) => {
    return parseFloat((unitPrice * (amount / currencyUnits)).toFixed(2));
}
