import classes from "./Feed.module.css";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const postsArray = await axios.get("/post/timeline/6271122e246c91208cbd93b2");
      // console.log(postsArray);
      setPosts(postsArray.data);
    }

    getPosts();
  }, [])

  return (
    <div className={classes.feed}>
      <NewPost />
      {posts.map((post) => {
        return (
          <Post post={post}/>
        )
      })}
    </div>
  );
};

export default Feed;
