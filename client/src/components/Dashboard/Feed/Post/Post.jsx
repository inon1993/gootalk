import { ThumbUp } from "@mui/icons-material";
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

const Post = React.forwardRef(({ post, postUser }, ref) => {
  const loggedInUser = useSelector((state) => state.user.user);
  const [comments, setComments] = useState({ comments: [], users: [] });
  const [likes, setLikes] = useState(post.likes);
  const [isExpendedPost, setExpendedPost] = useState(false);
  const req = useAxiosPrivate();
  const dispach = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    try {
      const commentsData = await req.get(`/comment/${post._id}`);
      setComments(commentsData.data);
    } catch (error) {
      dispach(userActions.logoutUser());
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const likeHandler = async () => {
    try {
      const updatedLikes = await req.put(`/post/${post._id}/like`, {
        userId: loggedInUser.userId,
      });
      setLikes(updatedLikes.data);
    } catch (error) {
      dispach(userActions.logoutUser());
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const checkOnUserHandler = () => {
    navigate(
      `/users/${postUser._id}/${postUser.firstname}-${postUser.lastname}`
    );
  };

  const onClose = () => {
    setExpendedPost(false);
  };

  return (
    <>
      {isExpendedPost && (
        <PostModal
          post={post}
          postUser={postUser}
          onClose={onClose}
          likes={likes}
          setLikes={setLikes}
          comments={comments}
          setComments={setComments}
        />
      )}
      <div className={classes["post-wrapper-for-ref"]} ref={ref}>
        <Card className={classes.post}>
          <div className={classes["post-upper"]}>
            <img
              className={classes["post-profile-img"]}
              src={postUser.profilePicture || ppIcon}
              alt={"profile"}
              onClick={checkOnUserHandler}
            />
            <span
              className={classes["post-name"]}
            >{`${postUser.firstname} ${postUser.lastname}`}</span>
            <span className={classes["post-time"]}>
              {format(post.createdAt)}
            </span>
          </div>
          <div
            className={classes["post-body"]}
            onClick={() => setExpendedPost(true)}
          >
            <p className={classes["post-body-text"]}>{post.desc}</p>
            {post.image &&
              (post.image.includes("/image/") ? (
                <img
                  className={classes["post-img"]}
                  src={post.image}
                  alt="post img"
                />
              ) : (
                <div>
                  <video className={classes["post-video"]} controls>
                    <source type="video/mp4" src={post.image} />
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
            <span className={classes["post-comment-text"]}>
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
