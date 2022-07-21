import { ImageRounded } from "@mui/icons-material";
import { useState } from "react";
import classes from "./UploadPostImg.module.css";

const UploadPostImg = ({ imgToSet }) => {
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      imgToSet(reader.result);
    };
  };

  return (
    <>
      <form>
        <label htmlFor="file-input" className={classes["post-img"]}>
          <ImageRounded className={classes["new-post-add-img-icon"]} />
          <span className={classes["new-post-add-img-text"]}>Add a Photo</span>
        </label>
        <input
          style={{ display: "none" }}
          id="file-input"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value=""
        />
      </form>
    </>
  );
};

export default UploadPostImg;
