import axios from "axios";

export const signup = async (data, profilePicture) => {
  const user = await axios({
    url: "api/auth/register",
    method: "POST",
    data: { data, profilePicture },
  });
  return user;
};

export const login = async (email, password) => {
  const user = await axios({
    url: "api/auth/login",
    method: "POST",
    data: { email, password },
  });
  return user;
};

export const logout = async (accessToken) => {
  await axios.get("api/logout", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
};

export const uploadImage = async (profilePicture) => {
  try {
    const url = await axios({
      url: "api/auth/upload",
      method: "POST",
      data: { profilePicture },
    });
    return url;
  } catch (error) {
    throw new Error(error);
  }
};
