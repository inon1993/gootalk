import { SearchRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useSelector,
  useNavigate,
  useLocation,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import ppIcon from "../../../images/pp-icon.png";
import classes from "./Search.module.css";
import { navbarActions } from "../../../store/navbar-slice";
import { menuActions } from "../../../store/menu-slice";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [isExpended, setIsExpended] = useState(false);
  const [focus, setFocus] = useState(false);
  const fetchUsers = useRequest("/user/", "GET");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    getUsers();
  }, []);

  const expendHandler = () => {
    setSearch({ query: query });
    // navigate(`/search`, {
    //   state: { from: location, query: query },
    //   replace: true,
    // });
    navigate({
      pathname: "search",
      search: `?${createSearchParams({
        query: query,
      })}`,
    });
    dispatch(navbarActions.toggleSearchInput());
    dispatch(navbarActions.deactivate());
    dispatch(menuActions.deactivate());
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
          setFocus(true);
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
