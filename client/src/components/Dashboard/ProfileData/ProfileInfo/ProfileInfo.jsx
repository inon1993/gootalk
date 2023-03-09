import { Article, Event, People } from "@mui/icons-material";
import classes from "./ProfileInfo.module.css";
import Card from "../../../UI/Card/Card";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useLogout from "../../../../hooks/useLogout";
import { userActions } from "../../../../store/user-slice";

const ProfileInfo = () => {
  const [stats, setStats] = useState({ friends: 0, posts: 0, createdAt: "" });
  const req = useAxiosPrivate();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const logout = useLogout();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await req.get(`/user/stats/${user.userId}`);
        setStats(res.data);
      } catch (error) {
        if (navigator.onLine) {
          await logout();
          navigate("/login", { state: { from: location }, replace: true });
          dispatch(userActions.logoutUser());
        }
      }
    };

    getStats();
  }, []);

  return (
    <div className={classes["profile-info"]}>
      <Card className={`${classes["profile-info-card"]} ${classes.friends}`}>
        <People className={classes["pi-icon"]} />
        <span className={classes["pi-text"]}>
          You have {stats.friends} friends
        </span>
      </Card>
      <Card className={`${classes["profile-info-card"]} ${classes.posts}`}>
        <Article className={classes["pi-icon"]} />
        <span className={classes["pi-text"]}>You have {stats.posts} posts</span>
      </Card>
      <Card
        className={`${classes["profile-info-card"]} ${classes["profile-created-at"]}`}
      >
        <Event className={classes["pi-icon"]} />
        <span className={classes["pi-text"]}>
          Account created at: {stats.createdAt}
        </span>
      </Card>
    </div>
  );
};

export default ProfileInfo;
