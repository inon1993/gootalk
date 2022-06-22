import { AccountCircleRounded, AddCircleOutline } from "@mui/icons-material";
import SignupForm from "../../components/SignupForm/SignupForm";
import classes from "./Signup.module.css";

const Signup = () => {
  return (
    <div className={classes["signup-wrapper"]}>
      <div className={classes["login-left"]}>
        <div className={classes["sl-add-pic"]}>
          <AccountCircleRounded className={classes["sl-add-pic-icon"]} />
          <AddCircleOutline className={classes["add-icon"]} />
        </div>
      </div>
      <div className={classes["login-right"]}>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
