import classes from "./Login.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const Login = () => {
  const [isVisiblePw, setISVisiblePw] = useState(false);
  const [isPwInput, setIsPwInput] = useState("password");

  const visibilityHandler = () => {
    setISVisiblePw(true);
    setIsPwInput("text");
  };

  const visibilityOffHandler = () => {
    setISVisiblePw(false);
    setIsPwInput("password");
  };
  return (
    <div className={classes["login-wrapper"]}>
      <div className={classes["login-left"]}>
        <h2 className={classes["ll-text"]}>Let's have a</h2>
        <h1 className={classes["ll-goo"]}>
          Goo<span className={classes["ll-talk"]}>talk</span>
        </h1>
      </div>
      <div className={classes["login-right"]}>
        <h2 className={classes["lr-title"]}>Login</h2>
        <form className={classes["lr-form"]}>
          <span className={classes["lr-form-text"]}>E-Mail</span>
          <input className={classes["lr-input"]} type="text" />
          <span className={classes["lr-form-text"]}>Password</span>
          <div className={classes["lr-input"]}>
            <input className={classes["lr-input-password"]} type={isPwInput} />
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
          <button className={classes["lr-login-button"]}>Login</button>
        </form>
        <div className={classes["lr-signup"]}>
          <span className={classes["lr-s-text"]}>
            Don't have an account yet?
          </span>
          <button className={classes["lr-signup-button"]}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
