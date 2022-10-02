import classes from "./PostComments.module.css";
import { AddComment } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { userActions } from "../../../../../../store/user-slice";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Comment from "./Comment/Comment";

const PostComments = ({
  post,
  comments,
  setComments /*, commentsUsers, setCommentsUsers*/,
}) => {
  // console.log(commentsUsers);
  const loggedInUser = useSelector((state) => state.user.user);
  const [comment, setComment] = useState({
    postId: post._id,
    userId: loggedInUser.userId,
    desc: "",
  });
  const [commentsUsers, setCommentsUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const req = useAxiosPrivate();
  const dispach = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(1);
    console.log(comments);
    getCommentsUsersUpdate();
    setLoading(false);
  }, [comments]);

  const getCommentsUsersUpdate = async () => {
    // console.log(comments);
    setLoading(true);
    console.log("yes");
    const getCommentsUsers = await Promise.all(
      comments.map(async (c) => {
        return await req.get(`/user/${c.userId}`);
      })
    );
    setCommentsUsers(getCommentsUsers);
    console.log(getCommentsUsers);
    setLoading(false);
  };

  const saveComment = async () => {
    // setLoading(true)
    if (comment.desc === "") {
      return;
    }
    try {
      const commentData = await req.post("/comment/", comment);
      setComments(commentData.data);
      // await getCommentsUsersUpdate();
      setComment((prev) => {
        return {
          ...prev,
          desc: "",
        };
      });
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
            // onClick={getCommentsUsersUpdate}
          >
            {<AddComment className={classes["add-comment-icon"]} />}
          </button>
        </div>
      </div>
      {commentsUsers.length !== 0 && !loading && (
        <div className={classes["comments-section"]}>
          {comments.map((c, i) => {
            console.log(commentsUsers);
            return <Comment comment={c} commentUser={commentsUsers[i].data} />;
          })}
        </div>
      )}
    </>
  );
};

export default PostComments;
