import classes from "./UserPosts.module.css";
import Post from "../Feed/Post/Post";
import { useState, useEffect} from "react"
import axios from "axios"

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const getUserPosts = async () => {
      const userPostsArray = await axios.get("/post/posts/6271122e246c91208cbd93b2");
      console.log(userPostsArray.data);
      setUserPosts(userPostsArray.data);
    }

    getUserPosts()
  }, []);
  return (
    <div className={classes["profile-posts"]}>
      {userPosts.map((post) => {
        return (
          <Post post={post} />
        )
      })}
    </div>
  );
};

export default UserPosts;
