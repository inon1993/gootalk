import Navbar from "../../components/Navbar/Navbar";
import classes from "./Notifications.module.css";
import { useDispatch, useSelector } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { menuActions } from "../../store/menu-slice";
import { dropdownActions } from "../../store/dropdown-slice";
import { useEffect } from "react";
import Menu from "../../components/Dashboard/Menu/Menu";
import DashboardNotification from "../../components/Dashboard/DashboardNotification/DashboardNotification";

const Notifications = () => {
  const theme = useSelector((state) => state.settings.toggle.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const activateProfile = () => {
      dispatch(menuActions.deactivate());
      dispatch(navbarActions.activateNotification());
      dispatch(navbarActions.activateSearchInput());
    };
    activateProfile();
  }, []);

  const deactivateDropdownHandler = () => {
    dispatch(dropdownActions.deactivate());
  };

  return (
    <>
      <Navbar />
      <div className={classes["dashboard-noti"]} data-theme={theme}>
        <div
          className={classes["left-menu"]}
          onClick={deactivateDropdownHandler}
        >
          <Menu />
        </div>
        <div className={classes["dashboard-noti-wrapper"]}>
          <DashboardNotification />
        </div>
      </div>
    </>
  );
};

export default Notifications;
