import { useDispatch, useSelector } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { menuActions } from "../../store/menu-slice";
import Navbar from "../../components/Navbar/Navbar";
import Menu from "../../components/Dashboard/Menu/Menu";
import { useEffect, useState } from "react";
import classes from "./FriendsPage.module.css";
import DashboardFriends from "../../components/Dashboard/DashboardFriends/DashboardFriends";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import sortArrayByAlphaBeit from "../../helpers/custom-functions/sortArrayByAlphaBeit";

const FriendsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const req = useAxiosPrivate();
  const [sortedFriends, setSortedFriends] = useState([]);

  useEffect(() => {
    dispatch(navbarActions.activateSearchInput());
    dispatch(navbarActions.deactivate());
    dispatch(menuActions.activateFriends());
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
  }, []);

  return (
    <>
      <Navbar />
      <div className={classes["friends-dashboard"]}>
        <div className={classes["friends-menu"]}>
          <Menu />
        </div>
        <div className={classes["friends-page-wrapper"]}>
          <DashboardFriends friends={sortedFriends} />
        </div>
      </div>
    </>
  );
};

export default FriendsPage;
