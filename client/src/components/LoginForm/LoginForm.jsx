import classes from "./LoginForm.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth/authRoutes";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";

const LoginForm = () => {
  const [isVisiblePw, setISVisiblePw] = useState(false);
  const [isPwInput, setIsPwInput] = useState("password");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    try {
      const newUser = await login(email, password);
      const accessToken = newUser.data.accessToken;
      const userData = newUser.data.user;
      const newUserToSet = {
        userId: userData._id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        country: userData.country,
        city: userData.city,
        profilePicture: userData.profilePicture,
        accessToken: accessToken,
      };
      dispatch(userActions.setUser(newUserToSet));
      navigate("/");
    } catch (err) {
      if (err.response.status === 404) {
        setErrMsg("User not found.");
      } else if (err.response.status === 400) {
        setErrMsg("Invalid password.");
      } else {
        setErrMsg("Login failed.");
      }
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
        />
        <span className={classes["lr-form-text"]}>Password</span>
        <div className={classes["lr-input"]}>
          <input
            className={classes["lr-input-password"]}
            type={isPwInput}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="none"
            required
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
        <button className={classes["lr-login-button"]}>Login</button>
      </form>
      <div className={classes["lr-signup"]}>
        <span className={classes["lr-s-text"]}>Don't have an account yet?</span>
        <Link to={"/signup"} style={{ textDecoration: "none", width: "100%" }}>
          <button className={classes["lr-signup-button"]}>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
