import classes from "./UserPosts.module.css";
import Post from "../Feed/Post/Post";

const UserPosts = () => {
  return (
    <div className={classes["profile-posts"]}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default UserPosts;
