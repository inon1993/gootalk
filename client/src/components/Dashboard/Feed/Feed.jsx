import classes from "./Feed.module.css";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user-slice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useLogout from "../../../hooks/useLogout";
import Skeleton from "../../UI/Skeleton/Skeleton";

const Feed = () => {
  const dispach = useDispatch();
  const [posts, setPosts] = useState([]);
  const [postsUsers, setPostsUsers] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useSelector((state) => state.settings.toggle.theme);
  const user = useSelector((state) => state.user.user);
  const req = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  const [endPosts, setEndPosts] = useState(false);
  const observer = useRef();
  const lastPost = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !endPosts) {
          setPageStart((prev) => {
            return prev + 5;
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, endPosts]
  );

  useEffect(() => {
    if (!endPosts) {
      setIsLoading(true);
      getPosts();
    }
  }, [pageStart]);

  useEffect(() => {
    if (postsUsers.length !== 0 || posts.length !== 0) {
      setIsLoading(false);
      setInitialLoading(false);
    }
  }, [postsUsers, posts]);

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const postsArray = await req.get(
        `/post/timeline/${user.userId}/${pageStart}`
      );
      if (postsArray.data.length === 0) {
        setEndPosts(true);
        setIsLoading(false);
        setInitialLoading(false);
        return;
      }

      const getPostsUsers = await Promise.all(
        postsArray.data.map(async (p) => {
          return await req.get(`/user/${p.userId}`);
        })
      );

      setPostsUsers((prev) => {
        return [...prev, ...getPostsUsers];
      });
      setPosts((prev) => {
        return [...prev, ...postsArray.data];
      });

      if (postsArray.data.length < 5) {
        setEndPosts(true);
        setIsLoading(false);
        setInitialLoading(false);
        return;
      }
    } catch (error) {
      if (error.response.status === 404) {
        setEndPosts(true);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      if (navigator.onLine) {
        await logout();
        navigate("/login", { state: { from: location }, replace: true });
        dispach(userActions.logoutUser());
      }
    }
  };

  return (
    <div className={classes.feed} data-theme={theme}>
      <NewPost
        releseEndPosts={setEndPosts}
        resetUsers={setPostsUsers}
        resetPosts={setPosts}
        loading={setInitialLoading}
        pageStart={setPageStart}
        getPage={pageStart}
        getPosts={getPosts}
      />
      {initialLoading ? (
        <Skeleton type="post" counter={4} />
      ) : posts.length !== 0 && postsUsers.length !== 0 ? (
        posts.map((post, i) => {
          if (posts.length === i + 1) {
            return (
              <Post
                ref={lastPost}
                key={post._id}
                post={post}
                postUser={postsUsers[i].data}
                getPosts={getPosts}
                pageStart={setPageStart}
                posts={posts}
                setPosts={setPosts}
              />
            );
          } else {
            return (
              <Post
                key={post._id}
                post={post}
                postUser={postsUsers[i].data}
                getPosts={getPosts}
                pageStart={setPageStart}
                posts={posts}
                setPosts={setPosts}
              />
            );
          }
        })
      ) : (
        <span>No posts...</span>
      )}
      {isLoading && <Skeleton type="post" counter={1} />}
    </div>
  );
};

export default Feed;
