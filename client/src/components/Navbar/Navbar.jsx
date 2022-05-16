import { useState } from "react";
import classes from "./Navbar.module.css";
import { HomeRounded, MessageRounded } from "@mui/icons-material";
import Search from "./Search/Search";
import Profile from "./Profile/Profile";
import DropdownMenu from "./Profile/DropdownMenu/DropdownMenu";
import { useSelector, useDispatch } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { menuActions } from "../../store/menu-slice";
import { dropdownActions } from "../../store/dropdown-slice";
import DropdownBackground from "./Profile/DropdownMenu/DropdownBackground";

const Navbar = () => {
  const isActivated = useSelector((state) => state.navbar.activate);
  const isActivatedDropdown = useSelector((state) => state.dropdown.activate);
  const dispatch = useDispatch();

  const activateHomeHandler = () => {
    dispatch(navbarActions.activateHome());
    dispatch(menuActions.deactivate());
    dispatch(dropdownActions.deactivate());
    // setIsDropdown(false);
  };

  const activateNotificationHandler = () => {
    dispatch(navbarActions.activateNotification());
    dispatch(dropdownActions.deactivate());
    dispatch(menuActions.deactivate());
    // setIsDropdown(false);
  };

  const activateProfileHandler = () => {
    dispatch(dropdownActions.activate());
    dispatch(navbarActions.activateProfile());
    // setIsDropdown(!isDropdown);
    // dispatch(menuActions.deactivate())
  };

  const disabaleDropdownHandler = () => {
    // setIsDropdown(false);
    dispatch(dropdownActions.deactivate());
    dispatch(navbarActions.activateProfile());
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
        {isActivatedDropdown && (
          <div className={classes["dropdown-menu"]}>
            <DropdownBackground onClose={disabaleDropdownHandler}>
              <DropdownMenu />
            </DropdownBackground>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
