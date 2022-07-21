import { Article, Event, People } from "@mui/icons-material";
import classes from "./ProfileInfo.module.css";
import Card from "../../../UI/Card/Card";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileInfo = () => {
  const [stats, setStats] = useState({ friends: 0, posts: 0, createdAt: "" });
  const req = useAxiosPrivate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await req.get(`/user/stats/${user.userId}`);
        setStats(res.data);
      } catch (error) {
        console.log(error);
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
