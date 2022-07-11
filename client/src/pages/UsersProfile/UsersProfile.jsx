import classes from "./UsersProfile.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { menuActions } from "../../store/menu-slice";
import { dropdownActions } from "../../store/dropdown-slice";
import { useEffect } from "react";
import DashboardUsersProfile from "../../components/Dashboard/DashboardUsersProfile/DashboardUsersProfile";
import Menu from "../../components/Dashboard/Menu/Menu";

const UsersProfile = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(menuActions.deactivate());
    dispatch(navbarActions.deactivate());
    dispatch(navbarActions.activateSearchInput());
  }, []);

  const deactivateDropdownHandler = () => {
    dispatch(dropdownActions.deactivate());
  };

  return (
    <>
      <Navbar />
      <div className={classes["dashboard-users-profile"]}>
        <div className={classes["left-menu"]} onClick={deactivateDropdownHandler} >
          <Menu />
        </div>
        <div className={classes["dashboard-users-profile-wrapper"]}>
          <DashboardUsersProfile user={user} />
        </div>
      </div>
    </>
  );
};

export default UsersProfile;
