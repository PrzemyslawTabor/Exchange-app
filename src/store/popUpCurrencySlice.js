import { createSlice } from "@reduxjs/toolkit";

const popUpCurrencySlice = createSlice({
    name: "popUpCurrency",
    initialState: {
        popUpCurrency: {
            code: '',
            unit: '',
            sellPrice: '',
            name: ''
        }
    },
    reducers: {
        setCurrencyToUpdate(state, action) {
            state.popUpCurrency = action.payload
        },
    }
});

export const {setCurrencyToUpdate} = popUpCurrencySlice.actions

export default popUpCurrencySlice.reducer