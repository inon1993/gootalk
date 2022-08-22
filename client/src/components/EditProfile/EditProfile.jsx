import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import classes from "./EditProfile.module.css";
import ppIcon from "../../images/pp-icon-biggest.png";
import coverImg from "../../images/gootalk-cover.jpg";
import { CountrySelector } from "../SignupForm/LocationSelector/LocationSelector";
import getLocations from "../../helpers/countries-api/getLocations";

const EditProfile = () => {
  const user = useSelector((state) => state.user.user);
  const [countries, setCountries] = useState([]);
  const [countryFocus, setCountryFocus] = useState(false);
  const [countryObj, setCountryObj] = useState({});
  const [country, setCountry] = useState("");
  // const [isEmptyCountries, setIsEmptyCountries] = useState(true)

  const [cityFocus, setCityFocus] = useState(false);
  const [city, setCity] = useState("");

  const [updatedUser, setUpdatedUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    profilePicture: "",
    country: "",
    city: "",
    password: "",
  });

  useEffect(() => {
    const getCountriesList = async () => {
      const countriesList = await getLocations();
      setCountries(countriesList);
    };

    getCountriesList();
  }, []);

  const countryHandler = (e) => {
    setCountry(e.target.value);
    setUpdatedUser((prevState) => {
      return {
        ...prevState,
        country: e.target.value,
      };
    });
    setCountryObj(null);
  };

  return (
    <div className={classes["edit-wrapper"]}>
      <div className={classes["profile-cover-wrapper"]}>
        <span className={classes["edit-text"]}>Cover picture:</span>
        <img
          className={classes["profile-cover"]}
          src={user.coverPicture || coverImg}
          alt="cover"
        />
      </div>
      <div className={classes["profile-picture"]}>
        <span className={classes["edit-text"]}>Profile picture:</span>
        <img
          className={classes["profile-pic"]}
          src={user.profilePicture || ppIcon}
          alt="cover"
        />
      </div>
      <div className={classes["edit-firstname"]}>
        <span className={classes["edit-text"]}>First name:</span>
        <input
          className={classes["edit-input"]}
          type="text"
          defaultValue={user.firstname}
        />
      </div>
      <div className={classes["edit-firstname"]}>
        <span className={classes["edit-text"]}>Last name:</span>
        <input
          className={classes["edit-input"]}
          type="text"
          defaultValue={user.lastname}
        />
      </div>
      <div className={classes["edit-country-wrapper"]}>
        <span className={classes["edit-text"]}>Country:</span>
        <div className={classes["edit-country"]}>
          <input
          className={`${classes["edit-input-country"]}`}
          name="country"
          type="text"
          value={country || user.country}
          onChange={countryHandler}
          onFocus={() => {
            setCountryFocus(true);
          }}
          onBlur={() => setCountryFocus(false)}
          autoComplete="none"
          defaultValue={user.country}
        />
        {countryFocus && (
          <CountrySelector
            country={country}
            countries={countries}
            onSetCountryObj={setCountryObj}
            onSetCountry={setCountry}
            onSetUser={setUpdatedUser}
            // onEmptyCountries={setIsEmptyCountries}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
