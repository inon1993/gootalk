import classes from "./Feed.module.css";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import { useState, useEffect } from "react";
import { useGetPosts } from "../../../api/posts/useGetPosts";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user-slice";

const Feed = () => {
  const dispach = useDispatch();
  const [posts, setPosts] = useState([]);
  const postsArrayPromise = useGetPosts();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const endpoint = `/post/timeline/${user.userId}`;
        const postsArray = await postsArrayPromise(endpoint);
        setPosts(postsArray);
      } catch (error) {
        dispach(userActions.logoutUser());
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getPosts();
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
