import axios from "axios";

export const signup = async (data, profilePicture) => {
  const user = await axios({
    url: "/auth/register",
    method: "POST",
    data: { data, profilePicture },
  });
  return user;
};

export const login = async (email, password) => {
  const user = await axios({
    url: "/auth/login",
    method: "POST",
    data: { email, password },
  });
  return user;
};

export const createSettings = async (payload) => {
  await axios({
    url: "/settings/create",
    method: "POST",
    data: payload,
  });
};

export const logout = async (accessToken) => {
  await axios.get("/logout", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
};

export const uploadImage = async (profilePicture, page) => {
  try {
    const url = await axios({
      url: "/auth/upload",
      method: "POST",
      data: { profilePicture, page },
    });
    return url;
  } catch (error) {
    throw new Error(error);
  }
};
