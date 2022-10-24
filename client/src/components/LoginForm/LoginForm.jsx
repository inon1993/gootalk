import classes from "./LoginForm.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import { login, loginDemo } from "../../api/auth/authRoutes";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { accessTokenActions } from "../../store/access-token-slice";
import { CircularProgress } from "@mui/material";
import { settingsActions } from "../../store/settings-slice";

const LoginForm = () => {
  const emailRef = useRef();
  const [isVisiblePw, setISVisiblePw] = useState(false);
  const [isPwInput, setIsPwInput] = useState("password");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const req = useAxiosPrivate();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const visibilityHandler = () => {
    setISVisiblePw(true);
    setIsPwInput("text");
  };

  const visibilityOffHandler = () => {
    setISVisiblePw(false);
    setIsPwInput("password");
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newUser = await login(email.toLowerCase(), password);
      const accessToken = newUser.data.accessToken;
      const userData = newUser.data.data;
      const newUserToSet = {
        userId: userData._id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        country: userData.country,
        city: userData.city,
        profilePicture: userData.profilePicture,
        coverPicture: userData.coverPicture,
      };
      dispatch(userActions.setUser(newUserToSet));
      dispatch(accessTokenActions.setAccessToken(accessToken));
      const settings = await req.get(`/settings/${userData._id}`);
      const notifications = await req.get(`/notifications/${userData._id}`);
      dispatch(settingsActions.setSettings({ theme: settings.data }));
      dispatch(userActions.setFriends({ friends: userData.friends }));
      dispatch(
        userActions.setNotifications({ notifications: notifications.data })
      );
      navigate("/");
      setIsLoading(false);
    } catch (err) {
      if (err.response.status === 404) {
        setErrMsg("User not found.");
      } else if (err.response.status === 400) {
        setErrMsg("Invalid password.");
      } else {
        setErrMsg("Login failed.");
      }
      setIsLoading(false);
    }
  };

  const loginDemoHandler = async () => {
    setIsLoading(true);
    try {
      const newUser = await loginDemo();
      const accessToken = newUser.data.accessToken;
      const userData = newUser.data.data;
      const newUserToSet = {
        userId: userData._id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        country: userData.country,
        city: userData.city,
        profilePicture: userData.profilePicture,
        coverPicture: userData.coverPicture,
      };
      dispatch(userActions.setUser(newUserToSet));
      dispatch(accessTokenActions.setAccessToken(accessToken));
      const settings = await req.get(`/settings/${userData._id}`);
      const notifications = await req.get(`/notifications/${userData._id}`);
      dispatch(settingsActions.setSettings({ theme: settings.data }));
      dispatch(userActions.setFriends({ friends: userData.friends }));
      dispatch(
        userActions.setNotifications({ notifications: notifications.data })
      );
      navigate("/");
      setIsLoading(false);
    } catch (err) {
      if (err.response.status === 404) {
        setErrMsg("User not found.");
      } else if (err.response.status === 400) {
        setErrMsg("Invalid password.");
      } else {
        setErrMsg("Login failed.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={classes["lr-card"]}>
      <h2 className={classes["lr-title"]}>Login</h2>
      <form className={classes["lr-form"]} onSubmit={loginSubmitHandler}>
        <span className={classes["lr-form-text"]}>E-Mail</span>
        <input
          className={classes["lr-input"]}
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setErrMsg(null);
          }}
          autoComplete="none"
          required
          ref={emailRef}
          maxLength={50}
        />
        <span className={classes["lr-form-text"]}>Password</span>
        <div className={classes["lr-input"]}>
          <input
            className={classes["lr-input-password"]}
            type={isPwInput}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="none"
            required
            maxLength={50}
          />
          {!isVisiblePw && (
            <Visibility
              className={classes["lr-visibility"]}
              onClick={visibilityHandler}
            />
          )}
          {isVisiblePw && (
            <VisibilityOff
              className={classes["lr-visibility"]}
              onClick={visibilityOffHandler}
            />
          )}
        </div>
        <span
          className={`${classes["no-error"]} ${
            email !== "" && errMsg && classes.error
          }`}
        >
          {errMsg}
        </span>
        <button className={classes["lr-login-button"]}>
          {isLoading ? (
            <CircularProgress style={{ color: "white" }} size="20px" />
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className={classes["lr-signup"]}>
        <span className={classes["lr-s-text"]}>Don't have an account yet?</span>
        <Link to={"/signup"} style={{ textDecoration: "none", width: "100%" }}>
          <button className={classes["lr-signup-button"]}>Sign Up</button>
        </Link>
      </div>
      <span className={classes["demo-login-text"]}>
        Or login to a{" "}
        <span className={classes["demo-login-btn"]} onClick={loginDemoHandler}>
          DEMO
        </span>{" "}
        account
      </span>
    </div>
  );
};

export default LoginForm;
