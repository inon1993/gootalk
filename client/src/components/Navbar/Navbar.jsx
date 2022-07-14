import { useEffect, useState } from "react";
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
import { useNavigate, useLocation } from "react-router";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const isActivated = useSelector((state) => state.navbar.activate);
  const isActivatedDropdown = useSelector((state) => state.dropdown.activate);
  const dispatch = useDispatch();
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [notiBadge, setNotiBadge] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const req = useAxiosPrivate();
  const filtered = user.notifications.filter((n) => {
    return !n.status;
  });
  useEffect(() => {
    setNotiBadge(filtered.length);
  }, [filtered]);

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

  const signinHandler = () => {
    navigate("/login", { state: { from: location }, replace: true });
  };

  const signupHandler = () => {
    navigate("/signup", { state: { from: location }, replace: true });
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
            <h1
              className={classes["navbar-logo"]}
              onClick={activateHomeHandler}
            >
              Goo<span className={classes["logo-span"]}>talk</span>
            </h1>
          </Link>
        </div>
        {user.userId !== "" && (
          <div className={classes.search}>
            {isActivated.searchInput && <Search />}
          </div>
        )}
        {user.userId !== "" && (
          <div className={classes["navbar-features"]}>
            <Link to={"/"} style={{ textDecoration: "none", display: "flex" }}>
              <HomeRounded
                onClick={activateHomeHandler}
                className={
                  isActivated.home
                    ? classes["navbar-features-icon-focus"]
                    : classes["navbar-features-icon"]
                }
              />
            </Link>
            <Link
              to={"/notifications"}
              style={{ textDecoration: "none", display: "flex" }}
            >
              <div style={{ position: "relative", display: "flex" }}>
                <MessageRounded
                  onClick={activateNotificationHandler}
                  className={
                    isActivated.notifications
                      ? classes["navbar-features-icon-focus"]
                      : classes["navbar-features-icon"]
                  }
                />
                {notiBadge > 0 && (
                  <span className={classes["notification-badge"]}>
                    {notiBadge}
                  </span>
                )}
              </div>
            </Link>
            <Profile onClick={activateProfileHandler} activate={isActivated} />
            {isActivatedDropdown && (
              <div className={classes["dropdown-menu"]}>
                <DropdownBackground onClose={disabaleDropdownHandler}>
                  <DropdownMenu />
                </DropdownBackground>
              </div>
            )}
          </div>
        )}
        {user.userId !== "" ? (
          <div className={classes["mobile-menu"]}>
            <Link
              to={"/notifications"}
              style={{ textDecoration: "none", display: "flex" }}
            >
              <MessageRounded
                onClick={activateNotificationHandler}
                className={
                  isActivated.notifications
                    ? classes["navbar-features-icon-focus"]
                    : classes["navbar-features-icon"]
                }
              />
            </Link>
            <Link
              to={"/search"}
              style={{ textDecoration: "none", display: "flex" }}
            >
              <SearchRounded
                onClick={activateSearchHandler}
                className={
                  isActivated.search
                    ? classes["navbar-features-icon-focus"]
                    : classes["navbar-features-icon"]
                }
              />
            </Link>
            <div className={classes["mm-button"]} onClick={mobileMenuHandler}>
              {!isMobileMenu && <MenuRounded className={classes["mm-icon"]} />}
              {isMobileMenu && <Close className={classes["mm-icon"]} />}
            </div>
          </div>
        ) : (
          <div className={classes["navber-sign-buttons"]}>
            <button
              className={classes["navber-signin-btn"]}
              onClick={signinHandler}
            >
              Sign In
            </button>
            <button
              className={classes["navber-signup-btn"]}
              onClick={signupHandler}
            >
              Sign Up
            </button>
          </div>
        )}
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
