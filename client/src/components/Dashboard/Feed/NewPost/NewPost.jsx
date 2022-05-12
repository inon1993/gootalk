import classes from "./NewPost.module.css";
import { AccountCircleRounded, ImageRounded } from "@mui/icons-material";

const NewPost = () => {
  return (
    <div className={classes["new-post"]}>
      <div className={classes["new-post-upper"]}>
        <AccountCircleRounded className={classes["new-post-profile-logo"]} />
        <input
          className={classes["new-post-input"]}
          placeholder="What's on your mind Inon?"
        />
      </div>

      <br className={classes["new-post-br"]} />
      <div className={classes["new-post-features"]}>
        <ImageRounded className={classes["new-post-add-img"]} />
      </div>
      <button className={classes["share-post"]}>Share</button>
    </div>
  );
};

export default NewPost;
