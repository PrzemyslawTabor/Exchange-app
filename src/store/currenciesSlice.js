import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getCurrencies = createAsyncThunk("currencies/getCurrencies", async () => {
    return fetch ("http://webtask.future-processing.com:8068/currencies").then((response) => 
        response.json()
    );
})

export const isSpecialIncrementCurrencyTest = (code) => {
    if (typeof(state) === 'undefined' && state == null) {
        console.log("test");
        getCurrencies();
    }
}

const currenciesSlice = createSlice({
    name: "currencies",
    initialState: {
        currencies: {},
    },
    reducers: {
        testGetCurrencies: (state, action) => {
            state.currencies = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrencies.fulfilled, (state, action) => {
            state.currencies = action.payload
        })
    },
})

export const {testGetCurrencies} = currenciesSlice.actions
export default currenciesSlice.reducer