import Card from "../../components/UI/Card/Card";
import classes from "./Login.module.css";

const Login = () => {
  return (
    <div className={classes.login}>
      <div className={classes["login-box"]}>
        <div className={classes["login-welcome"]}>
          <span>Welcome to Gootalk!</span>
        </div>
        <div className={classes["login-form-wrapper"]}>
          <h2 className={classes["login-title"]}>Login</h2>
          <form className={classes["login-form"]}>
            <span className={classes["login-form-text"]}>E-Mail</span>
            <input className={classes["login-input"]} type="text" />
            <span className={classes["login-form-text"]}>Password</span>
            <input className={classes["login-input"]} type="password" />
            <button className={classes["login-button"]} type="button">
              Login
            </button>
            <span>Not a user yet?</span>
            <button className={classes["login-signup-button"]}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
