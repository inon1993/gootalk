import Navbar from "../../components/Navbar/Navbar";
import DashboardHome from "../../components/Dashboard/DashboardHome/DashboardHome";
import { useDispatch, useSelector } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { dropdownActions } from "../../store/dropdown-slice";
import { useEffect, useState } from "react";
import Menu from "../../components/Dashboard/Menu/Menu";
import classes from "./HomePage.module.css";
import { menuActions } from "../../store/menu-slice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import sortArrayByAlphaBeit from "../../helpers/custom-functions/sortArrayByAlphaBeit";

const Home = () => {
  const user = useSelector((state) => state.user.user);
const theme = useSelector(state => state.settings.toggle.theme);
  const req = useAxiosPrivate();
  const [sortedFriends, setSortedFriends] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(navbarActions.activateSearchInput());
    dispatch(navbarActions.activateHome());
    dispatch(menuActions.activateHome());
  }, []);

  useEffect(() => {
    const getFriendsAndSort = async () => {
      const friendsNotSorted = await Promise.all(
        user.friends.map(async (friend) => {
          return await req.get(`/user/${friend}`);
        })
      );
      const sortedFriends = sortArrayByAlphaBeit(friendsNotSorted);
      setSortedFriends(sortedFriends);
    };

    getFriendsAndSort();
  }, [user]);

  const deactivateDropdownHandler = () => {
    dispatch(dropdownActions.deactivate());
  };

  return (
    <div id={theme}>
      <Navbar />
      <div className={classes["dashboard-home"]}>
        <div
          className={classes["left-menu"]}
          onClick={deactivateDropdownHandler}
        >
          <Menu />
        </div>
        <div className={classes["dashboard-home-wrapper"]}>
          <DashboardHome friends={sortedFriends} />
        </div>
      </div>
    </div>
  );
};

export default Home;
