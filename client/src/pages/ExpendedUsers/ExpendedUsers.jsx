import classes from "./ExpendedUsers.module.css";
import { useEffect } from "react";
import Menu from "../../components/Dashboard/Menu/Menu";
import Navbar from "../../components/Navbar/Navbar";
import DashboardExpendedUsers from "../../components/Dashboard/DashboardExpendedUsers/DashboardExpendedUsers";
import { useDispatch, useSelector } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { menuActions } from "../../store/menu-slice";

const ExpendedUsers = () => {
  const theme = useSelector((state) => state.settings.toggle.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navbarActions.activateSearch());
    dispatch(navbarActions.deactivateSearchInput());
    dispatch(menuActions.deactivate());
  }, []);

  return (
    <>
      <Navbar />
      <div className={classes["search-dashboard"]} data-theme={theme}>
        <div className={classes["search-menu"]}>
          <Menu />
        </div>
        <div className={classes["results-expended-wrapper"]}>
          <DashboardExpendedUsers />
        </div>
      </div>
    </>
  );
};

export default ExpendedUsers;
