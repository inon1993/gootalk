import { ImageRounded } from "@mui/icons-material";
import { useState } from "react";

const UploadPostImg = () => {
  const [previewSource, setPreviewSource] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <>
      <form>
        <labal htmlFor="file-input">
          <ImageRounded />
          <span>Add a Photo</span>
        </labal>
        <input
          style={{ display: "none" }}
          id="file-input"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value=""
        />
      </form>
      {previewSource && <img src={previewSource} />}
    </>
  );
};

export default UploadPostImg;
