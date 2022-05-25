import Card from "../../components/UI/Card/Card";
import classes from "./Login.module.css";

const Login = () => {
    return (
        <div className={classes.login}>
            <Card className={classes["login-box"]}>
                <div className={classes["login-welcome"]}>
                    <span>Welcome to Gootalk!</span>
                </div>
                <div className={classes["login-form-wrapper"]}>
                    <form className={classes["login-form"]}>
                        <span className={classes["lofin-from-text"]}>E-Mail</span>
                        <input className={classes["login-input"]} type="text" />
                        <span className={classes["lofin-from-text"]}>Password</span>
                        <input className={classes["login-input"]} type="password" />
                        <button className={classes["login-button"]} type="button">Login</button>
                        <span>Not a user yet?</span>
                        <button className={classes["login-signup-button"]}>Sign Up</button>
                    </form>
                </div>
            </Card>
        </div>
    )
}

export default Login;