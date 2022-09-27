import classes from "./PostModal.module.css";
import Modal from "../../../../UI/Modal/Modal";
import Card from "../../../../UI/Card/Card";
import ppIcon from "../../../../../images/pp-icon-small.png";
import { format } from "timeago.js";
import { ThumbUp } from "@mui/icons-material";
import { AddComment } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { userActions } from "../../../../../store/user-slice";
import { useNavigate, useLocation } from "react-router-dom";

const PostModal = ({ post, postUser, onClose }) => {
  console.log(post.likes);
  const loggedInUser = useSelector((state) => state.user.user);
  const [comment, setComment] = useState({
    postId: post._id,
    userId: loggedInUser.userId,
    desc: "",
  });
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
  };

  const saveComment = async () => {
    if (comment.desc === "") {
      return;
    }
    try {
      await req.post("/comment/", comment);
    } catch (error) {
      navigate("/login", { state: { from: location }, replace: true });
      dispach(userActions.logoutUser());
    }
  };

  return (
    <Modal onClose={() => onClose()}>
      <Card className={classes.post}>
        <div className={classes["post-upper"]}>
          <img
            className={classes["post-profile-img"]}
            src={postUser.profilePicture || ppIcon}
            alt={"profile"}
            //   onClick={checkOnUserHandler}
          />
          <span
            className={classes["post-name"]}
          >{`${postUser.firstname} ${postUser.lastname}`}</span>
          <span className={classes["post-time"]}>{format(post.createdAt)}</span>
        </div>
        <div
          className={classes["post-body"]}
          // onClick={() => setExpendedPost(true)}
        >
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
        <div>
          <textarea
            className={classes["new-post-input"]}
            placeholder={"Add your comment..."}
            wrap="soft"
            value={comment.desc}
            onChange={(e) =>
              setComment((prev) => {
                return {
                  ...prev,
                  desc: e.target.value,
                };
              })
            }
          />
          <button type="button" onClick={saveComment}>
            {<AddComment />}
          </button>
        </div>
      </Card>
    </Modal>
  );
};

export default PostModal;
