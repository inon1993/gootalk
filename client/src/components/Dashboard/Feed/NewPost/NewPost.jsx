import classes from "./NewPost.module.css";
import { AccountCircleRounded, ImageRounded } from "@mui/icons-material";
import Card from "../../../UI/Card/Card"
import { useRef } from "react";
import { useSelector } from "react-redux";
import useRequest from "../../../../hooks/useRequest";

const NewPost = () => {
  const user = useSelector((state) => state.user.user);
  const textRef = useRef();
  const sendPost = useRequest();

  const sharePostHandler = async() => {
    const endpoint = "/post/"
    const sharePost = async () => {
      const post = {
        userId: user.userId.toString(),
        desc: textRef.current.value
      }
      await sendPost(endpoint, "POST", post);
    }

    sharePost();
  }

  return (
    <Card className={classes["new-post"]}>
      <div className={classes["new-post-upper"]}>
        <AccountCircleRounded className={classes["new-post-profile-logo"]} />
        <textarea
          className={classes["new-post-input"]}
          placeholder="What's on your mind, Inon?"
          wrap="soft"
          ref={textRef}
        />
      </div>
      <hr className={classes["new-post-br"]} />
      <div className={classes["new-post-features"]}>
        <div className={classes["new-post-add-img"]}>
          <ImageRounded className={classes["new-post-add-img-icon"]} />
          <span className={classes["new-post-add-img-text"]}>Add a Photo</span>
        </div>

        <button className={classes["share-post"]} onClick={sharePostHandler}>Share</button>
      </div>
    </Card>
  );
};

export default NewPost;
