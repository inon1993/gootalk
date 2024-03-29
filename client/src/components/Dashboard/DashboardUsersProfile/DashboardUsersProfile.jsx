import classes from "./DashboardUsersProfile.module.css";
import { useSelector, useDispatch } from "react-redux";
import UserPosts from "../UserPosts/UserPosts";
import ppIcon from "../../../images/pp-icon.webp";
import coverImg from "../../../images/gootalk-cover.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Done, PersonAdd } from "@mui/icons-material";
import Loader from "../../UI/Loader/Loader";
import useLogout from "../../../hooks/useLogout";
import { userActions } from "../../../store/user-slice";

const DashboardUsersProfile = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const { userid } = useParams();
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [noPostsMsg, setNoPostsMsg] = useState("");
  const req = useAxiosPrivate();
  const currUser = useSelector((state) => state.user.user);
  const [sendReqBtn, setSendReqBtn] = useState(false);
  const [disableReqBtn, setDisableReqBtn] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setSendReqBtn(false);
    setDisableReqBtn(false);
    const getUserPosts = async () => {
      const getUser = await axios.get(`/user/${userid}`);
      setUser(getUser.data);
      if (currUser.userId !== getUser.data._id) {
        setSendReqBtn(true);
      }
      const match = getUser.data.notifications.filter(
        (n) => n.senderUserId === currUser.userId && n.status === false
      );

      const existingNotification = currUser.notifications.filter(
        (n) => n.senderUserId === getUser.data._id && n.status === false
      );

      if (
        match.length > 0 ||
        getUser.data.friends.includes(currUser.userId) ||
        existingNotification.length > 0
      ) {
        setDisableReqBtn(true);
      }
    };

    getUserPosts();
  }, [userid]);

  useEffect(() => {
    setNoPostsMsg("");
    const getPosts = async () => {
      try {
        const res = await req.get(`/post/posts/${userid}`);
        if (res.data.length === 0) {
          setNoPostsMsg("This user hasn't posted yet...");
        }
        setPosts(res.data);
      } catch (error) {
        if (error.response.status === 401) {
          setErrMsg("Sign in to see user's posts.");
        } else {
          setErrMsg("Something went wrong...");
        }
      }
    };
    currUser.userId !== ""
      ? getPosts()
      : setErrMsg("Log in to see user's posts.");
  }, [user]);

  useEffect(() => {
    if (user.firstname) {
      setLoading(false);
    }
  }, [user]);

  const addFriendHandler = async () => {
    const payload = {
      userId: user._id,
      senderUserId: currUser.userId,
    };
    try {
      await req.put("/notifications", payload);
      setDisableReqBtn(true);
    } catch (error) {
      if (navigator.onLine) {
        await logout();
        navigate("/login", { state: { from: location }, replace: true });
        dispatch(userActions.logoutUser());
      }
    }
  };

  return (
    <>
      {!loading ? (
        <div className={classes["profile-data-wrapper"]}>
          <div className={classes["profile-data"]}>
            <div className={classes["profile-images"]}>
              <img
                className={classes["profile-cover"]}
                src={user.coverPicture || coverImg}
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
                {sendReqBtn && currUser.userId !== "" && (
                  <button
                    className={classes["add-friend-btn"]}
                    disabled={disableReqBtn}
                    onClick={addFriendHandler}
                  >
                    {user && user?.friends?.includes(currUser.userId) ? (
                      <Done className={classes["add-friend-icon"]} />
                    ) : (
                      <PersonAdd className={classes["add-friend-icon"]} />
                    )}
                    {!disableReqBtn
                      ? "Add Friend"
                      : user && user?.friends?.includes(currUser.userId)
                      ? "Friends!"
                      : "Pending..."}
                  </button>
                )}
              </div>
            </div>
          </div>
          {errMsg === "" ? (
            <div className={classes["profile-user-posts"]}>
              {noPostsMsg === "" ? (
                <UserPosts posts={posts} user={user} />
              ) : (
                <span className={classes["no-posts-msg"]}>{noPostsMsg}</span>
              )}
            </div>
          ) : (
            <span>{errMsg}</span>
          )}
        </div>
      ) : (
        <Loader />
      )}
      <div className={classes["right-menu"]}></div>
    </>
  );
};

export default DashboardUsersProfile;
