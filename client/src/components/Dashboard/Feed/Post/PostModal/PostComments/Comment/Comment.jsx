import classes from "./Comment.module.css";
import useAxiosPrivate from "../../../../../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../../../../store/user-slice";
import ppImg from "../../../../../../../images/pp-icon-small.png";
import { format } from "timeago.js";
import { ThumbUp } from "@mui/icons-material";
import useLogout from "../../../../../../../hooks/useLogout";

const Comment = ({ comment, commentUser, onClose }) => {
  const [likes, setLikes] = useState(comment.likes);
  const loggedInUser = useSelector((state) => state.user.user);
  const [slice, setSlice] = useState(100);
  const req = useAxiosPrivate();
  const dispach = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  useEffect(() => {
    getCommentLikes();
  }, []);

  const getCommentLikes = async () => {
    try {
      const likesData = await req.get(`/comment/likes/${comment._id}`);
      setLikes(likesData.data);
    } catch (error) {
      if (navigator.onLine) {
        await logout();
        navigate("/login", { state: { from: location }, replace: true });
        dispach(userActions.logoutUser());
      }
    }
  };

  const likeHandler = async () => {
    try {
      const updatedLikes = await req.put(`/comment/${comment._id}/like`, {
        userId: loggedInUser.userId,
      });
      setLikes(updatedLikes.data);
    } catch (error) {
      dispach(userActions.logoutUser());
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const checkOnUserHandler = () => {
    onClose();
    navigate(
      `/users/${commentUser._id}/${commentUser.firstname}-${commentUser.lastname}`
    );
  };

  return (
    <div className={classes["comment-wrapper"]}>
      <div className={classes["comment-upper"]}>
        <img
          className={classes["comment-profile-picture"]}
          src={commentUser?.profilePicture || ppImg}
          alt="profile"
          onClick={checkOnUserHandler}
        />
        <span
          className={classes["comment-name"]}
        >{`${commentUser.firstname} ${commentUser.lastname}`}</span>
      </div>
      <div className={classes["comment-body"]}>
        <p className={classes["comment-body-text"]}>
          {comment.desc.length > 100 ? (
            <span>{comment.desc.slice(0, slice)}</span>
          ) : (
            comment.desc
          )}
        </p>
        {slice === 100 && comment.desc.length > 100 ? (
          <span
            className={classes["comment-read-more-less"]}
            onClick={() => setSlice(comment.desc.length)}
          >
            ... read more
          </span>
        ) : (
          comment.desc.length > 100 && (
            <span
              className={classes["comment-read-more-less"]}
              onClick={() => setSlice(100)}
            >
              {" "}
              show less
            </span>
          )
        )}
      </div>
      <div className={classes["comment-like-create-at"]}>
        <div className={classes["comment-like"]}>
          {comment.userId !== loggedInUser.userId && (
            <ThumbUp
              className={`${classes["comment-like-icon"]} ${
                likes.includes(loggedInUser.userId) &&
                classes["comment-liked-icon"]
              }`}
              onClick={likeHandler}
            />
          )}
          <span className={classes["comment-like-text"]}>
            {likes.includes(loggedInUser.userId) && "You and "}{" "}
            <span style={{ fontWeight: "bold" }}>
              {likes.includes(loggedInUser.userId)
                ? likes.length - 1
                : likes.length}
            </span>{" "}
            people like it
          </span>
        </div>
        <span className={classes["comment-created-at"]}>
          {format(comment.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Comment;
