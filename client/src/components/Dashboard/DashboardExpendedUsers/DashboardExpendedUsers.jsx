import classes from "./DashboardExpendedUsers.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import ppIcon from "../../../images/pp-icon-small.png";
import PageNumbers from "../../../components/UI/PageNumbers/PageNumbers";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/user-slice";
import useLogout from "../../../hooks/useLogout";

const DashboardExpendedUsers = () => {
  const [sliceVal, setSliceVal] = useState({ start: 0, end: 10 });
  const [searchParams, setSearchParams] = useSearchParams();
  const [usersList, setUsers] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const req = useAxiosPrivate();
  const location = useLocation();
  const dispach = useDispatch();
  const logout = useLogout();

  const controller = new AbortController();

  useEffect(() => {
    let isMounted = true;
    const getUsers = async () => {
      try {
        const fetchedUsers = await req.get("/user/");
        isMounted && setUsers(fetchedUsers.data);
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
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (searchParams.get("query")) {
      let filteredUsers = usersList.filter((user) => {
        if (
          user.firstname
            .toLowerCase()
            .includes(searchParams.get("query").toLowerCase()) ||
          user.lastname
            .toLowerCase()
            .includes(searchParams.get("query").toLowerCase())
        ) {
          return user;
        }
      });
      setFilteredList(filteredUsers);
    }

    setLoading(false);
  }, [searchParams, usersList]);

  const submitSearchHandler = (e) => {
    e.preventDefault();
    setSearchParams({ query: e.target[0].value });
  };

  return (
    <>
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
                    <div
                      className={classes["users-expended"]}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/users/${res._id}/${res.firstname}-${res.lastname}`
                        );
                      }}
                    >
                      <img
                        className={classes["pic-expended"]}
                        src={res.profilePicture || ppIcon}
                        alt="profile"
                      />
                      <div className={classes["name-expended"]}>
                        <span className={classes["ue-name"]}>
                          {res.firstname}
                        </span>
                        <span className={classes["ue-name"]}>
                          {res.lastname}
                        </span>
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
        {searchParams.get("query") && (
          <PageNumbers length={filteredList.length} sliceVal={setSliceVal} />
        )}
      </div>
    </>
  );
};

export default DashboardExpendedUsers;
