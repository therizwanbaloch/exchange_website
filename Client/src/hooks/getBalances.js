// getBalances.js
import axios from "axios";

export const getBalances = async () => {
  const URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${URL}/wallet/balances`, {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    });
    return response.data.balances;
  } catch (error) {
    console.error("Error fetching balances:", error);
  }
};
