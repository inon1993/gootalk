import { ThumbUp } from "@mui/icons-material";
import ppIcon from "../../../../images/pp-icon-small.png";
import classes from "./Post.module.css";
import Card from "../../../UI/Card/Card";
import React, { useState } from "react";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../store/user-slice";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const Post = React.forwardRef(({ post, postUser, update }, ref) => {
  const loggedInUser = useSelector((state) => state.user.user);
  const [liked, setLiked] = useState(post.likes.includes(loggedInUser.userId));
  const [likes, setLikes] = useState(
    liked ? post.likes.length - 1 : post.likes.length
  );
  const req = useAxiosPrivate();
  const dispach = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const likeHandler = async () => {
    try {
      await req.put(`/post/${post._id}/like`, {
        userId: loggedInUser.userId,
      });
      setLikes(post.likes.length);
      setLiked(!liked);
    } catch (error) {
      dispach(userActions.logoutUser());
      navigate("/login", { state: { from: location }, replace: true });
    }
    update(1);
  };

  return (
    <div className={classes["post-wrapper-for-ref"]} ref={ref}>
      <Card className={classes.post}>
        <div className={classes["post-upper"]}>
          <img
            className={classes["post-profile-img"]}
            src={postUser.profilePicture || ppIcon}
            alt={"profile"}
          />
          <span
            className={classes["post-name"]}
          >{`${postUser.firstname} ${postUser.lastname}`}</span>
          <span className={classes["post-time"]}>{format(post.createdAt)}</span>
        </div>
        <div className={classes["post-body"]}>
          <p className={classes["post-body-text"]}>{post.desc}</p>
          {post.image && (
            <img
              className={classes["post-img"]}
              src={post.image}
              alt="post img"
            />
          )}
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
    </div>
  );
});

export default Post;
