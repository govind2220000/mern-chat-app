import React from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender: gender });
  };

  const { loading, signup } = useSignup();

  const handleSumit = async (e) => {
    e.preventDefault(); // This stops the page from refreshing when the form is submitted
    await signup(inputs);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 bg-blue-200 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
        <h1 className="text-3xl font-semibold text-center mb-2 text-gray-200">
          SignUp
          <span className="text-blue-500"> Chat App</span>
        </h1>
        <form onSubmit={handleSumit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-200 ">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            ></input>
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-200 ">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={inputs.userName}
              onChange={(e) =>
                setInputs({ ...inputs, userName: e.target.value })
              }
            ></input>
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-200 ">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full input input-bordered h-10"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            ></input>
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-200">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            ></input>
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-200">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            ></input>
          </div>
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
          ></GenderCheckbox>

          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 inline-block mt-2 text-gray-200"
          >
            Already have an account?
          </Link>
          <div>
            <button className="btn btn-sm mt-2 w-full py-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "SignUp"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
