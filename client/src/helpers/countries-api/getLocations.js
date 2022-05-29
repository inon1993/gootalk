import axios from "axios";

const getLocations = async () => {
  const locations = await axios.get(
    "https://countriesnow.space/api/v0.1/countries"
  );

  return locations.data.data;
};

export default getLocations;
