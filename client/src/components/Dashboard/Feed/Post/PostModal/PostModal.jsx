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

const PostModal = ({
  post,
  postUser,
  onClose,
  likes,
  setLikes,
  comments,
  setComments,
}) => {
  const loggedInUser = useSelector((state) => state.user.user);
  const req = useAxiosPrivate();
  const dispach = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <Modal onClose={() => onClose()}>
      <div className={classes.post}>
        <div className={classes["post-upper"]}>
          <img
            className={classes["post-profile-img"]}
            src={postUser.profilePicture || ppIcon}
            alt={"profile"}
            //   onClick={checkOnUserHandler}
          />
          <span
            className={classes["post-name"]}
          >{`${postUser.firstname} ${postUser.lastname}`}</span>
          <span className={classes["post-time"]}>{format(post.createdAt)}</span>
        </div>
        <div
          className={classes["post-body"]}
          // onClick={() => setExpendedPost(true)}
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
        {
          <div className={classes["post-modal-comments"]}>
            <PostComments
              post={post}
              comments={comments}
              setComments={setComments}
            />
          </div>
        }
      </div>
    </Modal>
  );
};

export default PostModal;
