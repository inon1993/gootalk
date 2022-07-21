import classes from "./RightMenu.module.css";
import RightMenuNotification from "./RightMenuNotification/RightMenuNotification";
import RightMenuFriends from "./RightMenuFriends/RightMenuFriends";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { userActions } from "../../../store/user-slice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const RightMenu = ({ friends }) => {
  const user = useSelector((state) => state.user.user);
  const [notification, setNotification] = useState();
  const req = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    const firstNotification = user.notifications.find((n) => {
      return n.status === false;
    });
    setNotification(firstNotification);
  }, [user, notification]);

  const getNotifications = async () => {
    try {
      const res = await req.get(`api/notifications/${user.userId}`);
      const friends = await req.get(`api/user/friends/${user.userId}`);
      dispatch(userActions.setNotifications({ notifications: res.data }));
      dispatch(userActions.setFriends({ friends: friends.data }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes["right-menu"]}>
      <div className={classes["rm-notification-wrapper"]}>
        {notification ? (
          <RightMenuNotification
            notification={notification}
            onReload={getNotifications}
          />
        ) : (
          <span className={classes["no-noti"]}>No new notifications.</span>
        )}
      </div>
      <hr className={classes["rm-hr"]} />
      <RightMenuFriends notification={notification} friends={friends} />
    </div>
  );
};

export default RightMenu;
