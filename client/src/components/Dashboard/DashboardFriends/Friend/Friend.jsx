import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import ppIcon from "../../../../images/pp-icon.png";
import classes from "./Friend.module.css";

const Friend = ({ friend }) => {
  const [user, setUser] = useState({});
  const req = useAxiosPrivate();
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendUser = await req.get(`/user/${friend.data._id}`);
        setUser(friendUser.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFriends();
  }, [friend]);

  return (
    user && (
      <div className={classes["friend-wrapper"]}>
        <img
          className={classes["friend-pic"]}
          src={user.profilePicture || ppIcon}
          alt="profile"
        />
        <span className={classes["friend-name"]}>
          {user.firstname} {user.lastname}
        </span>
      </div>
    )
  );
};

export default Friend;
