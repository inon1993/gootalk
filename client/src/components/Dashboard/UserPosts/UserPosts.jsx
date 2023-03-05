import classes from "./UserPosts.module.css";
import Post from "../Feed/Post/Post";

const UserPosts = ({ posts, user, setPosts }) => {
  return (
    <div className={classes["profile-posts"]}>
      {posts?.map((post, i) => {
        return (
          <Post
            key={i}
            post={post}
            postUser={user}
            posts={posts}
            setPosts={setPosts}
          />
        );
      })}
    </div>
  );
};

export default UserPosts;
