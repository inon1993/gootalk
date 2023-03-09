import classes from "./DashboardProfile.module.css";
import ProfileData from "../ProfileData/ProfileData";
import UserPosts from "../UserPosts/UserPosts";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import EditProfile from "../../EditProfile/EditProfile";
import useLogout from "../../../hooks/useLogout";
import { userActions } from "../../../store/user-slice";
import { useNavigate, useLocation } from "react-router-dom";

const DashboardProfile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const req = useAxiosPrivate();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const logout = useLogout();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const userPostsArray = await req.get(`/post/posts/${user.userId}`);
        setUserPosts(userPostsArray.data);
      } catch (error) {
        if (navigator.onLine) {
          await logout();
          navigate("/login", { state: { from: location }, replace: true });
          dispatch(userActions.logoutUser());
        }
      }
    };

    getUserPosts();
  }, []);

  return (
    <>
      {!editProfile ? (
        <div className={classes["profile-data"]}>
          <ProfileData onEditProfile={setEditProfile} />
          <div className={classes["profile-user-posts"]}>
            {userPosts.length > 0 ? (
              <UserPosts
                posts={userPosts}
                user={user}
                setPosts={setUserPosts}
              />
            ) : (
              <span>No posts.</span>
            )}
          </div>
        </div>
      ) : (
        <div className={classes["edit-profile"]}>
          <EditProfile onCloseEdit={setEditProfile} />
        </div>
      )}
    </>
  );
};

export default DashboardProfile;
