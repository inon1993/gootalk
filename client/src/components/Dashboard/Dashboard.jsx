import classes from "./Dashboard.module.css";
import Menu from "./Menu/Menu"

const Dashboard = () => {
  return (
    <div className={classes.dashboard}>
      <div className={classes["left-menu"]}>
         <Menu />
      </div>
      <div className={classes["feed"]}>
      <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
        <h1 className={classes.th1}>Hello</h1>
      </div>
      <div className={classes["right-menu"]}>left menu</div>
    </div>
  );
};

export default Dashboard;
