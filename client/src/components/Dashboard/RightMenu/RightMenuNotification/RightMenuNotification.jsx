import classes from "./RightMenuNotification.module.css";
import Card from "../../../UI/Card/Card"

const RightMenuNotification = () => {
  return (
    <Card className={classes["rm-notification"]}>
      <div className={classes["rm-noti-text"]}>
        <span className={classes["rm-noti-name"]}>
          {`Ari Avramashvili `}
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
  );
};

export default RightMenuNotification;
