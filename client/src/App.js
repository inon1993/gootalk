import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ExpendedUsers from "./pages/ExpendedUsers/ExpendedUsers";
import UsersProfile from "./pages/UsersProfile/UsersProfile";
import { Routes, Route } from "react-router-dom";
import PersistAuth from "./components/RoutingComponents/PersistAuth";
import RequireAuth from "./components/RoutingComponents/RequireAuth";
import Authenticated from "./components/RoutingComponents/Authenticated";
import Notifications from "./pages/Notifications/Notifications";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Authenticated />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="/users/:userid/:username" element={<UsersProfile />} />
      <Route element={<PersistAuth />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/search" element={<ExpendedUsers />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
