import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Menu from "../../components/Dashboard/Menu/Menu";
import Navbar from "../../components/Navbar/Navbar";
import ppIcon from "../../images/pp-icon.png";
import classes from "./ExpendedUsers.module.css";
import useRequest from "../../hooks/useRequest";

const ExpendedUsers = () => {
  const [numButtons, setNumButtons] = useState([]);
  const [sliceVal, setSliceVal] = useState({ start: 0, end: 10 });
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(location?.state?.query || "");
  const [usersList, setUsers] = useState([]);
  const fetchUsers = useRequest("/user/", "GET");
  // const [users, setUsers] = useState([])

  useEffect(() => {
    console.log(query);
    console.log(searchParams);
    if(query === "") {
      setQuery(searchParams.get('query'))
    }
    setSearchParams({query: query})
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    getUsers();
  }, [])

  useEffect(() => {
    let a = usersList.filter((user) => {
      if (user.firstname.toLowerCase().includes(query)) {
        return user;
      }
    });
    let length = a.length;
    let numOfButtons = Math.ceil(length / 10);
    let arr = [];
    for (let i = 1; i <= numOfButtons; i++) {
      arr.push(i);
    }
    setNumButtons(arr);
  }, [query, searchParams]);

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
    setQuery(e.target[0].value);
    setSearchParams({query: e.target[0].value})
    // navigate(`/search`, {state: {usersList: usersList, query: e.target[0].value}})
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
                defaultValue={query || searchParams.get('query')}
              />
            </form>
            <div className={classes["results-expended"]}>
              {usersList
                .filter((user) => {
                  if (
                    user.firstname
                      .toLowerCase()
                      .includes(query.toLowerCase() || searchParams.get('query').toLowerCase()) ||
                    user.lastname.toLowerCase().includes(query.toLowerCase() || searchParams.get('query').toLowerCase())
                  ) {
                    return user;
                  }
                })
                .slice(sliceVal.start, sliceVal.end)
                .map((res) => {
                  return (
                    <div className={classes["users-expended"]}>
                      <img
                        className={classes["pic-expended"]}
                        src={res.pictureProfile || ppIcon}
                      />
                      <div className={classes["name-expended"]}>
                        <h3>{res.firstname}</h3>
                        <h4>{res.lastname}</h4>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className={classes["page-buttons"]}>
            {numButtons.map((buttonNum) => {
              return (
                <button className={classes["page-num"]} onClick={sliceHandler}>
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
