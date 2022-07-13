import classes from "./DashboardNotification.module.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./Notification/Notification";
import { userActions } from "../../../store/user-slice";

const DashboardNotification = () => {
  const req = useAxiosPrivate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const getNotifications = async () => {
    try {
      const res = await req.get(`/notifications/${user.userId}`);
      dispatch(userActions.setNotifications({ notifications: res.data }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes["notification-wrapper"]}>
      {user.notifications.length > 0 ? (
        user.notifications.map((noti, i) => {
          return (
            <Notification
              key={i}
              notification={noti}
              onReload={getNotifications}
            />
          );
        })
      ) : (
        <span>No notifications...</span>
      )}
    </div>
  );
};

export default DashboardNotification;
