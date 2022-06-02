import classes from "./SignupForm.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import getLocations from "../../helpers/countries-api/getLocations";
import {
  CountrySelector,
  CitySelector,
} from "./LocationSelector/LocationSelector";

const LoginForm = () => {
  const [isPw, setIsPw] = useState({ visable: false, type: "password" });
  const [countries, setCountries] = useState([]);
  const [countryFocus, setCountryFocus] = useState(false);
  const [countryObj, setCountryObj] = useState({});
  const [country, setCountry] = useState("");

  const [cityFocus, setCityFocus] = useState(false);
  const [city, setCity] = useState("");
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    profilePicture: "",
    coverPicture: "",
    followers: [],
    following: [],
    country: "",
    city: "",
    createdAt: null,
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
    setUser(prevState => {
      return{
        ...prevState,
        country: e.target.value
      }
    })
    setCountryObj(null);
  };

  const visibilityHandler = () => {
    setIsPw({ visable: true, type: "text" });
  };

  const visibilityOffHandler = () => {
    setIsPw({ visable: false, type: "password" });
  };

  const signupHandler = (e) => {
    e.preventDefault();
    console.log(user);
  };

  const setUserHandler = e => {
    console.log(e);
    setUser(prevState => {
      // const field = e.target.name
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <div className={classes["sr-card"]}>
      <h2 className={classes["sr-title"]}>Sign Up</h2>
      <form className={classes["sr-form"]} onSubmit={signupHandler}>
        <span className={classes["sr-form-text"]}>First name</span>
        <input className={classes["sr-input"]} name="firstname" type="text" onChange={setUserHandler} />
        <span className={classes["sr-form-text"]}>Last name</span>
        <input className={classes["sr-input"]} name="lastname" type="text" onChange={setUserHandler} />
        <span className={classes["sr-form-text"]}>Country</span>
        <div className={classes["sr-country-wrapper"]}>
          <input
            className={`${classes["sr-input"]} ${classes["sr-input-country"]}`}
            name="country"
            type="text"
            value={country}
            onChange={countryHandler}
            onFocus={() => {
              setCountryFocus(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setCountryFocus(false);
              }, 200);
            }}
          />
          {countryFocus && (
            <CountrySelector
              country={country}
              countries={countries}
              onSetCountryObj={setCountryObj}
              onSetCountry={setCountry}
              onSetUser={setUser}
            />
          )}
        </div>
        <span className={classes["sr-form-text"]}>City</span>
        <div className={classes["sr-country-wrapper"]}>
          <input
            className={`${classes["sr-input"]} ${classes["sr-input-country"]} ${
              country === "" && classes["disabled"]
            }`}
            name="city"
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            onFocus={() => {
              setCityFocus(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setCityFocus(false);
              }, 100);
            }}
            disabled={country === "" ? true : false}
          />
          {cityFocus && countryObj && (
            <CitySelector
              city={city}
              country={countryObj}
              onSetCity={setCity}
            />
          )}
        </div>
        <span className={classes["sr-form-text"]}>E-Mail</span>
        <input className={classes["sr-input"]} name="email" type="email" onChange={setUserHandler} />
        <span className={classes["sr-form-text"]}>Password</span>
        <div className={classes["sr-input"]}>
          <input className={classes["sr-input-password"]} type={isPw.type} />
          {!isPw.visable && (
            <Visibility
              className={classes["sr-visibility"]}
              onClick={visibilityHandler}
            />
          )}
          {isPw.visable && (
            <VisibilityOff
              className={classes["sr-visibility"]}
              onClick={visibilityOffHandler}
            />
          )}
        </div>
        <button className={classes["sr-signup-button"]} type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default LoginForm;
