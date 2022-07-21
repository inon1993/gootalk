import { useState, useEffect } from "react";
import classes from "./DashboardFriends.module.css";
import Friend from "./Friend/Friend";
import { useNavigate } from "react-router-dom";
import PageNumbers from "../../UI/PageNumbers/PageNumbers";
import Loader from "../../UI/Loader/Loader";

const DashboardFriends = ({ friends }) => {
  const [sliceVal, setSliceVal] = useState({ start: 0, end: 10 });
  const [query, setQuery] = useState("");
  const [listArray, setListArray] = useState(friends);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredFriends = friends.filter((res) => {
      if (
        res.data.firstname.toLowerCase().includes(query.toLowerCase()) ||
        res.data.lastname.toLowerCase().includes(query.toLowerCase())
      ) {
        return res;
      }
    });
    setListArray(filteredFriends);
    setSliceVal({ start: 0, end: 10 });
  }, [query, friends]);

  return (
    <div className={classes["friends-wrapper"]}>
      <div className={classes["friends-upper"]}>
        <div className={classes["search-friends"]}>
          <form className={classes["friends-search-form"]}>
            <input
              className={classes["friends-search-bar"]}
              placeholder="Search any of your friends."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </form>
        </div>
        {listArray.length > 0 ? (
          <div className={classes["friends-results-wrapper"]}>
            {listArray.slice(sliceVal.start, sliceVal.end).map((res, i) => {
              return (
                <div
                  className={classes["friends-results"]}
                  key={i}
                  onClick={() => {
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
        ) : friends.length === 0 ? (
          <span className={classes["no-msg"]}>No friends yet...</span>
        ) : listArray.length === 0 ? (
          <span className={classes["no-msg"]}>No results.</span>
        ) : (
          <Loader />
        )}
      </div>
      <PageNumbers length={listArray.length} sliceVal={setSliceVal} />
    </div>
  );
};

export default DashboardFriends;
