import classes from "./DashboardProfile.module.css";
import Menu from "../Menu/Menu";
import ProfileData from "../ProfileData/ProfileData";
import { useDispatch } from "react-redux";
import { dropdownActions } from "../../../store/dropdown-slice";
import UserPosts from "../UserPosts/UserPosts";
import { useState, useEffect } from "react";
import axios from "axios"

const DashboardProfile = () => {

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const getUserPosts = async () => {
      const userPostsArray = await axios.get("/post/posts/6271122e246c91208cbd93b2");
      console.log(userPostsArray.data);
      setUserPosts(userPostsArray.data);
    }

    getUserPosts()
  }, []);

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
          <UserPosts posts={userPosts} />
        </div>
      </div>
      <div className={classes["right-menu"]}></div>
    </div>
  );
};

export default DashboardProfile;
