import classes from "./UserPosts.module.css";
import Post from "../Feed/Post/Post";
import { useState, useEffect } from "react";
import axios from "axios";

const UserPosts = ({ posts }) => {
  return (
    <div className={classes["profile-posts"]}>
      {posts?.map((post, i) => {
        return <Post key={i} post={post} />;
      })}
    </div>
  );
};

export default UserPosts;
