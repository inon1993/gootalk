import classes from "./Feed.module.css";
import NewPost from "./NewPost/NewPost";

const Feed = () => {
  return (
    <div className={classes.feed}>
      <NewPost />
    </div>
  );
};

export default Feed;
