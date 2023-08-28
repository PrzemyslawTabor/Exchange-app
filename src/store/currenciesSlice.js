import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getCurrencies = createAsyncThunk("currencies/getCurrencies", async () => {
    return fetch ("http://webtask.future-processing.com:8068/currencies").then((response) => 
        response.json()
    );
})

const currenciesSlice = createSlice({
    name: "currencies",
    initialState: {
        currencies: {},
        isLoading: true,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrencies.fulfilled, (state, action) => {
            state.currencies = action.payload
            state.isLoading = false;
        })
        builder.addCase(getCurrencies.rejected, (state, action) => {
            state.isError = true;
        })
    },
})

export default currenciesSlice.reducer