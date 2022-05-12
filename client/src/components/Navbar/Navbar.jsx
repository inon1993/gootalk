import { useState } from "react";
import classes from "./Navbar.module.css";
import { HomeRounded, MessageRounded } from "@mui/icons-material";
import Search from "./Search/Search";
import Profile from "./Profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { menuActions } from "../../store/menu-slice";

const Navbar = () => {
  const isActivated = useSelector(state => state.navbar.activate);
  const dispatch = useDispatch();

  const activateHomeHandler = () => {
    dispatch(navbarActions.activateHome());
    dispatch(menuActions.deactivate())
  };

  const activateNotificationHandler = () => {
    dispatch(navbarActions.activateNotification());
    dispatch(menuActions.deactivate())
  };

  const activateProfileHandler = () => {
    dispatch(navbarActions.activateProfile());
    dispatch(menuActions.deactivate())
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.logo}>
        <h1 className={classes["navbar-logo"]}>
          Goo<span className={classes["logo-span"]}>talk</span>
        </h1>
      </div>
      <div className={classes.search}>
        <Search />
      </div>
      <div className={classes["navbar-features"]}>
        <HomeRounded
          onClick={activateHomeHandler}
          className={
            isActivated.home
              ? classes["navbar-features-icon-focus"]
              : classes["navbar-features-icon"]
          }
        />
        <MessageRounded
          onClick={activateNotificationHandler}
          className={
            isActivated.notifications
              ? classes["navbar-features-icon-focus"]
              : classes["navbar-features-icon"]
          }
        />
        <Profile onClick={activateProfileHandler} activate={isActivated} />
      </div>
    </div>
  );
};

export default Navbar;
