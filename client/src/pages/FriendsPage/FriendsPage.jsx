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
import Loader from "../../components/UI/Loader/Loader";

const FriendsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.settings.toggle.theme);
  const req = useAxiosPrivate();
  const [sortedFriends, setSortedFriends] = useState([]);

  useEffect(() => {
    setIsLoading(true);
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
      const sortedFriends = sortArrayByAlphaBeit(friendsNotSorted);
      setSortedFriends(sortedFriends);

      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    };

    getFriendsAndSort();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className={classes["friends-dashboard"]} data-theme={theme}>
        <div className={classes["friends-menu"]}>
          <Menu />
        </div>
        <div className={classes["friends-page-wrapper"]}>
          {isLoading ? (
            <Loader />
          ) : (
            <DashboardFriends friends={sortedFriends} />
          )}
        </div>
      </div>
    </>
  );
};

export default FriendsPage;
