import classes from "./DropdownMenu.module.css";
import {
  AccountCircleRounded,
  HelpCenterRounded,
  Logout,
  Settings,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userActions } from "../../../../store/user-slice";
import { menuActions } from "../../../../store/menu-slice";
import { dropdownActions } from "../../../../store/dropdown-slice";
import { logout } from "../../../../api/auth/authRoutes";

const DropdownMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.user.accessToken);
  const logoutHandler = async () => {
    try {
      await logout(accessToken);
      localStorage.removeItem("persist:root");
      dispatch(userActions.logoutUser());
      dispatch(menuActions.deactivate());
      dispatch(dropdownActions.deactivate());

      navigate("/login");
    } catch (error) {
      localStorage.removeItem("persist:root");
      dispatch(userActions.logoutUser());
      dispatch(menuActions.deactivate());
      dispatch(dropdownActions.deactivate());

      navigate("/login");
    }
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
      <div className={classes["dropdown-item"]}>
        <Logout className={classes["dropdown-item-icon"]} />
        <span className={classes["dropdown-item-text"]} onClick={logoutHandler}>
          Log Out
        </span>
      </div>
    </div>
  );
};

export default DropdownMenu;
