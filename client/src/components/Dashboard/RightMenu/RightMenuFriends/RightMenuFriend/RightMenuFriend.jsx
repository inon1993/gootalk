import classes from "./RightMenuFriend.module.css";
import { AccountCircleRounded } from "@mui/icons-material";
import ppIcon from "../../../../../images/pp-icon.png";
import { useNavigate } from "react-router-dom";

const RightMenuFriend = ({ friend }) => {
    const navigate = useNavigate();
  console.log(friend);
  return (
    <div
      className={classes["rm-friend"]}
      onClick={() => {
        navigate(
          `/users/${friend.data._id}/${friend.data.firstname}-${friend.data.lastname}`
        );
      }}
    >
      {/* <AccountCircleRounded className={classes["rm-friend-img"]} /> */}
      <img className={classes["rm-friend-img"]} src={friend.data.profilePictire || ppIcon} />
      <span
        className={classes["rm-friend-text"]}
      >{`${friend.data.firstname} ${friend.data.lastname}`}</span>
    </div>
  );
};

export default RightMenuFriend;
