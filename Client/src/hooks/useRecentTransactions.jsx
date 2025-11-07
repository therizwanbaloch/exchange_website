// src/hooks/useRecentTransactions.js
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  startLoading,
  setRecentTransactions,
  setError,
} from "../redux/slices/transSlice";

const useRecentTransactions = () => {
  const dispatch = useDispatch();
  const { recent, loading, error } = useSelector(
    (state) => state.transaction
  );

  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const fetchRecentTransactions = useCallback(async () => {
    if (!token) {
      dispatch(setError("User not authenticated"));
      return;
    }

    try {
      dispatch(startLoading());
      const res = await axios.get(`${URL}/transactions/recent-transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setRecentTransactions(res.data?.transactions || []));
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Failed to load transactions")
      );
    }
  }, [dispatch, URL, token]);

  useEffect(() => {
    fetchRecentTransactions();
  }, [fetchRecentTransactions]);

  return { recent, loading, error, refetch: fetchRecentTransactions };
};

export default useRecentTransactions;
