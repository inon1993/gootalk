import { uploadImage } from "../auth/authRoutes";

export const getPictureUrl = async (picture, page) => {
    if (picture) {
      const imgUrl = await uploadImage(picture, page);
      return imgUrl.data.url;
    } else {
      return null;
    }
  };