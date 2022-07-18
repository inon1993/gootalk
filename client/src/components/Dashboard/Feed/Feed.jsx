import classes from "./Feed.module.css";
import NewPost from "./NewPost/NewPost";
import Post from "./Post/Post";
import { useState, useEffect } from "react";
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
  const [update, setUpdate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const req = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  useEffect(() => {
    setIsLoading(true);
    getPosts();
  }, []);

  useEffect(() => {
    if (postsUsers.length !== 0 || posts.length !== 0) {
      setIsLoading(false);
    }
  }, [postsUsers, posts]);

  const getPosts = async () => {
    try {
      const postsArray = await req.get(`/post/timeline/${user.userId}`);

      const getPostsUsers = await Promise.all(
        postsArray.data.map(async (p) => {
          return await req.get(`/user/${p.userId}`);
        })
      );

      setPostsUsers(getPostsUsers);
      setPosts(postsArray.data);
    } catch (error) {
      dispach(userActions.logoutUser());
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  return (
    <div className={classes.feed}>
      <NewPost onReload={getPosts} />
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
