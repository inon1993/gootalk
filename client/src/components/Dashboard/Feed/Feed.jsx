import classes from "./Feed.module.css";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useGetPosts } from "../../../api/posts/useGetPosts";
import { useNavigate, useLocation } from "react-router-dom";

const Feed = () => {
  // const axiosPrivate = useAxiosPrivate();
  // const user = useSelector((state) => state.user.user);
  const [posts, setPosts] = useState([]);
  const postsArray = useGetPosts();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // const controller = new AbortController();
    // const getPosts = async () => {
    //   console.log(user);
    //   const postsArray = await axiosPrivate.get(
    //     `/post/timeline/${user.userId}`,
    //     {
    //       signal: controller.signal,
    //     }
    //   );
    //   console.log(postsArray);
    //   setPosts(postsArray.data);
    // };
    console.log(postsArray);
    if (postsArray === 401) {
      console.log(99);
      navigate("/login", { state: { from: location }, replace: true });
    }
    setPosts(postsArray);
  }, []);

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
