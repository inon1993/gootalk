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

const NewPost = ({ onReload, resetUsers, resetPosts, loading, pageStart }) => {
  const user = useSelector((state) => state.user.user);
  const [img, setImg] = useState("");
  const [post, setPost] = useState({
    userId: user.userId,
    desc: "",
  });
  const req = useAxiosPrivate();
  const navigate = useNavigate();
  const dispach = useDispatch();
  const location = useLocation();
  const logout = useLogout();

  const sharePostHandler = async () => {
    let imgUrl = "";
    try {
      if (img) {
        imgUrl = await profilePictureUrl(img);
      }
      await req.post("/post", { ...post, image: imgUrl });
      pageStart(0);
      resetUsers([]);
      resetPosts([]);
      loading(true);
      onReload();
      setPost((prev) => {
        return {
          ...prev,
          desc: "",
          image: "",
        };
      });
      setImg();
    } catch (error) {
      await logout();
      navigate("/login", { state: { from: location }, replace: true });
      dispach(userActions.logoutUser());
    }
  };

  const profilePictureUrl = async (postImg) => {
    if (postImg) {
      const imgUrl = await req.post("/post/uploadImg", { image: postImg });
      return imgUrl.data.url;
    } else {
      return null;
    }
  };

  return (
    <Card className={classes["new-post"]}>
      <div className={classes["new-post-upper"]}>
        <img
          className={classes["new-post-profile-logo"]}
          src={user?.profilePicture || ppIcon}
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
        <button className={classes["share-post"]} onClick={sharePostHandler}>
          Share
        </button>
      </div>
      <div className={classes["preview-img-wrapper"]}>
        {img && (
          <img className={classes["preview-img"]} src={img} alt="preview" />
        )}
        {img && (
          <RemoveCircleOutline
            className={classes["remove-img-icon"]}
            onClick={() => setImg()}
          />
        )}
      </div>
    </Card>
  );
};

export default NewPost;
