import classes from "./RightMenu.module.css";
import RightMenuNotification from "./RightMenuNotification/RightMenuNotification";
import RightMenuFriends from "./RightMenuFriends/RightMenuFriends";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const RightMenu = () => {
  const user = useSelector((state) => state.user.user);
  const [notification, setNotification] = useState();

  useEffect(() => {
    const firstNotification = user.notifications.find((n) => {
      return n.status === false;
    });
    console.log(firstNotification);
    setNotification(firstNotification);
  }, []);
  return (
    <div className={classes["right-menu"]}>
      {notification ? (
        <RightMenuNotification notification={notification} />
      ) : (
        <span className={classes["no-notifications-msg"]}>
          No new notifications.
        </span>
      )}
      <hr className={classes["rm-hr"]} />
      <RightMenuFriends />
    </div>
  );
};

export default RightMenu;
