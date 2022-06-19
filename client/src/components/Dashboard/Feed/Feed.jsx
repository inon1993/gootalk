import classes from "./Feed.module.css";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import useRefreshToken from "../../../hooks/useRefreshToken";
import { Refresh } from "@mui/icons-material";

const Feed = () => {
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  const refresh = useRefreshToken();

  useEffect(() => {
    const getPosts = async () => {
      console.log(user);
      const postsArray = await axios.get(`/post/timeline/${user.userId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmE4NjlkYzFkMjhiNmRmMWQ2YTNlY2EiLCJpYXQiOjE2NTUyMDQzMTZ9.F3IL4syKcEDTlh-yNCGf3fnWDgd2jIcOCVgBtMCl7C0",
        },
      });
      setPosts(postsArray.data);
    };

    getPosts();
  }, []);

  return (
    <div className={classes.feed}>
      <NewPost />
      <button
        onClick={() => {
          refresh();
        }}
      >
        Refresh
      </button>
      {posts.map((post) => {
        return <Post post={post} />;
      })}
    </div>
  );
};

export default Feed;
