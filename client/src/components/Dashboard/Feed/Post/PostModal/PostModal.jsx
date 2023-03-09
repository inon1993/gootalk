import classes from "./PostModal.module.css";
import Modal from "../../../../UI/Modal/Modal";
import ppIcon from "../../../../../images/pp-icon-small.png";
import { format } from "timeago.js";
import { ThumbUp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { userActions } from "../../../../../store/user-slice";
import { useNavigate, useLocation } from "react-router-dom";
import PostComments from "./PostComments/PostComments";
import useLogout from "../../../../../hooks/useLogout";
import { useState } from "react";
import PostUpdate from "../PostMenu/PostUpdate/PostUpdate";

const PostModal = ({
  post,
  postUser,
  onClose,
  likes,
  setLikes,
  comments,
  setComments,
  isUpdatePost,
  postUpdated,
  setPostUpdated,
}) => {
  const loggedInUser = useSelector((state) => state.user.user);
  const [slice, setSlice] = useState(150);
  const req = useAxiosPrivate();
  const dispach = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

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
    onClose();
    navigate(
      `/users/${postUser._id}/${postUser.firstname}-${postUser.lastname}`
    );
  };

  return (
    <Modal onClose={() => onClose()}>
      {isUpdatePost ? (
        <PostUpdate
          post={post}
          postUser={postUser}
          checkOnUserHandler={checkOnUserHandler}
          onClose={onClose}
          postUpdated={postUpdated}
          setPostUpdated={setPostUpdated}
        />
      ) : (
        <div className={classes.post}>
          <div className={classes["post-upper"]}>
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
          <div className={classes["post-body"]}>
            <p className={classes["post-body-text"]}>
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
                <div className={classes["img-video-wrapper"]}>
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
          {loggedInUser.userId === post.userId ||
          loggedInUser.friends.includes(post.userId) ? (
            <div className={classes["post-modal-comments"]}>
              <PostComments
                post={post}
                comments={comments}
                setComments={setComments}
                onClose={onClose}
              />
            </div>
          ) : (
            <div className={classes["no-access-comments"]}>
              <span>Only friends can comment and whtch others comments...</span>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default PostModal;
