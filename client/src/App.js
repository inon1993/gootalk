import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Login from "./pages/Login/Login";
import "./App.css";
import Signup from "./pages/Signup/Signup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function App() {
  const user = useSelector((state) => state.user.accessToken);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   user === "" && navigate("/login");
  // }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user !== "" ? <HomePage /> : <Navigate replace to="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
