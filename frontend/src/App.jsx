import "./App.css";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Home from "./pages/homepage/home";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

function App() {
  const { authuser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center ">
      <Routes>
        <Route
          path="/"
          element={authuser ? <Home></Home> : <Navigate to="/login"></Navigate>}
        ></Route>
        <Route
          path="/login"
          element={authuser ? <Navigate to="/"></Navigate> : <Login></Login>}
        ></Route>
        <Route
          path="/signup"
          element={authuser ? <Navigate to="/"></Navigate> : <SignUp></SignUp>}
        ></Route>
      </Routes>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
