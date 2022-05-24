import classes from "./DashboardProfile.module.css";
import Menu from "../Menu/Menu";
import ProfileData from "../ProfileData/ProfileData";
import { useDispatch } from "react-redux";
import { dropdownActions } from "../../../store/dropdown-slice";
import UserPosts from "../UserPosts/UserPosts";

const DashboardProfile = () => {
  const dispatch = useDispatch();

  const deactivateDropdownHandler = () => {
    dispatch(dropdownActions.deactivate());
  };
  return (
    <div className={classes["dashboard-profile"]}>
      <div className={classes["left-menu"]} onClick={deactivateDropdownHandler}>
        <Menu />
      </div>
      <div className={classes["profile-data"]}>
        <ProfileData />
        <div className={classes["profile-user-posts"]}>
          <UserPosts />
        </div>
      </div>
      <div className={classes["right-menu"]}></div>
    </div>
  );
};

export default DashboardProfile;
