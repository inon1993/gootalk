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
import Skeleton from "../../UI/Skeleton/Skeleton";
import Loader from "../../UI/Loader/Loader";

const Feed = () => {
  const dispach = useDispatch();
  const [posts, setPosts] = useState([]);
  const [postsUsers, setPostsUsers] = useState([]);
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
    setIsLoading(true);
    let isMounted = true;
    const controller = new AbortController();

    const getPosts = async () => {
      try {
        const postsArray = await req.get(endpoint, {
          signal: controller.signal,
        });
        isMounted && setPosts(postsArray.data);
        const getPostsUsers = await Promise.all(
          postsArray.data.map(async (p) => {
            return await req.get(`/user/${p.userId}`);
          })
        );
        setPostsUsers(getPostsUsers);
      } catch (error) {
        await logout();
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getPosts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => {
      clearTimeout();
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

      const getPostsUsers = await Promise.all(
        postsArray.data.map(async (p) => {
          console.log(p);
          return await req.get(`/user/${p.userId}`);
        })
      );
      console.log(getPostsUsers);
      setPostsUsers(getPostsUsers);
      /*isMounted && */ setPosts(postsArray.data);
    } catch (error) {
      dispach(userActions.logoutUser());
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  return (
    <div className={classes.feed}>
      <NewPost onReload={getPosts} />
      {/* {!isLoading && posts.length !== 0 && postsUsers.length !== 0 ? (
        posts.map((post, i) => {
          return (
            <Post
              key={i}
              post={post}
              postUser={postsUsers[i].data}
              update={setUpdate}
            />
          );
        })
      ) : !isLoading && posts.length === 0 ? (
        <span>No posts...</span>
      ) : (
        <Skeleton type="post" />
      )} */}
      {isLoading ? (
        <Skeleton type="post" />
      ) : posts.length !== 0 && postsUsers.length !== 0 ? (
        posts.map((post, i) => {
          return (
            <Post
              key={i}
              post={post}
              postUser={postsUsers[i].data}
              update={setUpdate}
            />
          );
        })
      ) : (
        <span>No posts...</span>
      )}
    </div>
  );
};

export default Feed;
