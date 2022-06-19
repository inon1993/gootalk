import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RoutingComponents/RequireAuth";
import Authenticated from "./components/RoutingComponents/Authenticated";

function App() {
  return (
    <Routes>
      <Route element={<Authenticated />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
