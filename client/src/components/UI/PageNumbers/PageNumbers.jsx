import { useState, useEffect } from "react";
import classes from "./PageNumbers.module.css";

const PageNumbers = ({ list, sliceVal }) => {
  const [numButtons, setNumButtons] = useState([]);
  const [clicked, setClicked] = useState(1);

  useEffect(() => {
    let length = list.length;
    let numOfButtons = Math.ceil(length / 10);
    let arr = [];
    for (let i = 1; i <= numOfButtons; i++) {
      arr.push(i);
    }
    setNumButtons(arr);
  }, [list]);

  const sliceHandler = (e) => {
    e.preventDefault();
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

  const handleChange = (e) => {
    setClicked(e.target.value);
  };

  return (
    <div className={classes["page-buttons"]}>
      {numButtons.map((buttonNum, i) => {
        return (
          <div key={i}>
            <input
              type="radio"
              id={i}
              name="fav_language"
              value={i + 1}
              checked={clicked == i + 1}
              // onChange={handleChange}
              style={{ display: "none" }}
            />
            <label
              className={classes["page-num"]}
              htmlFor={i}
              onClick={sliceHandler}
            >
              {buttonNum}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default PageNumbers;
