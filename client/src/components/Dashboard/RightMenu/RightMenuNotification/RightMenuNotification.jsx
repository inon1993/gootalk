import classes from "./RightMenuNotification.module.css";
import Card from "../../../UI/Card/Card";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const RightMenuNotification = ({ notification }) => {
  const [user, setUser] = useState();
  const req = useAxiosPrivate();

  useEffect(() => {
    const getUser = async () => {
      const res = await req.get(`/user/${notification.senderUserId}`);
      setUser(res.data);
    };
  }, []);

  return (
    user && (
      <Card className={classes["rm-notification"]}>
        <div className={classes["rm-noti-text"]}>
          <span className={classes["rm-noti-name"]}>
            {`${user.firstname} ${user.lastname} `}
            <span className={classes["rm-noti-generic-text"]}>
              wants to be your friend.
            </span>
          </span>
        </div>
        <div className={classes["rm-noti-buttons"]}>
          <button className={classes["rm-noti-accept"]}>Accept</button>
          <button className={classes["rm-noti-reject"]}>Reject</button>
        </div>
      </Card>
    )
  );
};

export default RightMenuNotification;
