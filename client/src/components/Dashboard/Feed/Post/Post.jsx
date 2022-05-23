import { AccountCircleRounded, ThumbUp } from "@mui/icons-material";
import classes from "./Post.module.css";
import Card from "../../../UI/Card/Card"

const Post = () => {
  return (
    <Card className={classes.post}>
      <div className={classes["post-upper"]}>
        <AccountCircleRounded className={classes["post-profile-img"]} />
        <span className={classes["post-name"]}>Racheli Avramashvili</span>
        <span className={classes["post-time"]}>2 minutes ago</span>
      </div>
      <div className={classes["post-body"]}>
        <p className={classes["post-body-text"]}>
          Hi, It's my very firsy post!
        </p>
        <img className={classes["post-img"]} src="https://upload.wikimedia.org/wikipedia/commons/4/41/Arkansas_Black_apples_%28cropped%29.jpg" alt="post img" />
      </div>
      <div className={classes["post-like"]}>
        <ThumbUp className={classes["post-like-icon"]} />
        <span className={classes["post-like-text"]}>23 people like it</span>
      </div>
    </Card>
  );
};

export default Post;
