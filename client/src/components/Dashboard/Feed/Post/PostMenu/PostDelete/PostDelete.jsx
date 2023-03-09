import classes from "./PostDelete.module.css";
import Modal from "../../../../../UI/Modal/Modal";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import useLogout from "../../../../../../hooks/useLogout";
import { userActions } from "../../../../../../store/user-slice";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const PostDelete = ({ post, posts, setPosts, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: "", msg: "" });
  const req = useAxiosPrivate();
  const user = useSelector((state) => state.user.user);
  const dispach = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const deletePostHandler = async () => {
    setIsLoading(true);
    try {
      await req.delete(`/post/${post._id}/${user.userId}`);
      const newArr = posts.filter((p) => {
        return p._id !== post._id;
      });
      setError({ status: "success", msg: "Post deleted successfully." });
      setIsLoading(false);
      setTimeout(() => {
        setError({ status: "", msg: "" });
        setPosts(newArr);
        onClose();
      }, 2500);
    } catch (error) {
      console.log(error);
      setError({ status: "error", msg: error.response.data });
      setTimeout(async () => {
        setError({ status: "", msg: "" });
        setIsLoading(false);
        if (navigator.onLine) {
          await logout();
          navigate("/login", { state: { from: location }, replace: true });
          dispach(userActions.logoutUser());
        }
      }, 2500);
    }
  };

  return (
    <Modal onClose={() => onClose()}>
      <div className={classes["delete-post-wrapper"]}>
        <span className={classes["modal-title"]}>Delete post?</span>
        {error.status === "error" && (
          <div className={classes["file-error"]}>
            <p
              className={`${classes["file-error-text"]} ${
                error.status === "error"
                  ? classes["error-text"]
                  : classes["success-text"]
              }`}
            >
              {error.msg}
            </p>
          </div>
        )}
        {error.status === "success" ? (
          <div className={classes["file-error"]}>
            <p
              className={`${classes["file-error-text"]} ${
                error.status === "error"
                  ? classes["error-text"]
                  : classes["success-text"]
              }`}
            >
              {error.msg}
            </p>
          </div>
        ) : (
          <div className={classes.actions}>
            <button
              className={classes.delete}
              disabled={isLoading}
              onClick={deletePostHandler}
            >
              {isLoading ? (
                <CircularProgress style={{ color: "white" }} size="20px" />
              ) : (
                "Delete"
              )}
            </button>
            <button
              className={classes.cancel}
              disabled={isLoading}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PostDelete;
