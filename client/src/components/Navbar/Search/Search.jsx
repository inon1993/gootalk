import { SearchRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import ppIcon from "../../../images/pp-icon.png";
import classes from "./Search.module.css";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [isExpended, setIsExpended] = useState(false);
  const [focus, setFocus] = useState(false);
  const fetchUsers = useRequest("/user/", "GET");
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    getUsers();
  }, []);

  const expendHandler = () => {
    navigate(`/search?query=${query}`, {state: {usersList: users, query: query}})
    setIsExpended(true);
  };

  return (
    <div
      className={`${classes["navbar-search"]} ${
        query !== "" && focus && classes["navbar-search-text"]
      }`}
    >
      <SearchRounded className={classes["search-icon"]} />
      <input
        className={classes["search-input"]}
        type="text"
        placeholder="Search for friends..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onFocus={() => {
          setFocus(true)
        }}
        onBlur={() => {
          setFocus(false);
        }}
      />
      {focus && query !== "" && isExpended === false && (
        <div className={classes["search-results"]}>
          {users
            .filter((user) => {
              if (
                user.firstname.toLowerCase().includes(query.toLowerCase()) ||
                user.lastname.toLowerCase().includes(query.toLowerCase())
              ) {
                return user;
              }
            })
            .slice(0, 3)
            .map((res, i) => {
              return (
                <div
                  key={i}
                  className={classes["search-users"]}
                  onMouseDown={() => {
                    // do something
                  }}
                >
                  <img
                    className={classes["search-pic"]}
                    src={res.pictureProfile || ppIcon}
                    alt="profile"
                  />
                  <div className={classes["search-name"]}>
                    <span className={classes["search-firstname"]}>
                      {res.firstname}
                    </span>
                    <span className={classes["search-lastname"]}>
                      {res.lastname}
                    </span>
                  </div>
                </div>
              );
            })}
          <p className={classes["search-expend"]} onMouseDown={expendHandler}>
            Show More
          </p>
        </div>
      )}
      {/* {isExpended && query !== "" && <ExpendedUsers usersList={users} query={query}/>} */}
    </div>
  );
};

export default Search;
