import { useEffect, useState } from "react";
import Card from "../../../UI/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { userActions } from "../../../../store/user-slice";
import { useLocation } from "react-router-dom";
import ppIcon from "../../../../images/pp-icon.png";
import classes from "./Notification.module.css";

const Notification = ({ notification, onReload }) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const req = useAxiosPrivate();
  const location = useLocation();
  const currUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const getNotificationUser = async () => {
      try {
        const res = await req.get(`user/${notification.senderUserId}`);
        setUser(res.data);
      } catch (error) {
        dispatch(userActions.logoutUser());
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getNotificationUser();
  }, []);

  const responseRequest = async (e) => {
    const payload = {
      currentUserId: currUser.userId,
      userId: user._id,
      response: e.target.value === "true",
      notificationId: notification._id,
    };
    console.log(payload);
    try {
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
              src={user?.profilePicture || ppIcon}
              alt="profile"
            />
            <span>
              <span style={{ fontWeight: "600" }}>
                {user.firstname} {user.lastname}
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
            {user.firstname} {user.lastname}
          </span>{" "}
          is now your friend.
        </span>
      ) : (
        <span>
          You've rejected{" "}
          <span style={{ fontWeight: "600" }}>
            {user.firstname} {user.lastname}
          </span>
          's friendship request.
        </span>
      )}
    </Card>
  );
};

export default Notification;
