import classes from "./UserPosts.module.css";
import Post from "../Feed/Post/Post";

const UserPosts = ({ posts, user }) => {
  return (
    <div className={classes["profile-posts"]}>
      {posts?.map((post, i) => {
        return <Post key={i} post={post} postUser={user} />;
      })}
    </div>
  );
};

export default UserPosts;
