import classes from "./Feed.module.css";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user-slice";
import useRequest from "../../../hooks/useRequest";

const Feed = () => {
  const dispach = useDispatch();
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user.user);
  const access = useSelector((state) => state.accessToken.accessToken);
  const endpoint = `/post/timeline/${user.userId}`;
  const postsArrayPromise = useRequest(endpoint, "GET");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsArray = await postsArrayPromise();
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
      {posts.length !== 0 ? (
        posts.map((post, i) => {
          return <Post key={i} post={post} />;
        })
      ) : (
        <span>No posts...</span>
      )}
    </div>
  );
};

export default Feed;
