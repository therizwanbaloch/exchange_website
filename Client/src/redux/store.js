import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./slices/balanceSlice";

const store = configureStore({
  reducer: {
    balance: balanceReducer,
  },
});

export default store;
