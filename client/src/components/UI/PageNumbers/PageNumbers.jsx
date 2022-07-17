import { useState, useEffect } from "react";
import classes from "./PageNumbers.module.css";

const PageNumbers = ({ length, sliceVal }) => {
  const [numButtons, setNumButtons] = useState([]);
  const [clicked, setClicked] = useState(1);

  useEffect(() => {
    let numOfButtons = Math.ceil(length / 10);
    let arr = [];
    for (let i = 1; i <= numOfButtons; i++) {
      arr.push(i);
    }
    setNumButtons(arr);
    setClicked(1);
  }, [length]);

  const sliceHandler = (e) => {
    setClicked(e.target.innerText);
    if (e.target.innerText === 1) {
      sliceVal({ start: 0, end: 10 });
      return;
    }
    sliceVal({
      start: (+e.target.innerText - 1) * 10,
      end: (+e.target.innerText - 1) * 10 + 10,
    });
  };

  return (
    <div className={classes["page-buttons"]}>
      {numButtons.map((buttonNum, i) => {
        return (
          <div
            className={`${classes["page-button"]} ${
              clicked == i + 1 && classes["page-button-checked"]
            }`}
            key={i}
            onClick={sliceHandler}
          >
            {buttonNum}
          </div>
        );
      })}
    </div>
  );
};

export default PageNumbers;
