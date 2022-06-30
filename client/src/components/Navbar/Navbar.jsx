import { useState } from "react";
import classes from "./Navbar.module.css";
import {
  Close,
  HomeRounded,
  MenuRounded,
  MessageRounded,
  SearchRounded,
} from "@mui/icons-material";
import Search from "./Search/Search";
import Profile from "./Profile/Profile";
import DropdownMenu from "./Profile/DropdownMenu/DropdownMenu";
import { useSelector, useDispatch } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { menuActions } from "../../store/menu-slice";
import { dropdownActions } from "../../store/dropdown-slice";
import DropdownBackground from "./Profile/DropdownMenu/DropdownBackground";
import MobileMenu from "./MobileMenu/MobileMenu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isActivated = useSelector((state) => state.navbar.activate);
  const isActivatedDropdown = useSelector((state) => state.dropdown.activate);
  const dispatch = useDispatch();
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const activateHomeHandler = () => {
    dispatch(navbarActions.activateHome());
    dispatch(menuActions.activateHome());
    dispatch(dropdownActions.deactivate());
  };

  const activateNotificationHandler = () => {
    dispatch(navbarActions.activateNotification());
    dispatch(dropdownActions.deactivate());
    dispatch(menuActions.deactivate());
    setIsMobileMenu(false);
  };

  const activateProfileHandler = () => {
    dispatch(dropdownActions.activate());
    dispatch(navbarActions.activateProfile());
  };

  const disabaleDropdownHandler = () => {
    dispatch(dropdownActions.deactivate());
    dispatch(navbarActions.activateProfile());
  };

  const activateSearchHandler = () => {
    dispatch(navbarActions.activateSearch());
    setIsMobileMenu(false);
  };

  const mobileMenuHandler = () => {
    setIsMobileMenu(!isMobileMenu);
  };

  return (
    <>
      <div
        className={`${
          !isMobileMenu ? classes.navbar : classes["navbar-mobile-menu"]
        }`}
      >
        <div className={classes.logo}>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <h1 className={classes["navbar-logo"]} onClick={activateHomeHandler}>
              Goo<span className={classes["logo-span"]}>talk</span>
            </h1>
          </Link>
        </div>
        <div className={classes.search}>
          {isActivated.searchInput && <Search />}
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
        <div className={classes["mobile-menu"]}>
          <MessageRounded
            onClick={activateNotificationHandler}
            className={
              isActivated.notifications
                ? classes["navbar-features-icon-focus"]
                : classes["navbar-features-icon"]
            }
          />
          <SearchRounded
            onClick={activateSearchHandler}
            className={
              isActivated.search
                ? classes["navbar-features-icon-focus"]
                : classes["navbar-features-icon"]
            }
          />
          <div className={classes["mm-button"]} onClick={mobileMenuHandler}>
            {!isMobileMenu && <MenuRounded className={classes["mm-icon"]} />}
            {isMobileMenu && <Close className={classes["mm-icon"]} />}
          </div>
        </div>
      </div>
      {isMobileMenu && (
        <DropdownBackground onClose={mobileMenuHandler}>
          <MobileMenu />
        </DropdownBackground>
      )}
    </>
  );
};

export default Navbar;
