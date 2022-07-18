import Card from "../../../UI/Card/Card";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { format } from "timeago.js";
import ppIcon from "../../../../images/pp-icon.png";
import classes from "./Notification.module.css";

const Notification = ({ notificationUser, notification, onReload }) => {
  const req = useAxiosPrivate();
  const currUser = useSelector((state) => state.user.user);

  const responseRequest = async (e) => {
    const payload = {
      currentUserId: currUser.userId,
      userId: notificationUser.data._id,
      response: e.target.value === "true",
      notificationId: notification._id,
    };
    try {
      console.log(payload);
      await req.put("/notifications/response", payload);
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={classes["notification"]}>
      {!notification.status ? (
        <div>
          <div className={classes["noti-img-text"]}>
            <img
              className={classes["noti-pic"]}
              src={notificationUser.data.profilePicture || ppIcon}
              alt="profile"
            />
            <span>
              <span style={{ fontWeight: "600" }}>
                {notificationUser.data.firstname}{" "}
                {notificationUser.data.lastname}
              </span>{" "}
              wants to be your friend.
            </span>
          </div>
          <div className={classes["noti-buttons"]}>
            <button
              className={classes["noti-accept-button"]}
              value={true}
              onClick={responseRequest}
            >
              Accept
            </button>
            <button
              className={classes["noti-reject-button"]}
              value={false}
              onClick={responseRequest}
            >
              Reject
            </button>
          </div>
        </div>
      ) : notification.response ? (
        <span>
          <span style={{ fontWeight: "600" }}>
            {notificationUser.data.firstname} {notificationUser.data.lastname}
          </span>{" "}
          is now your friend.
        </span>
      ) : (
        <span>
          You've rejected{" "}
          <span style={{ fontWeight: "600" }}>
            {notificationUser.data.firstname} {notificationUser.data.lastname}
          </span>
          's friendship request.
        </span>
      )}
      <span className={classes["notification-date"]}>
        {format(notificationUser.data.createdAt)}
      </span>
    </Card>
  );
};

export default Notification;
