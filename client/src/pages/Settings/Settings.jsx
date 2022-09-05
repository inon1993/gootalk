import classes from "./Settings.module.css";
import Navbar from "../../components/Navbar/Navbar";
import DashboardSettings from "../../components/Dashboard/DashboardSettings/DashboardSettings";
import { useDispatch } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { menuActions } from "../../store/menu-slice";
import { dropdownActions } from "../../store/dropdown-slice";
import { useEffect } from "react";
import Menu from "../../components/Dashboard/Menu/Menu";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(menuActions.activateSettings());
    dispatch(navbarActions.deactivate());
    dispatch(navbarActions.activateSearchInput());
  }, []);

  const deactivateDropdownHandler = () => {
    dispatch(dropdownActions.deactivate());
  };

  return (
    <div>
      <Navbar />
      <div className={classes["dashboard-settings"]}>
        <div
          className={classes["left-menu"]}
          onClick={deactivateDropdownHandler}
        >
          <Menu />
        </div>
        <div className={classes["dashboard-settings-wrapper"]}>
          <DashboardSettings />
        </div>
      </div>
    </div>
  );
};

export default Profile;
