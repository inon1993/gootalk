import classes from "./DashboardHome.module.css";
import Menu from "../Menu/Menu";
import Feed from "../Feed/Feed";
import { useDispatch } from "react-redux";
import { dropdownActions } from "../../../store/dropdown-slice";
import RightMenu from "../RightMenu/RightMenu";

const DashboardHome = () => {
  const dispatch = useDispatch();

  const deactivateDropdownHandler = () => {
    dispatch(dropdownActions.deactivate());
  };
  return (
    <div className={classes["dashboard-home"]}>
      <div className={classes["left-menu"]} onClick={deactivateDropdownHandler}>
        <Menu />
      </div>
      <div className={classes["feed"]}>
        <Feed />
      </div>
      <div className={classes["right-menu"]}>
        <RightMenu />
      </div>
    </div>
  );
};

export default DashboardHome;