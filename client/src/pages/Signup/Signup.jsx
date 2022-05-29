import SignupForm from "../../components/SignupForm/SignupForm";
import classes from "./Signup.module.css";

const Signup = () => {
  return (
    <div className={classes["login-wrapper"]}>
      <div className={classes["login-left"]}>
        <h2 className={classes["ll-text"]}>Let's have a</h2>
        <h1 className={classes["ll-goo"]}>
          Goo<span className={classes["ll-talk"]}>talk</span>
        </h1>
      </div>
      <div className={classes["login-right"]}>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
