import { useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import classes from "./DashboardFriends.module.css";
import Friend from "./Friend/Friend";

const DashboardFriends = ({ friends }) => {
  return (
    <div className={classes["friends-wrapper"]}>
      <div className={classes["search-friends"]}>
        <form className={classes["friends-search-form"]}>
          <input
            className={classes["friends-search-bar"]}
            placeholder="Search any of your friends."
            defaultValue=""
          />
        </form>
      </div>
      <div className={classes["friends-results-wrapper"]}>
        {friends.length > 0 &&
          friends.map((f) => {
            return (
              <div className={classes["friends-results"]}>
                <Friend friend={f} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DashboardFriends;
