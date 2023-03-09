import classes from "./PostComments.module.css";
import { AddComment } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { userActions } from "../../../../../../store/user-slice";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Comment from "./Comment/Comment";
import useLogout from "../../../../../../hooks/useLogout";

const PostComments = ({ post, comments, setComments, onClose }) => {
  const loggedInUser = useSelector((state) => state.user.user);
  const [comment, setComment] = useState({
    postId: post._id,
    userId: loggedInUser.userId,
    desc: "",
  });

  const req = useAxiosPrivate();
  const dispach = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const saveComment = async () => {
    if (comment.desc === "") {
      return;
    }
    try {
      const commentData = await req.post("/comment/", comment);
      setComments(commentData.data);
      setComment((prev) => {
        return {
          ...prev,
          desc: "",
        };
      });
    } catch (error) {
      if (navigator.onLine) {
        await logout();
        navigate("/login", { state: { from: location }, replace: true });
        dispach(userActions.logoutUser());
      }
    }
  };

  return (
    <>
      <div className={classes["comments-wrapper"]}>
        <div className={classes["new-comment-wrapper"]}>
          <textarea
            className={classes["new-comment-input"]}
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
          <button
            className={classes["add-comment-button"]}
            type="button"
            onClick={saveComment}
          >
            {<AddComment className={classes["add-comment-icon"]} />}
          </button>
        </div>
      </div>
      {comments.comments.length > 0 ? (
        <div className={classes["comments-section"]}>
          {comments.comments.map((c, i) => {
            return (
              <Comment
                key={i}
                comment={c}
                commentUser={comments.users[i]}
                onClose={onClose}
              />
            );
          })}
        </div>
      ) : (
        <div className={classes["no-comments"]}>
          <span>Be the first to comment...</span>
        </div>
      )}
    </>
  );
};

export default PostComments;
