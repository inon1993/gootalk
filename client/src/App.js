import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ExpendedUsers from "./pages/ExpendedUsers/ExpendedUsers";
import { Routes, Route } from "react-router-dom";
import PersistAuth from "./components/RoutingComponents/PersistAuth";
import RequireAuth from "./components/RoutingComponents/RequireAuth";
import Authenticated from "./components/RoutingComponents/Authenticated";

function App() {
  return (
    <Routes>
      <Route element={<Authenticated />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<PersistAuth />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/search" element={<ExpendedUsers />} />
        </Route>
      </Route>
      {/* <Route path="*" element={<Error />} /> */}
    </Routes>
  );
}

export default App;
