import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getWallet = createAsyncThunk("wallet/getWallet", async (data) => {
    return fetch ("http://127.0.0.1:8080/wallet/" + data.userId, {
        method: 'GET',
    }).then((response) => 
        response.json()
    );
})

export const buyCurrency = createAsyncThunk("wallet/buy", async (data) => {
    return fetch ("http://127.0.0.1:8080/wallet/buy", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data}),
    }).then((response) => 
        response.json(),
    );
})

export const sellCurrency = createAsyncThunk("wallet/sell", async (data) => {
    return fetch ("http://127.0.0.1:8080/wallet/sell", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data}),
    }).then((response) => 
        response.json(),
    );
})

export const createWallet = createAsyncThunk("wallet/createWallet", async (data) => {
    return fetch ("http://127.0.0.1:8080/wallet/create", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data}),
    }).then((response) => 
        response.json(),
    );
})

const walletSlice = createSlice({
    name: "wallet",
    initialState: {
        wallet: {
            userId: null,
            availableMoney: 0,
            USD: 0,
            EUR: 0,
            CHF: 0,
            RUB: 0,
            CZK: 0,
            GBP: 0,
        },
        isLoading: true,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(getWallet.fulfilled, (state, action) => {
            if (action.payload != null) {
                state.wallet = action.payload
            }
            state.isLoading = false;
        })
        builder.addCase(getWallet.rejected, (state, action) => {
            state.isError = true;
        })
        builder.addCase(createWallet.fulfilled, (state, action) => {
            state.isLoading = false;
            state.wallet = action.payload.wallet
        })
        builder.addCase(createWallet.rejected, (state, action) => {
            state.isError = true;
        })
        builder.addCase(buyCurrency.fulfilled, (state, action) => {
            state.isLoading = false;
            state.wallet = action.payload.wallet
        })
        builder.addCase(buyCurrency.rejected, (state, action) => {
            state.isError = true;
        })
        builder.addCase(sellCurrency.fulfilled, (state, action) => {
            state.isLoading = false;
            state.wallet = action.payload.wallet
        })
        builder.addCase(sellCurrency.rejected, (state, action) => {
            state.isError = true;
        })
        .addDefaultCase((state, action) => {})
    },
})

export default walletSlice.reducer