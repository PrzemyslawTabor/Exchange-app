import { configureStore } from "@reduxjs/toolkit";
import currenciesSliceReducer from "./currenciesSlice";
import walletSliceReducer from "./walletSlice";

export default configureStore({
  reducer: {
    currencies: currenciesSliceReducer,
    wallet: walletSliceReducer,
  }
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer: {
      currencies: currenciesSliceReducer,
      wallet: walletSliceReducer,
    },
    preloadedState
  })
}