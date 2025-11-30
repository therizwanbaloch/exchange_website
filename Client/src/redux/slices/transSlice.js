// src/redux/slices/transSlice.js
import { createSlice } from "@reduxjs/toolkit";

const transSlice = createSlice({
  name: "transactions",
  initialState: {
    recent: [],
    loading: false,
    error: null,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setRecentTransactions: (state, action) => {
      state.loading = false;
      state.recent = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startLoading, setRecentTransactions, setError } =
  transSlice.actions;

export default transSlice.reducer;