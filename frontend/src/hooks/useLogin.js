import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useState } from "react";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthuser } = useAuthContext();
  const login = async (username, password) => {
    const success = handleInputErrors({
      username: username,
      password: password,
    });
    if (!success) {
      console.log(success);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          userName: username,
          password: password,
          email: username,
        },
        { withCredentials: true },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      //localStorage
      localStorage.setItem("chat-user", JSON.stringify(res.data));
      setAuthuser(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputErrors({ username, password }) {
  if (!password || !username) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}
