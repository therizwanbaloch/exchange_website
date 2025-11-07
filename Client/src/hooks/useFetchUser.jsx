import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserData, clearUserData } from "../redux/slices/userSlice";

const useFetchUser = () => {
  const dispatch = useDispatch();
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

  
    if (storedUser) {
      dispatch(setUserData(JSON.parse(storedUser)));
      return;
    }

    
    if (token) {
      axios
        .get(`${URL}/users/user-data`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(setUserData(res.data.user));
          localStorage.setItem("user", JSON.stringify(res.data.user));
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch(clearUserData());
        });
    }
  }, [dispatch]);

  return;
};

export default useFetchUser;
