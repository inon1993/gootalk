import { useEffect, useState } from "react";
import classes from "./DashboardNotification.module.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./Notification/Notification";
import { userActions } from "../../../store/user-slice";

const DashboardNotification = () => {
  const req = useAxiosPrivate();
  const [notifications, setNotifications] = useState([]);
  const [response, setResponse] = useState();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   getNoti();
  // }, []);

  const getNoti = async () => {
    try {
      const res = await req.get(`/notifications/${user.userId}`);
      dispatch(userActions.setNotifications({notifications: res.data}))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes["notification-wrapper"]}>
      {/* {notifications.length !== 0 ? ( */}
      {user.notifications.length > 0 ? (
        user.notifications.map((noti, i) => {
          return (
            <Notification
              key={i}
              notification={noti}
              onReload={getNoti} /*update={setUpdate}*/
            />
          );
          // return <span>{noti.userId}</span>
        })
      ) : (
        <span>No notifications...</span>
      )}
    </div>
  );
};

export default DashboardNotification;
