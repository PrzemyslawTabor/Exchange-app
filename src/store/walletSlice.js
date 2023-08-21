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
    },
    reducers: {
        testGetWallet: (state, action) => {
            state.wallet = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getWallet.fulfilled, (state, action) => {
            if (action.payload !== null) {
                state.wallet = action.payload
            }
        });
        builder.addCase(createWallet.fulfilled, (state, action) => {
            state.wallet = action.payload
        })
        builder.addCase(buyCurrency.fulfilled, (state, action) => {
            state.wallet = action.payload.wallet
        })
        builder.addCase(sellCurrency.fulfilled, (state, action) => {
            state.wallet = action.payload.wallet
        })
        .addDefaultCase((state, action) => {})
    },
})

export const {testGetWallet} = walletSlice.actions
export default walletSlice.reducer