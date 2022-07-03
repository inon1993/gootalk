import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Menu from "../../components/Dashboard/Menu/Menu";
import Navbar from "../../components/Navbar/Navbar";
import ppIcon from "../../images/pp-icon.png";
import classes from "./ExpendedUsers.module.css";
import useRequest from "../../hooks/useRequest";

const ExpendedUsers = () => {
  const [numButtons, setNumButtons] = useState([]);
  const [sliceVal, setSliceVal] = useState({ start: 0, end: 10 });
  const [searchParams, setSearchParams] = useSearchParams();
  const [usersList, setUsers] = useState([]);
  const fetchUsers = useRequest("/user/", "GET");
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    getUsers();
  }, []);

  useEffect(() => {
    console.log(usersList);
    let filteredUsers = usersList.filter((user) => {
      if (
        user.firstname.toLowerCase().includes(searchParams.get("query")) ||
        user.lastname.toLowerCase().includes(searchParams.get("query"))
      ) {
        return user;
      }
    });
    let length = filteredUsers.length;
    let numOfButtons = Math.ceil(length / 10);
    let arr = [];
    for (let i = 1; i <= numOfButtons; i++) {
      arr.push(i);
    }
    console.log(filteredUsers);
    setFilteredList(filteredUsers);
    setNumButtons(arr);
    setLoading(false);
  }, [searchParams, usersList]);

  const sliceHandler = (e) => {
    if (e.target.innerText === 1) {
      setSliceVal({ start: 0, end: 10 });
      return;
    }
    setSliceVal({
      start: (+e.target.innerText - 1) * 10,
      end: (+e.target.innerText - 1) * 10 + 10,
    });
  };

  const submitSearchHandler = (e) => {
    e.preventDefault();
    setSearchParams({ query: e.target[0].value });
  };

  return (
    <>
      <Navbar />
      <div className={classes["search-dashboard"]}>
        <div className={classes["search-menu"]}>
          <Menu />
        </div>
        <div className={classes["results-expended-wrapper"]}>
          <div className={classes["search-upper"]}>
            <form
              className={classes["search-bar-expended"]}
              onSubmit={submitSearchHandler}
            >
              <input
                className={classes["search-expended"]}
                type="text"
                placeholder="Search for friends..."
                defaultValue={searchParams.get("query")}
              />
            </form>
            {searchParams.get("query") && filteredList.length !== 0 ? (
              <div className={classes["results-expended"]}>
                {filteredList
                  .slice(sliceVal.start, sliceVal.end)
                  .map((res, i) => {
                    return (
                      <div className={classes["users-expended"]} key={i}>
                        <img
                          className={classes["pic-expended"]}
                          src={res.pictureProfile || ppIcon}
                          alt="profile"
                        />
                        <div className={classes["name-expended"]}>
                          <h3>{res.firstname}</h3>
                          <h4>{res.lastname}</h4>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <span className={classes["no-users"]}>
                {loading ? "Loading..." : "No users found..."}
              </span>
            )}
          </div>

          <div className={classes["page-buttons"]}>
            {numButtons.map((buttonNum, i) => {
              return (
                <button
                  className={classes["page-num"]}
                  key={i}
                  onClick={sliceHandler}
                >
                  {buttonNum}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpendedUsers;
