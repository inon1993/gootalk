import { AccountCircleRounded } from "@mui/icons-material";
import classes from "./Profile.module.css";

const Profile = ({ activate, onClick }) => {
  const clickHandler = () => {
    onClick();
  };
  return (
    <button
      className={
        activate ? classes["navbar-profile-focus"] : classes["navbar-profile"]
      }
      onClick={clickHandler}
    >
      <AccountCircleRounded className={classes["navbar-profile-icon"]} />
      <span className={classes["navbar-profile-name"]}>Inon Avramashvili</span>
    </button>
  );
};

export default Profile;
