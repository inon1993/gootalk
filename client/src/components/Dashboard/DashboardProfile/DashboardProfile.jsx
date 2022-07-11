import classes from "./DashboardProfile.module.css";
import ProfileData from "../ProfileData/ProfileData";
import UserPosts from "../UserPosts/UserPosts";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const DashboardProfile = () => {

  const [userPosts, setUserPosts] = useState([]);

  // useEffect(() => {
  //   const getUserPosts = async () => {
  //     const userPostsArray = await axios.get("/post/posts/62a081329f5d1a674c7c39d2", {
  //       headers: {
  //         Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmEwODEzMjlmNWQxYTY3NGM3YzM5ZDIiLCJpYXQiOjE2NTQ2ODYwMDJ9.tPaj5MGb1zyuthjl6GYsHjwQYGIB4JlDQwDH6BBFn2M'
  //       }
  //     });
  //     console.log(userPostsArray.data);
  //     setUserPosts(userPostsArray.data);
  //   }

  //   getUserPosts()
  // }, []);

  return (
    <>
      <div className={classes["profile-data"]}>
        <ProfileData />
        <div className={classes["profile-user-posts"]}>
          <UserPosts posts={userPosts} />
        </div>
      </div>
      <div className={classes["right-menu"]}></div>
    </>
  );
};

export default DashboardProfile;
