import classes from "./RightMenuFriend.module.css";
import ppIcon from "../../../../../images/pp-icon-small.png";
import { useNavigate } from "react-router-dom";

const RightMenuFriend = ({ friend }) => {
  const navigate = useNavigate();
  return (
    <div
      className={classes["rm-friend"]}
      onClick={() => {
        navigate(
          `/users/${friend.data._id}/${friend.data.firstname}-${friend.data.lastname}`
        );
      }}
    >
      <img
        className={classes["rm-friend-img"]}
        src={friend.data.profilePicture || ppIcon}
        alt="profile"
      />
      <span
        className={classes["rm-friend-text"]}
      >{`${friend.data.firstname} ${friend.data.lastname}`}</span>
    </div>
  );
};

export default RightMenuFriend;
