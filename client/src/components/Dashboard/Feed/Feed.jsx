import classes from "./Feed.module.css";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useGetPosts } from "../../../api/posts/useGetPosts";

const Feed = () => {
  const axiosPrivate = useAxiosPrivate();
  const user = useSelector((state) => state.user.user);
  const [posts, setPosts] = useState([]);
  const pp = useGetPosts();

  useEffect(() => {
    const controller = new AbortController();
    const getPosts = async () => {
      console.log(user);
      const postsArray = await axiosPrivate.get(
        `/post/timeline/${user.userId}`,
        {
          signal: controller.signal,
        }
      );
      console.log(postsArray);
      setPosts(postsArray.data);
    };

    // getPosts();
  // JSON.stringify(pp);

    console.log(pp);
    console.log(pp.data);
    setPosts(pp)
  }, [pp]);

  return (
    <div className={classes.feed}>
      <NewPost />
      {posts.map((post, i) => {
        return <Post key={i} post={post} />;
      })}
    </div>
  );
};

export default Feed;
