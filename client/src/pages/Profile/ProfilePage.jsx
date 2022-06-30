import classes from "./ProfilePage.module.css";
import Navbar from "../../components/Navbar/Navbar"
import DashboardProfile from "../../components/Dashboard/DashboardProfile/DashboardProfile";

import { useDispatch } from "react-redux";

import { navbarActions } from "../../store/navbar-slice";
import { menuActions } from "../../store/menu-slice";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const activateProfile = () => {
      dispatch(menuActions.activateProfile());
      dispatch(navbarActions.deactivate());
      dispatch(navbarActions.activateSearchInput())
  }
  activateProfile();
  }, [])

  return (
    <div>
      <Navbar />
      <DashboardProfile />
    </div>
  );
};

export default Profile;
