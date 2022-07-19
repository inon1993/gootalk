import ppIcon from "../../../../images/pp-icon-small.png";
import classes from "./Friend.module.css";

const Friend = ({ friend }) => {
  return (
    friend && (
      <div className={classes["friend-wrapper"]}>
        <img
          className={classes["friend-pic"]}
          src={friend.data.profilePicture || ppIcon}
          alt="profile"
        />
        <span className={classes["friend-name"]}>
          {friend.data.firstname} {friend.data.lastname}
        </span>
      </div>
    )
  );
};

export default Friend;
