import classes from "./Menu.module.css";
import {
  HomeRounded,
  PeopleRounded,
  PersonRounded,
  Settings,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { menuActions } from "../../../store/menu-slice";
import { navbarActions } from "../../../store/navbar-slice";
import { Link } from "react-router-dom";

const Menu = () => {
  const isActivated = useSelector((state) => state.menu.activate);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const activateHome = () => {
    dispatch(menuActions.activateHome());
    dispatch(navbarActions.activateHome());
  };

  const activateProfile = () => {
    dispatch(menuActions.activateProfile());
    dispatch(navbarActions.deactivate());
  };

  const activateFriends = () => {
    dispatch(menuActions.activateFriends());
    dispatch(navbarActions.deactivate());
  };

  const activateSettings = () => {
    dispatch(menuActions.activateSettings());
    dispatch(navbarActions.deactivate());
  };

  return (
    <div className={classes["menu-wrapper"]}>
      <ul className={classes["menu-list"]}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <li
            className={
              isActivated.home
                ? classes["menu-item-active"]
                : classes["menu-item"]
            }
            onClick={activateHome}
          >
            <HomeRounded className={classes["menu-list-icon"]} />
            <span className={classes["menu-text"]}>Home</span>
          </li>
        </Link>
        <Link
          to={`/profile/${user.firstname}-${user.lastname}`}
          style={{ textDecoration: "none" }}
        >
          <li
            className={
              isActivated.profile
                ? classes["menu-item-active"]
                : classes["menu-item"]
            }
            onClick={activateProfile}
          >
            <PersonRounded className={classes["menu-list-icon"]} />
            <span className={classes["menu-text"]}>My Profile</span>
          </li>
        </Link>
        <Link to={"/friends"} style={{ textDecoration: "none" }}>
          <li
            className={
              isActivated.friends
                ? classes["menu-item-active"]
                : classes["menu-item"]
            }
            onClick={activateFriends}
          >
            <PeopleRounded className={classes["menu-list-icon"]} />
            <span className={classes["menu-text"]}>My Friends</span>
          </li>
        </Link>
        <Link to={"/settings"} style={{ textDecoration: "none" }}>
          <li
            className={
              isActivated.settings
                ? classes["menu-item-active"]
                : classes["menu-item"]
            }
            onClick={activateSettings}
          >
            <Settings className={classes["menu-list-icon"]} />
            <span className={classes["menu-text"]}>Settings</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Menu;
