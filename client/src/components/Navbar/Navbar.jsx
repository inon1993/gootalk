import { useState } from "react";
import classes from "./Navbar.module.css";
import { HomeRounded, MessageRounded } from "@mui/icons-material";
import Search from "./Search/Search";
import Profile from "./Profile/Profile";

const Navbar = () => {
  const [isActiveHome, setIsActiveHome] = useState(false);
  const [isActiveNotification, setIsActiveNotification] = useState(false);
  const [isActiveProfile, setIsActiveProfile] = useState(false);

  const activateHomeHandler = () => {
    setIsActiveHome(true);
    setIsActiveNotification(false);
    setIsActiveProfile(false);
  };

  const activateNotificationHandler = () => {
    setIsActiveHome(false);
    setIsActiveNotification(true);
    setIsActiveProfile(false);
  };

  const activateProfileHandler = () => {
    setIsActiveHome(false);
    setIsActiveNotification(false);
    setIsActiveProfile(true);
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
            isActiveHome
              ? classes["navbar-features-icon-focus"]
              : classes["navbar-features-icon"]
          }
        />
        <MessageRounded
          onClick={activateNotificationHandler}
          className={
            isActiveNotification
              ? classes["navbar-features-icon-focus"]
              : classes["navbar-features-icon"]
          }
        />
        <Profile onClick={activateProfileHandler} activate={isActiveProfile} />
      </div>
    </div>
  );
};

export default Navbar;
