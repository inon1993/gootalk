import { AccountCircleRounded, ThumbUp } from "@mui/icons-material";
import classes from "./Post.module.css";
import Card from "../../../UI/Card/Card"
import {useState, useEffect} from "react";
import axios from "axios";
import {format} from "timeago.js";

const Post = ({post}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getPostUser = async () => {
      const postUser = await axios.get(`/user/${post.userId}`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmEwODEzMjlmNWQxYTY3NGM3YzM5ZDIiLCJpYXQiOjE2NTQ2ODYwMDJ9.tPaj5MGb1zyuthjl6GYsHjwQYGIB4JlDQwDH6BBFn2M'
        }
      });
      console.log(postUser);
      setUser(postUser.data);
    }

    getPostUser();
  }, [])

  return (
    <Card className={classes.post}>
      <div className={classes["post-upper"]}>
        <img className={classes["post-profile-img"]} src={user.profilePicture} />
        <span className={classes["post-name"]}>{`${user.firstname} ${user.lastname}`}</span>
        <span className={classes["post-time"]}>{format(post.createdAt)}</span>
      </div>
      <div className={classes["post-body"]}>
        <p className={classes["post-body-text"]}>
          {post.desc}
        </p>
        <img className={classes["post-img"]} src="https://upload.wikimedia.org/wikipedia/commons/4/41/Arkansas_Black_apples_%28cropped%29.jpg" alt="post img" />
      </div>
      <div className={classes["post-like"]}>
        <ThumbUp className={classes["post-like-icon"]} />
        <span className={classes["post-like-text"]}>{post.likes.length} people like it</span>
      </div>
    </Card>
  );
};

export default Post;
