import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transaction: null, 
};

const transSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transaction = action.payload;
    },
  },
});

export const { setTransactions } = transSlice.actions;
export default transSlice.reducer;
