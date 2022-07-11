import { SearchRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useSelector,
  useNavigate,
  useLocation,
  useSearchParams,
  createSearchParams,
  Link,
} from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import ppIcon from "../../../images/pp-icon.png";
import classes from "./Search.module.css";
import { navbarActions } from "../../../store/navbar-slice";
import { menuActions } from "../../../store/menu-slice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { userActions } from "../../../store/user-slice";

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
  const req = useAxiosPrivate();
  const dispach = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const fetchedUsers = await req.get("/user/");
        setUsers(fetchedUsers.data);
      } catch (error) {
        navigate("/login", { state: { from: location }, replace: true });
        dispach(userActions.logoutUser());
      }
    };
    getUsers();

    return () => {
      controller.abort();
    };
  }, []);

  const expendHandler = () => {
    setSearch();
    navigate(
      {
        pathname: "/search",
        search: `?${createSearchParams({
          query: query,
        })}`,
      },
      { state: { from: location }, replace: true }
    );
    // dispatch(navbarActions.toggleSearchInput());
    // dispatch(navbarActions.deactivate());
    // dispatch(menuActions.deactivate());
    setIsExpended(true);
  };

  // const userSearchHandler = () => {
  //   navigate("/")
  // }

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
      {focus && query !== "" && isExpended === false && users && (
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
                    navigate(
                      `/users/${res._id}/${res.firstname}-${res.lastname}`
                    );
                  }}
                >
                  <img
                    className={classes["search-pic"]}
                    src={res.profilePicture || ppIcon}
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
    </div>
  );
};

export default Search;
