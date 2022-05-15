import classes from "./NewPost.module.css";
import { AccountCircleRounded, ImageRounded } from "@mui/icons-material";

const NewPost = () => {
  return (
    <div className={classes["new-post"]}>
      <div className={classes["new-post-upper"]}>
        <AccountCircleRounded className={classes["new-post-profile-logo"]} />
        <input
          className={classes["new-post-input"]}
          placeholder="What's on your mind, Inon?"
        />
      </div>
      <hr className={classes["new-post-br"]} />
      <div className={classes["new-post-features"]}>
        <div className={classes["new-post-add-img"]}>
          <ImageRounded className={classes["new-post-add-img-icon"]} />
          <span className={classes["new-post-add-img-text"]}>Add a Photo</span>
        </div>

        <button className={classes["share-post"]}>Share</button>
      </div>
    </div>
  );
};

export default NewPost;
