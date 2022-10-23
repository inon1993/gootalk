import { AccountCircleRounded } from "@mui/icons-material";
import classes from "./Profile.module.css";
import { useSelector } from "react-redux";

const Profile = ({ activate, onClick }) => {
  const user = useSelector((state) => state.user.user);

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
      <div className={classes["navbar-profile-content"]}>
        {user.profilePicture ? (
        <img
          className={classes["navbar-profile-pic"]}
          src={user.profilePicture}
          alt="profile"
        />
      ) : (
        <AccountCircleRounded className={classes["navbar-profile-icon"]} />
      )}
      <span
        className={classes["navbar-profile-name"]}
      >{`${user.firstname} ${user.lastname}`}</span>
      </div>
      
    </div>
  );
};

export default Profile;
