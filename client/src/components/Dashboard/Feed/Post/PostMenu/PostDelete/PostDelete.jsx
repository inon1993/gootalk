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
      setPosts(newArr);
      setIsLoading(false);
      onClose();
    } catch (error) {
      setIsLoading(false);
      await logout();
      navigate("/login", { state: { from: location }, replace: true });
      dispach(userActions.logoutUser());
    }
  };

  return (
    <Modal onClose={() => onClose()}>
      <div className={classes["delete-post-wrapper"]}>
        <span className={classes["modal-title"]}>Delete post?</span>
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
      </div>
    </Modal>
  );
};

export default PostDelete;
