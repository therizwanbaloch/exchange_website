import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/slices/userSlice"; 

const useFetchUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!user && token) {
      axios
        .get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
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
