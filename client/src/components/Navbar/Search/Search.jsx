import { SearchRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useNavigate,
  useLocation,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import ppIcon from "../../../images/pp-icon-small.png";
import classes from "./Search.module.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { userActions } from "../../../store/user-slice";
import useLogout from "../../../hooks/useLogout";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [isExpended, setIsExpended] = useState(false);
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useSearchParams();
  const req = useAxiosPrivate();
  const dispach = useDispatch();
  const logout = useLogout();

  useEffect(() => {
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const fetchedUsers = await req.get("/user/");
        setUsers(fetchedUsers.data);
      } catch (error) {
        if (navigator.onLine) {
          await logout();
          navigate("/login", { state: { from: location }, replace: true });
          dispach(userActions.logoutUser());
        }
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
