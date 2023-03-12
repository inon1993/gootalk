import { MoreVert, ThumbUp } from "@mui/icons-material";
import ppIcon from "../../../../images/pp-icon-small.png";
import classes from "./Post.module.css";
import Card from "../../../UI/Card/Card";
import React, { useState, useEffect } from "react";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../store/user-slice";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import PostModal from "./PostModal/PostModal";
import useLogout from "../../../../hooks/useLogout";
import PostMenu from "./PostMenu/PostMenu";
import PostDelete from "./PostMenu/PostDelete/PostDelete";

const Post = React.forwardRef(({ post, postUser, posts, setPosts }, ref) => {
  const loggedInUser = useSelector((state) => state.user.user);
  const [postUpdated, setPostUpdated] = useState(post);
  const [comments, setComments] = useState({ comments: [], users: [] });
  const [likes, setLikes] = useState(post.likes);
  const [isExpendedPost, setExpendedPost] = useState(false);
  const [isUpdatePost, setUpdatePost] = useState(false);
  const [isDeletePost, setIsDeletePost] = useState(false);
  const [isPostMenu, setPostMenu] = useState(false);
  const [slice, setSlice] = useState(150);
  const req = useAxiosPrivate();
  const dispach = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    try {
      const commentsData = await req.get(`/comment/${post._id}`);
      setComments(commentsData.data);
    } catch (error) {
      await logout();
      navigate("/login", { state: { from: location }, replace: true });
      dispach(userActions.logoutUser());
    }
  };

  const likeHandler = async () => {
    try {
      const updatedLikes = await req.put(`/post/${post._id}/like`, {
        userId: loggedInUser.userId,
      });
      setLikes(updatedLikes.data);
    } catch (error) {
      if (navigator.onLine) {
        await logout();
        navigate("/login", { state: { from: location }, replace: true });
        dispach(userActions.logoutUser());
      }
    }
  };

  const checkOnUserHandler = () => {
    navigate(
      `/users/${postUser._id || postUser.userId}/${postUser.firstname}-${
        postUser.lastname
      }`
    );
  };

  const onClose = () => {
    setExpendedPost(false);
    setUpdatePost(false);
  };

  const onCloseDelete = () => {
    setIsDeletePost(false);
  };

  return (
    <>
      {isDeletePost && (
        <PostDelete
          post={post}
          posts={posts}
          setPosts={setPosts}
          onClose={onCloseDelete}
        />
      )}
      {isExpendedPost && (
        <PostModal
          post={post}
          postUser={postUser}
          onClose={onClose}
          likes={likes}
          setLikes={setLikes}
          comments={comments}
          setComments={setComments}
          isUpdatePost={isUpdatePost}
          postUpdated={postUpdated}
          setPostUpdated={setPostUpdated}
        />
      )}
      <div className={classes["post-wrapper-for-ref"]} ref={ref}>
        <Card className={classes.post}>
          <div className={classes["post-upper"]}>
            <div className={classes["post-profile-name"]}>
              <img
                className={classes["post-profile-img"]}
                src={postUser.profilePicture || ppIcon}
                alt={"profile"}
                onClick={checkOnUserHandler}
              />
              <span
                className={classes["post-name"]}
                onClick={checkOnUserHandler}
              >{`${postUser.firstname} ${postUser.lastname}`}</span>
              <span className={classes["post-time"]}>
                {format(post.createdAt)}
              </span>
            </div>
            {post.userId === loggedInUser.userId && (
              <div
                className={classes["post-menu"]}
                onClick={() => setPostMenu(true)}
              >
                <button
                  className={classes["post-menu-button"]}
                  onFocus={() => setPostMenu(true)}
                  onBlur={() => setPostMenu(false)}
                >
                  <MoreVert />
                </button>
                {isPostMenu && (
                  <PostMenu
                    post={post}
                    posts={posts}
                    setPosts={setPosts}
                    setUpdatePost={setUpdatePost}
                    setExpendedPost={setExpendedPost}
                    setIsDeletePost={setIsDeletePost}
                    isPostMenu={isPostMenu}
                  />
                )}
              </div>
            )}
          </div>
          <div className={classes["post-body"]}>
            <p
              className={classes["post-body-text"]}
              onClick={() => setExpendedPost(true)}
            >
              {postUpdated.desc.length > 150 ? (
                <span>{postUpdated.desc.slice(0, slice)}</span>
              ) : (
                postUpdated.desc
              )}
            </p>
            {slice === 150 && postUpdated.desc.length > 150 ? (
              <span
                className={classes["post-read-more-less"]}
                onClick={() => setSlice(postUpdated.desc.length)}
              >
                ... read more
              </span>
            ) : (
              postUpdated.desc.length > 150 && (
                <span
                  className={classes["post-read-more-less"]}
                  onClick={() => setSlice(150)}
                >
                  {" "}
                  show less
                </span>
              )
            )}
            {postUpdated.image &&
              (postUpdated.image.includes("/image/") ? (
                <div
                  className={classes["img-video-wrapper"]}
                  onClick={() => setExpendedPost(true)}
                >
                  <img
                    className={classes["post-img"]}
                    src={postUpdated.image}
                    alt="post img"
                  />
                </div>
              ) : (
                <div className={classes["img-video-wrapper"]}>
                  <video className={classes["post-video"]} controls>
                    <source type="video/mp4" src={postUpdated.image} />
                  </video>
                </div>
              ))}
          </div>
          <div className={classes["post-like-comments"]}>
            <div className={classes["post-like"]}>
              {post.userId !== loggedInUser.userId && (
                <ThumbUp
                  className={`${classes["post-like-icon"]} ${
                    likes.includes(loggedInUser.userId) &&
                    classes["post-liked-icon"]
                  }`}
                  onClick={likeHandler}
                />
              )}
              <span className={classes["post-like-text"]}>
                {likes.includes(loggedInUser.userId) && "You and "}{" "}
                <span style={{ fontWeight: "bold" }}>
                  {likes.includes(loggedInUser.userId)
                    ? likes.length - 1
                    : likes.length}
                </span>{" "}
                people like it
              </span>
            </div>
            <span
              className={classes["post-comment-text"]}
              onClick={() => setExpendedPost(true)}
            >
              <span style={{ fontWeight: "bold" }}>
                {comments.comments.length}
              </span>{" "}
              comments
            </span>
          </div>
        </Card>
      </div>
    </>
  );
});

export default Post;
