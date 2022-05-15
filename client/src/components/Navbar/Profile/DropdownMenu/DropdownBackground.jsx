import classes from "./DropdownBackground.module.css"

const DropdownBackground = (props) => {
    return <div className={classes.backdground} onClick={props.onClose}>{props.children}</div>;
  };

export default DropdownBackground;