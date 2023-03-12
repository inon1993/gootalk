import Card from "../../../../UI/Card/Card";
import classes from "./PostMenu.module.css";

const PostMenu = ({
  post,
  setUpdatePost,
  setExpendedPost,
  setIsDeletePost,
  isPostMenu,
}) => {
  const postCreatedAt = new Date(post.createdAt);

  const updatePostHandler = () => {
    setExpendedPost(true);
    setUpdatePost(true);
  };

  const deletePost = () => {
    setIsDeletePost(true);
  };

  return (
    <>
      <Card
        className={`${classes["post-menu-wrapper"]} ${
          isPostMenu && classes["post-menu-on"]
        }`}
      >
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
              onMouseDown={deletePost}
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
