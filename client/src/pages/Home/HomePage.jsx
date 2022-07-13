import Navbar from "../../components/Navbar/Navbar";
import DashboardHome from "../../components/Dashboard/DashboardHome/DashboardHome";
import { useDispatch } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { dropdownActions } from "../../store/dropdown-slice";
import { useEffect } from "react";
import Menu from "../../components/Dashboard/Menu/Menu";
import classes from "./HomePage.module.css";
import { menuActions } from "../../store/menu-slice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(navbarActions.activateSearchInput());
    dispatch(navbarActions.deactivate());
    dispatch(menuActions.deactivate());
  }, []);

  const deactivateDropdownHandler = () => {
    dispatch(dropdownActions.deactivate());
  };

  return (
    <div>
      <Navbar />
      <div className={classes["dashboard-home"]}>
        <div
          className={classes["left-menu"]}
          onClick={deactivateDropdownHandler}
        >
          <Menu />
        </div>
        <div className={classes["dashboard-home-wrapper"]}>
          <DashboardHome />
        </div>
      </div>
    </div>
  );
};

export default Home;
