import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

export const useGetPosts = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [posts, setPosts] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const user = useSelector((state) => state.user.user);
  const controller = new AbortController();

  useEffect(() => {
    const getPostsPromise = async () => {
      try {
        const postsArray = await axiosPrivate.get(
          `/post/timeline/${user.userId}`,
          {
            signal: controller.signal,
          }
        );

        return postsArray.data;
      } catch (e) {
        return e.request.status;
      }
    };

    const getPosts = async () => {
      const postsArray = await getPostsPromise();
      setPosts(postsArray);
    };
    getPosts();
  }, []);

  return posts;
};
