import Navbar from "../../components/Navbar/Navbar";
import classes from "./AboutPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { menuActions } from "../../store/menu-slice";
import { dropdownActions } from "../../store/dropdown-slice";
import { useEffect } from "react";
import Menu from "../../components/Dashboard/Menu/Menu";
import DashboardAbout from "../../components/Dashboard/DashboardAbout/DashboardAbout";

const AboutPage = () => {
  const theme = useSelector((state) => state.settings.toggle.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(menuActions.deactivate());
    dispatch(navbarActions.deactivate());
    dispatch(navbarActions.activateSearchInput());
  }, []);

  const deactivateDropdownHandler = () => {
    dispatch(dropdownActions.deactivate());
  };

  return (
    <>
      <Navbar />
      <div className={classes["dashboard-about"]} data-theme={theme}>
        <div
          className={classes["left-menu"]}
          onClick={deactivateDropdownHandler}
        >
          <Menu />
        </div>
        <div className={classes["dashboard-about-wrapper"]}>
          <DashboardAbout />
        </div>
      </div>
    </>
  );
};

export default AboutPage;
