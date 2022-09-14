import classes from "./DashboardHome.module.css";
import Feed from "../Feed/Feed";
import RightMenu from "../RightMenu/RightMenu";
import { useSelector } from "react-redux";

const DashboardHome = ({ friends }) => {
  const theme = useSelector((state) => state.settings.toggle.theme);

  return (
    <>
      <div className={classes["feed"]} data-theme={theme}>
        <Feed />
      </div>
      <div className={classes["right-menu"]} data-theme={theme}>
        <RightMenu friends={friends} />
      </div>
    </>
  );
};

export default DashboardHome;
