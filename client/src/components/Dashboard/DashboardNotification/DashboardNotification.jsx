import { useEffect, useState } from "react";
import classes from "./DashboardNotification.module.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import Notification from "./Notification/Notification";

const DashboardNotification = () => {
    const req = useAxiosPrivate();
    const [notifications, setNotifications] = useState([]);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        const getNoti = async () => {
            try {
                const res = await req.get(`/notifications/${user.userId}`)
                setNotifications(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        getNoti();
    }, []);

  return (
    <div className={classes.feed}>
      {notifications.length !== 0 ? (
        notifications.map((noti, i) => {
          return <Notification key={i} notification={noti} /*update={setUpdate}*/ />;
        // return <span>{noti.userId}</span>
        })
      ) : (
        <span>No notifications...</span>
      )}
    </div>
  );
};

export default DashboardNotification;
