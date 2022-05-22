import { Article, Event, People } from "@mui/icons-material";
import classes from "./ProfileInfo.module.css";
import Card from "../../../UI/Card/Card";

const ProfileInfo = () => {
  return (
    <div className={classes["profile-info"]}>
      <Card className={`${classes["profile-info-card"]} ${classes.friends}`}>
        <People className={classes["pi-icon"]} />
        <span className={classes["pi-text"]}>You have 500 friends</span>
      </Card>
      <Card className={`${classes["profile-info-card"]} ${classes.posts}`}>
        <Article className={classes["pi-icon"]} />
        <span className={classes["pi-text"]}>You have 60 posts</span>
      </Card>
      <Card
        className={`${classes["profile-info-card"]} ${classes["profile-created-at"]}`}
      >
        <Event className={classes["pi-icon"]} />
        <span className={classes["pi-text"]}>
          Account created at: 25.10.2022
        </span>
      </Card>
    </div>
  );
};

export default ProfileInfo;
