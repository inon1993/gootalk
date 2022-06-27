import classes from "./DropdownMenu.module.css";
import {
  AccountCircleRounded,
  HelpCenterRounded,
  Logout,
  Settings,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import useLogout from "../../../../hooks/useLogout";

const DropdownMenu = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  
  const logoutHandler = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className={classes.dropdown}>
      <div className={classes["dropdown-options"]}>
        <div className={classes["dropdown-item"]}>
          <AccountCircleRounded className={classes["dropdown-item-icon"]} />
          <span className={classes["dropdown-item-text"]}>My Account</span>
        </div>
        <div className={classes["dropdown-item"]}>
          <HelpCenterRounded className={classes["dropdown-item-icon"]} />
          <span className={classes["dropdown-item-text"]}>Help & About</span>
        </div>
        <div className={classes["dropdown-item"]}>
          <Settings className={classes["dropdown-item-icon"]} />
          <span className={classes["dropdown-item-text"]}>Settings</span>
        </div>
      </div>
      <div className={classes["dropdown-item"]} onClick={logoutHandler}>
        <Logout className={classes["dropdown-item-icon"]} />
        <span className={classes["dropdown-item-text"]} >
          Log Out
        </span>
      </div>
    </div>
  );
};

export default DropdownMenu;
