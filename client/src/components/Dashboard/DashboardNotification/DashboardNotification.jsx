import classes from "./DashboardNotification.module.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./Notification/Notification";
import { userActions } from "../../../store/user-slice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../UI/Loader/Loader";
import useLogout from "../../../hooks/useLogout";

const DashboardNotification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [noti, setNoti] = useState([]);
  const req = useAxiosPrivate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = useLogout();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const getNotifications = async () => {
      try {
        const getNotiUsers = await Promise.all(
          user.notifications.map(async (n) => {
            return await req.get(`/user/${n.senderUserId}`);
          })
        );
        setNoti(getNotiUsers);
      } catch (error) {
        if (navigator.onLine) {
          await logout();
          dispatch(userActions.logoutUser());
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };
    getNotifications();
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  const getNotifications = async () => {
    try {
      const res = await req.get(`/notifications/${user.userId}`);
      const friends = await req.get(`/user/friends/${user.userId}`);
      dispatch(userActions.setNotifications({ notifications: res.data }));
      dispatch(userActions.setFriends({ friends: friends.data }));
      const getNotiUsers = await Promise.all(
        res.data.map(async (n) => {
          return await req.get(`/user/${n.senderUserId}`);
        })
      );
      setNoti(getNotiUsers);
    } catch (error) {
      dispatch(userActions.logoutUser());
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className={classes["notification-wrapper"]}>
      {user.notifications.length > 0 ? (
        noti.map((noti, i) => {
          return (
            <Notification
              key={i}
              notificationUser={noti}
              notification={user.notifications[i]}
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
