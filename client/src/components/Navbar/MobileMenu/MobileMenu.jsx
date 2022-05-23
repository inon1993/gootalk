import classes from "./MobileMenu.module.css";
import Search from "../Search/Search";

const MobileMenu = () => {
  return (
    <div className={classes["mm-features"]}>
      <ul className={classes["mm-ul"]}>
        <li className={classes["mm-search"]}>
          <Search />
        </li>
        <li className={classes["mm-search"]}>
          <Search />
        </li>
        <li className={classes["mm-search"]}>
          <Search />
        </li>
        <li className={classes["mm-search"]}>
          <Search />
        </li>
        <li className={classes["mm-search"]}>
          <Search />
        </li>
        <li className={classes["mm-search"]}>
          <Search />
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
