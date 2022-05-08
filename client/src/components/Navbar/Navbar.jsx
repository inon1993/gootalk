import classes from "./Navbar.module.css";
import {Search} from '@mui/icons-material';

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes.logo}>
        <h1 className={classes["navbar-logo"]}>
          Goo<span className={classes["logo-span"]}>talk</span>
        </h1>
      </div>
      <div className={classes.search}>
        <div className={classes["navbar-search"]}>
          <Search />
          <input type="text" />
        </div>
      </div>
      <div className={classes["navbar-features"]}>
        <button>A</button>
        <button>B</button>
        <button>C</button>
      </div>
    </div>
  );
};

export default Navbar;
