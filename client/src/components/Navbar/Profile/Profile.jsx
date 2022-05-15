import { AccountCircleRounded } from "@mui/icons-material";
import classes from "./Profile.module.css";

const Profile = ({ activate, onClick }) => {
  const clickHandler = () => {
    onClick();
  };
  return (
    <div
      className={
        activate.profile
          ? classes["navbar-profile-focus"]
          : classes["navbar-profile"]
      }
      onClick={clickHandler}
    >
      <AccountCircleRounded className={classes["navbar-profile-icon"]} />
      <span className={classes["navbar-profile-name"]}>Inon Avramashvili</span>
    </div>
  );
};

export default Profile;
