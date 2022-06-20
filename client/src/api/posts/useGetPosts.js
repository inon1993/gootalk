import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export const useGetPosts = () => {
  const [posts, setPosts] = useState([])
  const axiosPrivate = useAxiosPrivate();
  const user = useSelector((state) => state.user.user);
  console.log(11);
  const controller = new AbortController();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsArray = await axiosPrivate.get(
          `/post/timeline/${user.userId}`,
          {
            signal: controller.signal,
          }
        );
        console.log(postsArray.data);

        return postsArray.data;
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }
    };

    const p = getPosts();
    setPosts(p)
  }, []);

  return posts;
};
