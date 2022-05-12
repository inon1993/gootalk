import classes from "./Dashboard.module.css";
import Menu from "./Menu/Menu";
import Feed from "./Feed/Feed";

const Dashboard = () => {
  return (
    <div className={classes.dashboard}>
      <div className={classes["left-menu"]}>
        <Menu />
      </div>
      <div className={classes["feed"]}>
        <Feed />
      </div>
      <div className={classes["right-menu"]}>left menu</div>
    </div>
  );
};

export default Dashboard;
