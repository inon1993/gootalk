import classes from "./Feed.module.css";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user-slice";
import useRequest from "../../../hooks/useRequest";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useLogout from "../../../hooks/useLogout";
import Loader from "../../UI/Loader/Loader";

const Feed = () => {
  const dispach = useDispatch();
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const access = useSelector((state) => state.accessToken.accessToken);
  const endpoint = `/post/timeline/${user.userId}`;
  const postsArrayPromise = useRequest(endpoint, "GET");
  const req = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPosts = async () => {
      try {
        const postsArray = await req.get(endpoint, {
          signal: controller.signal,
        });
        isMounted && setPosts(postsArray.data);
      } catch (error) {
        await logout();
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    // setIsLoading(true);
    getPosts();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // getPosts();
    // setIsLoading(false);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [user]);

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
      {!isLoading && posts.length !== 0 ? (
        posts.map((post, i) => {
          return <Post key={i} post={post} update={setUpdate} />;
        })
      ) : !isLoading && posts.length === 0 ? (
        <span>No posts...</span>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Feed;
