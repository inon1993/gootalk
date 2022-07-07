import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Menu from "../../components/Dashboard/Menu/Menu";
import Navbar from "../../components/Navbar/Navbar";
import ppIcon from "../../images/pp-icon.png";
import classes from "./ExpendedUsers.module.css";
import useRequest from "../../hooks/useRequest";
import PageNumbers from "../../components/UI/PageNumbers/PageNumbers";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";

const ExpendedUsers = () => {
  const [sliceVal, setSliceVal] = useState({ start: 0, end: 10 });
  const [searchParams, setSearchParams] = useSearchParams();
  const [usersList, setUsers] = useState([]);
  const fetchUsers = useRequest("/user/", "GET");
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const req = useAxiosPrivate();
  const location = useLocation();
  const dispach = useDispatch();

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const fetchedUsers = await fetchUsers();
  //     setUsers(fetchedUsers);
  //   };
  //   getUsers();
  // }, []);

  const controller = new AbortController();

  useEffect(() => {


    let isMounted = true;
    const getUsers = async () => {
      // const fetchedUsers = await fetchUsers();
      try {
        console.log(11);
        const fetchedUsers = await req.get("/user/");
        // console.log(fe);
        isMounted && setUsers(fetchedUsers.data);
      } catch (error) {
        console.log(22);
        navigate("/login", { state: { from: location }, replace: true });
        dispach(userActions.logoutUser());
      }
      
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };

  }, [])
  
  useEffect(() => {
    let filteredUsers = usersList.filter((user) => {
      if (
        user.firstname.toLowerCase().includes(searchParams.get("query")) ||
        user.lastname.toLowerCase().includes(searchParams.get("query"))
      ) {
        return user;
      }
    });
    setFilteredList(filteredUsers);
    setLoading(false);
  }, [searchParams, usersList]);

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
          <PageNumbers list={filteredList} sliceVal={setSliceVal} />
        </div>
      </div>
    </>
  );
};

export default ExpendedUsers;
