import { useState, useEffect } from "react";
import classes from "./PageNumbers.module.css";

const PageNumbers = ({ list, sliceVal }) => {
  const [numButtons, setNumButtons] = useState([]);
  const [clicked, setClicked] = useState(false);

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
      console.log('click');
      console.log(e.target);
      setClicked(true)
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
        //   <div
        //     className={`${!clicked && classes["page-num"]} ${clicked && classes["page-num-focus"]}`}
        //     key={i}
        //     onClick={sliceHandler}
        //     // onFocus={() => setClicked(true)}
        //     // onBlur={() => setClicked(false)}
        //   >
        //     {buttonNum}
        //   </div>
            <div  key={i}>
        <input type="radio" id={i} name="fav_language" value="HTML" /*onChange={sliceHandler}*/ checked={clicked} style={{display: "none"}} />
        <label className={classes["page-num"]} htmlFor={i} onClick={sliceHandler}>{buttonNum} </label>
            {/* <button type="submit">send</button> */}
        </div>
        );
      })}
    </div>
  );
};

export default PageNumbers;
