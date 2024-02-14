import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col min-w-96  items-center justify-center ">
      <div className="w-full p-6 bg-blue-200 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 ">
        <h1 className="text-3xl font-semibold text-center mb-2 text-gray-200">
          Login
          <span className="text-blue-500"> Chatting App</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-200 ">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Username/Email"
              className="w-full input input-bordered h-10"
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
            ></input>
          </div>

          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-600 inline-block mt-2 text-gray-200"
          >
            Don't have an account?
          </a>

          <div>
            <button className="btn btn-sm mt-2 w-full py-">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
