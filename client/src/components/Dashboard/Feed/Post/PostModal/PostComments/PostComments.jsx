import classes from "./PostComments.module.css";
import { AddComment } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { userActions } from "../../../../../../store/user-slice";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Comment from "./Comment/Comment";

const PostComments = ({ post, comments, setComments }) => {
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

  const saveComment = async () => {
    if (comment.desc === "") {
      return;
    }
    try {
      const commentData = await req.post("/comment/", comment);
      setComments((prev) => {
        return [commentData.data, ...prev];
      });
      setComment((prev) => {
        return {
          ...prev,
          desc: "",
        };
      })
    } catch (error) {
      navigate("/login", { state: { from: location }, replace: true });
      dispach(userActions.logoutUser());
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
      <div className={classes["comments-section"]}>
        {comments.map((c) => {
          return <Comment comment={c} />;
        })}
      </div>
    </>
  );
};

export default PostComments;
