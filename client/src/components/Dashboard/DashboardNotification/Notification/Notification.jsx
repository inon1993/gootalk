import Card from "../../../UI/Card/Card";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { format } from "timeago.js";
import ppIcon from "../../../../images/pp-icon-small.png";
import classes from "./Notification.module.css";
import { useNavigate } from "react-router";

const Notification = ({ notificationUser, notification, onReload }) => {
  const req = useAxiosPrivate();
  const currUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const responseRequest = async (e) => {
    const payload = {
      currentUserId: currUser.userId,
      userId: notificationUser.data._id,
      response: e.target.value === "true",
      notificationId: notification._id,
    };
    try {
      await req.put("/notifications/response", payload);
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  const checkOnUserHandler = () => {
    navigate(
      `/users/${notificationUser.data._id}/${notificationUser.data.firstname}-${notificationUser.data.lastname}`
    );
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
              onClick={checkOnUserHandler}
            />
            <span>
              <span
                className={classes["noti-name"]}
                onClick={checkOnUserHandler}
              >
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
          <span className={classes["noti-name"]} onClick={checkOnUserHandler}>
            {notificationUser.data.firstname} {notificationUser.data.lastname}
          </span>{" "}
          is now your friend.
        </span>
      ) : (
        <span>
          You've rejected{" "}
          <span className={classes["noti-name"]} onClick={checkOnUserHandler}>
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
