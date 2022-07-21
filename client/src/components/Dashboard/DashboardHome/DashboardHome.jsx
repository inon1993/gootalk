import classes from "./DashboardHome.module.css";
import Feed from "../Feed/Feed";
import RightMenu from "../RightMenu/RightMenu";

const DashboardHome = ({ friends }) => {
  return (
    <>
      <div className={classes["feed"]}>
        <Feed />
      </div>
      <div className={classes["right-menu"]}>
        <RightMenu friends={friends} />
      </div>
    </>
  );
};

export default DashboardHome;
