import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/slices/userSlice"; 

const useFetchUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!user && token) {
      axios
        .get(`${URL}/users/user-data`, {
        })
        .then((response) => {
          dispatch(setUserData(response.data.user));
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          localStorage.removeItem("token"); 
        });
    }
  }, [dispatch, user]);

  return user;
};

export default useFetchUser;
