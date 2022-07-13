import classes from "./RightMenu.module.css";
import RightMenuNotification from "./RightMenuNotification/RightMenuNotification";
import RightMenuFriends from "./RightMenuFriends/RightMenuFriends";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { userActions } from "../../../store/user-slice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const RightMenu = () => {
  const user = useSelector((state) => state.user.user);
  const [notification, setNotification] = useState();
  const req = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    const firstNotification = user.notifications.find((n) => {
      return n.status === false;
    });
    console.log(firstNotification);
    setNotification(firstNotification);
  }, [user]);

  const getNotifications = async () => {
    try {
      const res = await req.get(`/notifications/${user.userId}`);
      dispatch(userActions.setNotifications({ notifications: res.data }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes["right-menu"]}>
      <div style={{marginBottom: "15px"}}>{notification ? (
        <RightMenuNotification notification={notification} onReload={getNotifications} />
      ) : (
        <span>
          No new notifications.
        </span>
      )}</div>
      <hr className={classes["rm-hr"]} />
      <RightMenuFriends />
    </div>
  );
};

export default RightMenu;
