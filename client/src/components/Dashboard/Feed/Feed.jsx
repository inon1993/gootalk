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
        "/post/timeline/62718b658c0e64cfd71c2208"
      );
      setPosts(postsArray.data);
    };

    getPosts();
  }, []);

  return (
    <div className={posts.length === 0 ? classes["empty-feed"] : classes.feed}>
      <NewPost />
      {posts.map((post) => {
        return <Post post={post} />;
      })}
    </div>
  );
};

export default Feed;
