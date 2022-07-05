import classes from "./DashboardUsersProfile.module.css";
import Menu from "../Menu/Menu";
import ProfileData from "../ProfileData/ProfileData";
import { useDispatch } from "react-redux";
import { dropdownActions } from "../../../store/dropdown-slice";
import UserPosts from "../UserPosts/UserPosts";
import ppIcon from "../../../images/pp-icon.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import useRequest from "../../../hooks/useRequest";

const DashboardUsersProfile = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const { userid } = useParams();
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("err");
  const getPostRequest = useRequest(`/post/posts/${userid}`, "GET");

  useEffect(() => {
    const getUserPosts = async () => {
      const getUser = await axios.get(`/user/${userid}`);
      console.log(getUser.data);
      setUser(getUser.data);
      setLoading(false);
    };

    getUserPosts();
  }, [userid]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await getPostRequest();
        setPosts(res);
      } catch (error) {
        console.log(1);
        console.log(error);
        if (error === 401) {
          console.log(1);
          setErrMsg("Log in to see user's posts.");
        } else {
          setErrMsg("Something went wrong...");
        }
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  const dispatch = useDispatch();

  const deactivateDropdownHandler = () => {
    dispatch(dropdownActions.deactivate());
  };
  return (
    <div className={classes["dashboard-profile"]}>
      <div className={classes["left-menu"]} onClick={deactivateDropdownHandler}>
        <Menu />
      </div>
      {!loading && (
        <div className={classes["profile-data-wrapper"]}>
          {/* <ProfileData user={user} /> */}
          <div className={classes["profile-data"]}>
            <div className={classes["profile-images"]}>
              <img
                className={classes["profile-cover"]}
                src="https://img.wallpapersafari.com/desktop/800/450/20/1/MPCYk3.jpg"
                alt="cover"
              />
              <div className={classes["profile-img-text"]}>
                <img
                  className={classes["profile-pic"]}
                  src={user.profilePicture || ppIcon}
                  alt="cover"
                />
                <div className={classes["profile-name-city"]}>
                  <h3
                    className={classes["profile-name"]}
                  >{`${user.firstname} ${user.lastname}`}</h3>
                  {user.country && user.city ? (
                    <span
                      className={classes["profile-city"]}
                    >{`${user.city}, ${user.country}`}</span>
                  ) : (
                    (user.country || user.city) && (
                      <span className={classes["profile-city"]}>{`${
                        user.city || user.country
                      }`}</span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          {errMsg === "" ? (
            <div className={classes["profile-user-posts"]}>
              <UserPosts posts={posts} />
            </div>
          ) : (
            <span>{errMsg}</span>
          )}
        </div>
      )}
      <div className={classes["right-menu"]}></div>
    </div>
  );
};

export default DashboardUsersProfile;
