import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTransactions } from "../redux/slices/transSlice"; 

const useTransactionData = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction?.transaction);
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!transactions && token) {
      axios
        .get(`${URL}/transactions/user-transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          dispatch(setTransactions(response.data.transactions));
        })
        .catch((err) => {
          console.error("Error fetching transactions:", err);
        });
    }
  }, [dispatch, transactions, URL]);

  return transactions;
};

export default useTransactionData;
