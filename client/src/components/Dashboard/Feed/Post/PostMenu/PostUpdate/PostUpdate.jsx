import Card from "../../../../../UI/Card/Card";
import classes from "./PostUpdate.module.css";
import { format } from "timeago.js";
import { useState, useRef, useEffect } from "react";
import ppIcon from "../../../../../../images/pp-icon-small.png";
import UploadPostImg from "../../../NewPost/UploadPostImg/UploadPostImg";
import { RemoveCircleOutline } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import { getPictureUrl } from "../../../../../../api/uploadImg/uploadImg";

const PostUpdate = ({
  post,
  postUser,
  checkOnUserHandler,
  onClose,
  postUpdated,
  setPostUpdated,
}) => {
  const [newPost, setNewPost] = useState({ desc: postUpdated.desc });
  const [img, setImg] = useState({ type: "", file: postUpdated.image });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState({ status: "", msg: "" });
  const bodyRef = useRef();
  const req = useAxiosPrivate();

  useEffect(() => {
    bodyRef.current.focus();
  }, []);

  useEffect(() => {
    if (img.file === "" && newPost.desc === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [img, newPost]);

  const editHandler = (e) => {
    setNewPost({
      desc: e.target.value,
    });
  };

  const updateHandler = async () => {
    setIsLoading(true);
    if (
      (newPost.desc === post.desc && img.file === post.image) ||
      (newPost.desc === "" && img.file === "")
    ) {
      setIsLoading(false);
      setIsDisabled(true);
      return;
    }
    setIsDisabled(false);
    try {
      let imgUrl = "";
      if (img.file !== "" && img.file !== post.image) {
        imgUrl = await getPictureUrl(img, "post");
      }
      const updatedPost = await req.put(`/post/${post._id}`, {
        userId: post.userId,
        ...newPost,
        ...(img.file !== post.image && { image: imgUrl }),
      });
      setPostUpdated({ ...updatedPost.data.data });
      setError({ status: "success", msg: updatedPost.data.msg });
      setIsLoading(false);
      setTimeout(() => {
        setError({ status: "", msg: "" });
      }, 2500);
    } catch (error) {
      setError({ status: "error", msg: error.response.data });
      setIsLoading(false);
      setTimeout(() => {
        setError({ status: "", msg: "" });
      }, 2500);
    }
  };

  return (
    <div className={classes["post-update-wrapper"]}>
      <div>
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
          <span className={classes["post-time"]}>{format(post.createdAt)}</span>
        </div>
        <div className={classes["post-body"]}>
          <textarea
            ref={bodyRef}
            className={classes["update-post-body"]}
            name="desc"
            defaultValue={postUpdated.desc}
            onChange={editHandler}
            placeholder={`What's on your mind, ${postUser.firstname}?`}
          />
          <UploadPostImg imgToSet={setImg} />
          {img.file && img.type !== "error" && (
            <div className={classes["preview-img-wrapper"]}>
              {(postUpdated.image.includes(".png") &&
                img.file === postUpdated.image) ||
              (postUpdated.image.includes(".jpg") &&
                img.file === postUpdated.image) ||
              img.type === "image" ? (
                <img
                  className={classes["preview-img"]}
                  name="image"
                  src={img.file}
                  alt="post img"
                />
              ) : (
                <video
                  name="image"
                  className={classes["video-insert"]}
                  controls
                >
                  <source type="video/mp4" src={img.file} />
                </video>
              )}
              {img.file !== "" && img.type !== "error" && (
                <RemoveCircleOutline
                  className={classes["remove-img-icon"]}
                  onClick={() => setImg({ type: "", file: "" })}
                />
              )}
            </div>
          )}
        </div>
        {img.type === "error" && (
          <div className={classes["file-error"]}>
            <span
              className={`${classes["file-error-text"]} ${classes["error-text"]}`}
            >
              {img.file}
            </span>
          </div>
        )}
        {error.msg !== "" && (
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
        <div className={classes["post-update-btns"]}>
          <button
            className={classes["update-btn"]}
            onMouseDown={updateHandler}
            disabled={isLoading || isDisabled}
          >
            {isLoading ? (
              <CircularProgress style={{ color: "white" }} size="20px" />
            ) : (
              "Update"
            )}
          </button>
          <button
            className={classes["cancel-btn"]}
            disabled={isLoading}
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostUpdate;
