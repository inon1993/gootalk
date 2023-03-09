import classes from "./RightMenuNotification.module.css";
import Card from "../../../UI/Card/Card";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import ppIcon from "../../../../images/pp-icon-small.png";
import { userActions } from "../../../../store/user-slice";
import useLogout from "../../../../hooks/useLogout";

const RightMenuNotification = ({ notification, onReload }) => {
  const currUser = useSelector((state) => state.user.user);
  const [user, setUser] = useState();
  const req = useAxiosPrivate();
  const navigate = useNavigate();
  const logout = useLogout();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const res = await req.get(`/user/${notification.senderUserId}`);
      setUser(res.data);
    };

    getUser();
  }, [notification]);

  const responseRequest = async (e) => {
    const payload = {
      currentUserId: currUser.userId,
      userId: user._id,
      response: e.target.value === "true",
      notificationId: notification._id,
    };
    try {
      await req.put("/notifications/response", payload);
      onReload();
    } catch (error) {
      if (navigator.onLine) {
        await logout();
        navigate("/login", { state: { from: location }, replace: true });
        dispatch(userActions.logoutUser());
      }
    }
  };

  const checkOnUserHandler = () => {
    navigate(`/users/${user._id}/${user.firstname}-${user.lastname}`);
  };

  return (
    user && (
      <Card className={classes["rm-notification"]}>
        <div className={classes["rm-noti-text"]}>
          <img
            className={classes["rm-profile-picture"]}
            src={user.profilePicture || ppIcon}
            alt="profile"
            onClick={checkOnUserHandler}
          />
          <span className={classes["rm-noti-name"]}>
            {`${user.firstname} ${user.lastname} `}
            <span className={classes["rm-noti-generic-text"]}>
              wants to be your friend.
            </span>
          </span>
        </div>
        <div className={classes["rm-noti-buttons"]}>
          <button
            className={classes["rm-noti-accept"]}
            value={true}
            onClick={responseRequest}
          >
            Accept
          </button>
          <button
            className={classes["rm-noti-reject"]}
            value={false}
            onClick={responseRequest}
          >
            Reject
          </button>
        </div>
      </Card>
    )
  );
};

export default RightMenuNotification;
