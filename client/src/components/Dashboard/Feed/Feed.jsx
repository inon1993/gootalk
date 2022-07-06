import classes from "./Feed.module.css";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user-slice";
import useRequest from "../../../hooks/useRequest";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Feed = () => {
  const dispach = useDispatch();
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(0);
  const user = useSelector((state) => state.user.user);
  const access = useSelector((state) => state.accessToken.accessToken);
  const endpoint = `/post/timeline/${user.userId}`;
  const postsArrayPromise = useRequest(endpoint, "GET");
  const req = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(access);
    // getPosts();

    // let isMounted = true;
    const controller = new AbortController();

    const getPosts = async () => {
      try {
        // const postsArray = await postsArrayPromise();
        const postsArray = await req.get(endpoint, {
          signal: controller.signal,
        });
        console.log(postsArray);
        /*isMounted && */ setPosts(postsArray.data);
      } catch (error) {
        dispach(userActions.logoutUser());
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getPosts();

    return () => {
      // isMounted = false;
      controller.abort();
    };
  }, []);

  const getPosts = async () => {
    const controller = new AbortController();
    // let isMounted = true;
    try {
      // const postsArray = await postsArrayPromise();
      const postsArray = await req.get(endpoint, {
        signal: controller.signal,
      });
      /*isMounted && */ setPosts(postsArray.data);
    } catch (error) {
      dispach(userActions.logoutUser());
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  return (
    <div className={classes.feed}>
      <NewPost onReload={getPosts} />
      {posts.length !== 0 ? (
        posts.map((post, i) => {
          return <Post key={i} post={post} update={setUpdate} />;
        })
      ) : (
        <span>No posts...</span>
      )}
    </div>
  );
};

export default Feed;
