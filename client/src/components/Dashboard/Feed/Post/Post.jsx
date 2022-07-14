import { ThumbUp } from "@mui/icons-material";
import ppIcon from "../../../../images/pp-icon.png";
import classes from "./Post.module.css";
import Card from "../../../UI/Card/Card";
import { useState, useEffect } from "react";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "../../../../hooks/useRequest";
import { userActions } from "../../../../store/user-slice";
import { useNavigate, useLocation } from "react-router-dom";

const Post = ({ post, update }) => {
  const [user, setUser] = useState({});
  const loggedInUser = useSelector((state) => state.user.user);
  const [liked, setLiked] = useState(post.likes.includes(loggedInUser.userId));
  const [likes, setLikes] = useState(
    liked ? post.likes.length - 1 : post.likes.length
  );
  const postUserPromise = useRequest(`/user/${post.userId}`, "GET");
  const like = useRequest(`/post/${post._id}/like`, "PUT", {
    userId: loggedInUser.userId,
  });
  const dispach = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getPostUser = async () => {
      try {
        const postUser = await postUserPromise();
        setUser(postUser);
      } catch (error) {
        dispach(userActions.logoutUser());
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getPostUser();
  }, [post]);

  const likeHandler = async () => {
    try {
      await like();
      setLikes(post.likes.length);
      setLiked(!liked);
    } catch (error) {}
    update(1);
  };

  return (
    user && (
      <Card className={classes.post}>
        <div className={classes["post-upper"]}>
          <img
            className={classes["post-profile-img"]}
            src={user?.profilePicture || ppIcon}
            alt={"profile"}
          />
          <span
            className={classes["post-name"]}
          >{`${user?.firstname} ${user?.lastname}`}</span>
          <span className={classes["post-time"]}>{format(post.createdAt)}</span>
        </div>
        <div className={classes["post-body"]}>
          <p className={classes["post-body-text"]}>{post.desc}</p>
          <img
            className={classes["post-img"]}
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Arkansas_Black_apples_%28cropped%29.jpg"
            alt="post img"
          />
        </div>
        <div className={classes["post-like"]}>
          {post.userId !== loggedInUser.userId && (
            <ThumbUp
              className={`${classes["post-like-icon"]} ${
                liked && classes["post-liked-icon"]
              }`}
              onClick={likeHandler}
            />
          )}
          <span className={classes["post-like-text"]}>
            {liked && "You and "}{" "}
            <span style={{ fontWeight: "bold" }}>{likes}</span> people like it
          </span>
        </div>
      </Card>
    )
  );
};

export default Post;
