import classes from "./ExpendedUsers.module.css";
import { useEffect } from "react";
import Menu from "../../components/Dashboard/Menu/Menu";
import Navbar from "../../components/Navbar/Navbar";
import DashboardExpendedUsers from "../../components/Dashboard/DashboardExpendedUsers/DashboardExpendedUsers";
import { useDispatch } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { menuActions } from "../../store/menu-slice";

const ExpendedUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navbarActions.deactivateSearchInput());
    dispatch(navbarActions.deactivate());
    dispatch(menuActions.deactivate());
  }, []);

  return (
    <>
      <Navbar />
      <div className={classes["search-dashboard"]}>
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
