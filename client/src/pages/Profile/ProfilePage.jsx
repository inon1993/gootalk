import classes from "./ProfilePage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import DashboardProfile from "../../components/Dashboard/DashboardProfile/DashboardProfile";
import { useDispatch } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { menuActions } from "../../store/menu-slice";
import { dropdownActions } from "../../store/dropdown-slice";
import { useEffect } from "react";
import Menu from "../../components/Dashboard/Menu/Menu";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const activateProfile = () => {
      dispatch(menuActions.activateProfile());
      dispatch(navbarActions.deactivate());
      dispatch(navbarActions.activateSearchInput());
    };
    activateProfile();
  }, []);

  const deactivateDropdownHandler = () => {
    dispatch(dropdownActions.deactivate());
  };

  return (
    <div>
      <Navbar />
      <div className={classes["dashboard-profile"]}>
        <div className={classes["left-menu"]} onClick={deactivateDropdownHandler}>
          <Menu />
        </div>
        <div className={classes["dashboard-profile-wrapper"]}>
          <DashboardProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
