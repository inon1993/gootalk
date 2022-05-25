import Card from "../../components/UI/Card/Card";
import classes from "./Login.module.css";

const Login = () => {
  return (
    <div className={classes.login}>
        <div className={classes["login-welcome"]}>
          <span className={classes["login-welcome-text"]}>
            Welcome to Gootalk!
          </span>
        </div>
      <div className={classes["login-box"]}>
        
        <div className={classes["login-form-wrapper"]}>
          <form className={classes["login-form"]}>
            <h2 className={classes["login-title"]}>Login</h2>
            <span className={classes["login-form-text"]}>E-Mail</span>
            <input className={classes["login-input"]} type="email" />
            <span className={classes["login-form-text"]}>Password</span>
            <input className={classes["login-input"]} type="password" />
            <button className={classes["login-button"]}>Login</button>
          </form>
          <div className={classes["login-signup"]}>
            <span>Not a user yet?</span>
            <button className={classes["login-signup-button"]}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
