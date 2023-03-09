import classes from "./NewPost.module.css";
import { RemoveCircleOutline } from "@mui/icons-material";
import ppIcon from "../../../../images/pp-icon-small.png";
import Card from "../../../UI/Card/Card";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { userActions } from "../../../../store/user-slice";
import useLogout from "../../../../hooks/useLogout";
import UploadPostImg from "./UploadPostImg/UploadPostImg";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { getPictureUrl } from "../../../../api/uploadImg/uploadImg";

const NewPost = ({
  releseEndPosts,
  resetUsers,
  resetPosts,
  getPage,
  loading,
  pageStart,
  getPosts,
}) => {
  const user = useSelector((state) => state.user.user);
  const [newPostLoading, setNewPostLoading] = useState(false);
  const [img, setImg] = useState({ type: "", file: "" });
  const [post, setPost] = useState({
    userId: user.userId,
    desc: "",
  });

  const req = useAxiosPrivate();
  const navigate = useNavigate();
  const dispach = useDispatch();
  const location = useLocation();
  const logout = useLogout();

  useEffect(() => {
    setNewPostLoading(false);
  }, []);

  const sharePostHandler = async () => {
    setNewPostLoading(true);
    let imgUrl = "";
    try {
      if (img.file !== "") {
        imgUrl = await getPictureUrl(img, "post");
      }
      if (imgUrl === "" && post.desc === "") {
        setNewPostLoading(false);
        return;
      }
      await req.post("/post", { ...post, image: imgUrl });
      const page = getPage;
      pageStart(0);
      resetUsers([]);
      resetPosts([]);
      releseEndPosts(false);
      loading(true);
      setPost((prev) => {
        return {
          ...prev,
          desc: "",
          image: "",
        };
      });
      setImg({ type: "", file: "" });
      if (page === 0) {
        getPosts();
      }
      setNewPostLoading(false);
    } catch (error) {
      if (navigator.onLine) {
        await logout();
        navigate("/login", { state: { from: location }, replace: true });
        dispach(userActions.logoutUser());
      }
      setNewPostLoading(false);
    }
  };

  return (
    <Card className={classes["new-post"]}>
      <div className={classes["new-post-upper"]}>
        <img
          className={classes["new-post-profile-logo"]}
          src={user.profilePicture || ppIcon}
          alt="profile"
        />
        <textarea
          className={classes["new-post-input"]}
          placeholder={`What's on your mind, ${user?.firstname}?`}
          wrap="soft"
          value={post.desc}
          onChange={(e) =>
            setPost((prev) => {
              return {
                ...prev,
                desc: e.target.value,
              };
            })
          }
        />
      </div>
      <hr className={classes["new-post-br"]} />
      <div className={classes["new-post-features"]}>
        <UploadPostImg imgToSet={setImg} />
        <button
          className={classes["share-post"]}
          onMouseDown={sharePostHandler}
          disabled={newPostLoading}
        >
          {newPostLoading ? (
            <CircularProgress style={{ color: "white" }} size="20px" />
          ) : (
            "Share"
          )}
        </button>
      </div>
      {img.type === "error" && (
        <div className={classes["file-error"]}>
          <span className={classes["file-error-text"]}>{img.file}</span>
        </div>
      )}
      <div className={classes["preview-img-wrapper"]}>
        {img.type === "image" && (
          <img
            className={classes["preview-img"]}
            src={img.file}
            alt="preview"
          />
        )}
        {img.type === "video" && (
          <video className={classes["video-insert"]} controls>
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
    </Card>
  );
};

export default NewPost;
