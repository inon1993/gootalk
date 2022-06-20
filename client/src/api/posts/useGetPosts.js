import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export const useGetPosts = () => {
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
        console.log(e.request.status);
        return e.request.status;
      }
    };

    const getPosts = async () => {
      const postsArray = await getPostsPromise();
      console.log(postsArray);
      setPosts(postsArray);
    };
    getPosts();
  }, []);

  return posts;
};
