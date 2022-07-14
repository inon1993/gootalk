import { useState } from "react";
import classes from "./DashboardFriends.module.css";
import Friend from "./Friend/Friend";
import { useNavigate } from "react-router-dom";
import PageNumbers from "../../UI/PageNumbers/PageNumbers";

const DashboardFriends = ({ friends }) => {
  const [sliceVal, setSliceVal] = useState({ start: 0, end: 10 });
  const navigate = useNavigate();

  return (
    <div className={classes["friends-wrapper"]}>
      <div className={classes["friends-upper"]}>
        <div className={classes["search-friends"]}>
          <form className={classes["friends-search-form"]}>
            <input
              className={classes["friends-search-bar"]}
              placeholder="Search any of your friends."
              defaultValue=""
            />
          </form>
        </div>
        {friends.length > 0 ? (
          <div className={classes["friends-results-wrapper"]}>
            {friends.slice(sliceVal.start, sliceVal.end).map((res, i) => {
              return (
                <div
                  className={classes["friends-results"]}
                  key={i}
                  onClick={() => {
                    console.log(res);
                    navigate(
                      `/users/${res.data._id}/${res.data.firstname}-${res.data.lastname}`
                    );
                  }}
                >
                  <Friend friend={res} />
                </div>
              );
            })}
          </div>
        ) : (
          <span>No friends yet...</span>
        )}
      </div>
      <PageNumbers list={friends} sliceVal={setSliceVal} />
    </div>
  );
};

export default DashboardFriends;
