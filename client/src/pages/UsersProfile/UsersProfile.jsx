import Navbar from "../../components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { menuActions } from "../../store/menu-slice";
import { useEffect } from "react";
import DashboardUsersProfile from "../../components/Dashboard/DashboardUsersProfile/DashboardUsersProfile";

const UsersProfile = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(menuActions.deactivate());
    dispatch(navbarActions.deactivate());
    dispatch(navbarActions.activateSearchInput());
  }, []);

  return (
    <>
      <Navbar />
      <DashboardUsersProfile user={user} />
    </>
  );
};

export default UsersProfile;
