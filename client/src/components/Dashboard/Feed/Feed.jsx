import classes from "./Feed.module.css";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";

const Feed = () => {
  return (
    <div className={classes.feed}>
      <NewPost />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Feed;
