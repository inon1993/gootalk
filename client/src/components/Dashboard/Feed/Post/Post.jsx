import { AccountCircleRounded, ThumbUp } from "@mui/icons-material";
import classes from "./Post.module.css";
import Card from "../../../UI/Card/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { useDispatch } from "react-redux";
import useRequest from "../../../../hooks/useRequest";
import { userActions} from "../../../../store/user-slice"
import { useNavigate, useLocation } from "react-router-dom";

const Post = ({ post }) => {
  const [user, setUser] = useState({});
  // const user = useSelector((state) => state.user.user);
  const endpoint = `/user/${post.userId}`;
  const postUserPromise = useRequest(endpoint);
  const dispach = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
 

  useEffect(() => {
    const getPostUser = async () => {
      try {
        const postUser = await postUserPromise();
        console.log(postUser);
        setUser(postUser.data);
      } catch (error) {
        dispach(userActions.logoutUser());
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getPostUser();
  }, [user]);

  return (
    <Card className={classes.post}>
      <div className={classes["post-upper"]}>
        <img
          className={classes["post-profile-img"]}
          src={user?.profilePicture}
        />
        <span
          className={classes["post-name"]}
        >{`${user?.firstname} ${user?.lastname}`}</span>
        <span className={classes["post-time"]}>{format(post.createdAt)}</span>
      </div>
      <div className={classes["post-body"]}>
        <p className={classes["post-body-text"]}>{post.desc}</p>
        <img
          className={classes["post-img"]}
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Arkansas_Black_apples_%28cropped%29.jpg"
          alt="post img"
        />
      </div>
      <div className={classes["post-like"]}>
        <ThumbUp className={classes["post-like-icon"]} />
        <span className={classes["post-like-text"]}>
          {post.likes.length} people like it
        </span>
      </div>
    </Card>
  );
};

export default Post;
