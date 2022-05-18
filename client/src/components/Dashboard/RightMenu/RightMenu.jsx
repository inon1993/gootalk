import classes from "./RightMenu.module.css";
import RightMenuNotification from "./RightMenuNotification/RightMenuNotification";
import RightMenuFriends from "./RightMenuFriends/RightMenuFriends";

const RightMenu = () => {
  return (
    <div className={classes["right-menu"]}>
      <RightMenuNotification />
      <hr className={classes["rm-hr"]} />
      <RightMenuFriends />
    </div>
  );
};

export default RightMenu;
