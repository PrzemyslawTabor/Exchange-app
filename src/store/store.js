import { configureStore } from "@reduxjs/toolkit";
import currenciesSliceReducer from "./currenciesSlice";
import walletSliceReducer from "./walletSlice";
import { reducer as formReducer } from 'redux-form';
import popUpCurrencySliceReducer from "./popUpCurrencySlice";

export default configureStore({
  reducer: {
    currencies: currenciesSliceReducer,
    wallet: walletSliceReducer,
    form: formReducer,
    popUpCurrency: popUpCurrencySliceReducer
  }
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer: {
      currencies: currenciesSliceReducer,
      wallet: walletSliceReducer,
      form: formReducer,
      popUpCurrency: popUpCurrencySliceReducer
    },
    preloadedState
  })
}