import Card from "../../../../UI/Card/Card";
import classes from "./PostMenu.module.css";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import useLogout from "../../../../../hooks/useLogout";
import { userActions } from "../../../../../store/user-slice";

const PostMenu = ({
  post,
  posts,
  setPosts,
  setUpdatePost,
  setExpendedPost,
}) => {
  const req = useAxiosPrivate();
  const user = useSelector((state) => state.user.user);
  const dispach = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const postCreatedAt = new Date(post.createdAt);

  const updatePostHandler = () => {
    setExpendedPost(true);
    setUpdatePost(true);
  };

  const deletePostHandler = async () => {
    try {
      await req.delete(`/post/${post._id}/${user.userId}`);
      const newArr = posts.filter((p) => {
        return p._id !== post._id;
      });
      setPosts(newArr);
    } catch (error) {
      await logout();
      navigate("/login", { state: { from: location }, replace: true });
      dispach(userActions.logoutUser());
    }
  };
  return (
    <>
      <Card className={classes["post-menu-wrapper"]}>
        <ul className={classes["post-menu-list"]}>
          <li className={classes["menu-item"]}>
            <button
              className={classes["post-menu-button"]}
              onMouseDown={updatePostHandler}
              disabled={postCreatedAt < new Date(2023, 1, 1)}
            >
              Update post
            </button>
          </li>
          <li
            className={`${classes["menu-item"]} ${classes["menu-item-delete"]}`}
          >
            <button
              className={`${classes["post-menu-button"]} ${classes["post-menu-button-delete"]}`}
              onMouseDown={deletePostHandler}
              disabled={postCreatedAt < new Date(2023, 1, 1)}
            >
              Delete post
            </button>
          </li>
        </ul>
      </Card>
    </>
  );
};

export default PostMenu;
