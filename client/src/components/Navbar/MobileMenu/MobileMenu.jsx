import classes from "./MobileMenu.module.css";
import Search from "../Search/Search";
import { AccountCircleRounded, HelpCenterRounded, Logout, PeopleRounded, Settings } from "@mui/icons-material";

const MobileMenu = () => {
  return (
    <div className={classes["mm-features"]}>
      <ul className={classes["mm-ul"]}>
        <li className={classes["mm-li"]}>
          <AccountCircleRounded className={classes["mm-f-icon"]} />
          <span className={classes["mm-f-text"]}>My Profile</span>
        </li>
        <li className={classes["mm-li"]}>
          <PeopleRounded className={classes["mm-f-icon"]} />
          <span className={classes["mm-f-text"]}>My Friends</span>
        </li>
        <li className={classes["mm-li"]}>
          <HelpCenterRounded className={classes["mm-f-icon"]} />
          <span className={classes["mm-f-text"]}>Help & About</span>
        </li>
        <li className={classes["mm-li"]}>
          <Settings className={classes["mm-f-icon"]} />
          <span className={classes["mm-f-text"]}>Settings</span>
        </li>
        <li className={classes["mm-li"]}>
          <Logout className={classes["mm-f-icon"]} />
          <span className={classes["mm-f-text"]}>Log Out</span>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
