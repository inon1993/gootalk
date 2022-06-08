import classes from "./Feed.module.css";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const postsArray = await axios.get(
        "/post/timeline/62a081329f5d1a674c7c39d2", {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmEwODEzMjlmNWQxYTY3NGM3YzM5ZDIiLCJpYXQiOjE2NTQ2ODYwMDJ9.tPaj5MGb1zyuthjl6GYsHjwQYGIB4JlDQwDH6BBFn2M'
          }
        });
      setPosts(postsArray.data);
    };

    getPosts();
  }, []);

  return (
    <div className={classes.feed}>
      <NewPost />
      {posts.map((post) => {
        return <Post post={post} />;
      })}
    </div>
  );
};

export default Feed;
