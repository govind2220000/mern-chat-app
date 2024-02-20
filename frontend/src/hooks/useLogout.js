import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.jsx";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthuser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/logout",
        {},
        { withCredentials: true },
        { headers: { "Content-Type": "application/json" } }
      );
      //console.log(res.data, res.headers["Set-Cookie"]);
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      //localStorage
      localStorage.removeItem("chat-user");
      setAuthuser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
