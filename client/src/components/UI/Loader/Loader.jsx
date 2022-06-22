import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes["lds-ellipsis"]}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
