import classes from "./SignupForm.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import getLocations from "../../helpers/countries-api/getLocations";

const LoginForm = () => {
  const [isPw, setIsPw] = useState({ visable: false, type: "password" });
  const [countries, setCountries] = useState([]);
  const [countryFocus, setCountryFocus] = useState(false);
  const [country, setCountry] = useState("");

  useEffect(() => {
    const getCountriesList = async () => {
      const countriesList = await getLocations();
      setCountries(countriesList);
    };

    getCountriesList();
  }, []);

  const countryHandler = (e) => {
    setCountry(e.target.value);
  };

  const visibilityHandler = () => {
    setIsPw({ visable: true, type: "text" });
  };

  const visibilityOffHandler = () => {
    setIsPw({ visable: false, type: "password" });
  };

  return (
    <div className={classes["lr-card"]}>
      <h2 className={classes["lr-title"]}>Sign Up</h2>
      <form className={classes["lr-form"]} onSubmit={(e) => e.preventDefault()}>
        <span className={classes["lr-form-text"]}>First name</span>
        <input className={classes["lr-input"]} type="text" />
        <span className={classes["lr-form-text"]}>Last name</span>
        <input className={classes["lr-input"]} type="text" />
        <span className={classes["lr-form-text"]}>Country</span>
        <div className={classes["sr-country-wrapper"]}>
          <input
            className={`${classes["lr-input"]} ${classes["sr-input-country"]}`}
            type="text"
            value={country}
            onChange={countryHandler}
            onFocus={() => {
              setCountryFocus(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setCountryFocus(false);
              }, 50);
            }}
          />
          {countryFocus && (
            <div className={classes["sr-country"]}>
              {countries.map((country) => {
                return (
                  <span
                    key={`${country.iso2}${country.iso3}${Math.random()}`}
                    className={classes["sr-country-name"]}
                    onClick={() => {
                      setCountry(country.country);
                    }}
                  >
                    {country.country}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <span className={classes["lr-form-text"]}>City</span>
        <input className={classes["lr-input"]} type="text" />
        <span className={classes["lr-form-text"]}>E-Mail</span>
        <input className={classes["lr-input"]} type="text" />
        <span className={classes["lr-form-text"]}>Password</span>
        <div className={classes["lr-input"]}>
          <input className={classes["lr-input-password"]} type={isPw.type} />
          {!isPw.visable && (
            <Visibility
              className={classes["lr-visibility"]}
              onClick={visibilityHandler}
            />
          )}
          {isPw.visable && (
            <VisibilityOff
              className={classes["lr-visibility"]}
              onClick={visibilityOffHandler}
            />
          )}
        </div>
        <button className={classes["lr-login-button"]}>Sign Up</button>
      </form>
    </div>
  );
};

export default LoginForm;
