import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import transReducer from "./slices/transSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transReducer,
  },
});

export default store;
