import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.jsx";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { authuser, setAuthuser } = useAuthContext();
  const signup = async ({
    fullName,
    email,
    userName,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      email,
      userName,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "/api/auth/signup",
        {
          fullName,
          email,
          userName,
          password,
          confirmPassword,
          gender,
        },
        { withCredentials: true },
        { headers: { "Content-Type": "application/json" } }
      );
      //console.log(res.data, res.headers["Set-Cookie"]);
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      //localStorage
      localStorage.setItem("chat-user", JSON.stringify(res.data));
      setAuthuser(res.data);
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        toast.error(`Username/Email already exists `);
        console.log(error.message);
      } else {
        //console.log(error.code);
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullName,
  email,
  userName,
  password,
  confirmPassword,
  gender,
}) {
  if (
    !fullName ||
    !userName ||
    !email ||
    !password ||
    !confirmPassword ||
    !gender
  ) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
