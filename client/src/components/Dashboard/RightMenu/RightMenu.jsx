import classes from "./RightMenu.module.css";
import RightMenuNotification from "./RightMenuNotification/RightMenuNotification";

const RightMenu = () => {
  return (
    <div className={classes["right-menu"]}>
      <RightMenuNotification />
      <hr className={classes["rm-hr"]} />
    </div>
  );
};

export default RightMenu;
