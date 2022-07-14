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
        user.friends.map(async (f) => {
          return await req.get(`/user/${f}`);
        })
      );
      // sorted.sort((a, b) => {
      //   return `${a.data.firstname}${a.data.lastname}` >
      //     `${b.data.firstname}${b.data.lastname}`
      //     ? 1
      //     : -1;
      // });
      const sortedFriends = sortArrayByAlphaBeit(friendsNotSorted)
      setSortedFriends(sortedFriends);
    };

    getFriendsAndSort();
  }, [user]);

  const deactivateDropdownHandler = () => {
    dispatch(dropdownActions.deactivate());
  };

  return (
    <div>
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
