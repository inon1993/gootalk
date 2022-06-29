import classes from "./NewPost.module.css";
import { ImageRounded } from "@mui/icons-material";
import ppIcon from "../../../../images/pp-icon.png";
import Card from "../../../UI/Card/Card";
import { useState } from "react";
import { useSelector } from "react-redux";
import useRequest from "../../../../hooks/useRequest";

const NewPost = ({ onReload }) => {
  const user = useSelector((state) => state.user.user);
  const [post, setPost] = useState({ userId: user.userId, desc: "" });
  const sendPost = useRequest("/post", "POST", post);

  const sharePostHandler = async () => {
    await sendPost();
    onReload();
    setPost((prev) => {
      return {
        ...prev,
        desc: "",
      };
    })
  };

  return (
    <Card className={classes["new-post"]}>
      <div className={classes["new-post-upper"]}>
        <img
          className={classes["new-post-profile-logo"]}
          src={user?.profilePicture || ppIcon}
          alt="profile"
        />
        <textarea
          className={classes["new-post-input"]}
          placeholder="What's on your mind, Inon?"
          wrap="soft"
          value={post.desc}
          onChange={(e) =>
            setPost((prev) => {
              return {
                ...prev,
                desc: e.target.value,
              };
            })
          }
        />
      </div>
      <hr className={classes["new-post-br"]} />
      <div className={classes["new-post-features"]}>
        <div className={classes["new-post-add-img"]}>
          <ImageRounded className={classes["new-post-add-img-icon"]} />
          <span className={classes["new-post-add-img-text"]}>Add a Photo</span>
        </div>

        <button className={classes["share-post"]} onClick={sharePostHandler}>
          Share
        </button>
      </div>
    </Card>
  );
};

export default NewPost;
