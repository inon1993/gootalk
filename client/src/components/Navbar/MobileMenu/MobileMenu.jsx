import classes from "./MobileMenu.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../../../hooks/useLogout";
import {
  AccountCircleRounded,
  HelpCenterRounded,
  Logout,
  PeopleRounded,
  Settings,
} from "@mui/icons-material";

const MobileMenu = () => {
  const user = useSelector((state) => state.user.user);
  const logout = useLogout();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className={classes["mm-features"]}>
      <ul className={classes["mm-ul"]}>
        <Link
          to={`/profile/${user.firstname}-${user.lastname}`}
          className={classes["mm-link"]}
        >
          <li className={classes["mm-li"]}>
            <AccountCircleRounded className={classes["mm-f-icon"]} />
            <span className={classes["mm-f-text"]}>My Profile</span>
          </li>
        </Link>
        <Link to={"/friends"} className={classes["mm-link"]}>
          <li className={classes["mm-li"]}>
            <PeopleRounded className={classes["mm-f-icon"]} />
            <span className={classes["mm-f-text"]}>My Friends</span>
          </li>
        </Link>
        <Link to={"/about"} className={classes["mm-link"]}>
          <li className={classes["mm-li"]}>
            <HelpCenterRounded className={classes["mm-f-icon"]} />
            <span className={classes["mm-f-text"]}>Help & About</span>
          </li>
        </Link>
        <Link to={"/settings"} className={classes["mm-link"]}>
          <li className={classes["mm-li"]}>
            <Settings className={classes["mm-f-icon"]} />
            <span className={classes["mm-f-text"]}>Settings</span>
          </li>
        </Link>
        <li className={classes["mm-li"]} onMouseDown={logoutHandler}>
          <Logout className={classes["mm-f-icon"]} />
          <span className={classes["mm-f-text"]}>Log Out</span>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
