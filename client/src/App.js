import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Login from "./pages/Login/Login";
import "./App.css";
import Signup from "./pages/Signup/Signup";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.email);

  return (
    <Router>
      <Routes>
        {user !== "" ? (
          <Route path="/" element={<HomePage />} />
        ) : (
          <Redirect to="/login" />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
