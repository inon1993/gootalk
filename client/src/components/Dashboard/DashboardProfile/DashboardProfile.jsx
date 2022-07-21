import classes from "./DashboardProfile.module.css";
import ProfileData from "../ProfileData/ProfileData";
import UserPosts from "../UserPosts/UserPosts";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const DashboardProfile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const req = useAxiosPrivate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const userPostsArray = await req.get(`api/post/posts/${user.userId}`);
        setUserPosts(userPostsArray.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserPosts();
  }, []);

  return (
    <>
      <div className={classes["profile-data"]}>
        <ProfileData />
        <div className={classes["profile-user-posts"]}>
          <UserPosts posts={userPosts} user={user} />
        </div>
      </div>
      <div className={classes["right-menu"]}></div>
    </>
  );
};

export default DashboardProfile;
