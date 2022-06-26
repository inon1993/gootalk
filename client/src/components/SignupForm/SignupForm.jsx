import classes from "./SignupForm.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import getLocations from "../../helpers/countries-api/getLocations";
import {
  CountrySelector,
  CitySelector,
} from "./LocationSelector/LocationSelector";
import { signup, uploadImage } from "../../api/auth/authRoutes";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { accessTokenActions } from "../../store/access-token-slice";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const LoginForm = ({ profilePicture }) => {
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
    country: "",
    city: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState({
    firstname: null,
    lastname: true,
    email: true,
    password: true,
  });

  useEffect(() => {
    const getCountriesList = async () => {
      const countriesList = await getLocations();
      setCountries(countriesList);
    };

    getCountriesList();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countryHandler = (e) => {
    setCountry(e.target.value);
    setUser((prevState) => {
      return {
        ...prevState,
        country: e.target.value,
      };
    });
    setCountryObj(null);
  };

  const visibilityHandler = () => {
    setIsPw({ visable: true, type: "text" });
  };

  const visibilityOffHandler = () => {
    setIsPw({ visable: false, type: "password" });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    if (
      !isValid.firstname ||
      !isValid.lastname ||
      !isValid.email ||
      !isValid.password
    )
      return;
    setIsLoading(true);
    try {
      const imgUrl = await profilePictureUrl(profilePicture);
      const newUser = await signup(user, imgUrl);
      const accessToken = newUser.data.accessToken;
      const userData = newUser.data.user;
      console.log(userData);
      const newUserToSet = {
        userId: userData._id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        country: userData.country,
        city: userData.city,
        profilePicture: imgUrl?.data?.url || userData.profilePicture,
      };
      dispatch(userActions.setUser(newUserToSet));
      dispatch(accessTokenActions.setAccessToken(accessToken));
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };

  const profilePictureUrl = async (profilePicture) => {
    if (profilePicture) {
      const imgUrl = await uploadImage(profilePicture);
      return imgUrl;
    } else {
      return null;
    }
  };

  const setUserHandler = (e) => {
    setUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (user.firstname.trim().length !== 0) {
      console.log(user.firstname);
      user.firstname.trim().length < 2
        ? setIsValid((prev) => {
            return {
              ...prev,
              firstname: false,
            };
          })
        : setIsValid((prev) => {
            return {
              ...prev,
              firstname: true,
            };
          });

      console.log(111);
    }

    if (user.lastname.trim().length !== 0) {
      user.lastname.trim().length < 2
        ? setIsValid((prev) => {
            return {
              ...prev,
              lastname: false,
            };
          })
        : setIsValid((prev) => {
            return {
              ...prev,
              lastname: true,
            };
          });
    }

    if (user.email.trim().length !== 0) {
      user.email.trim().length < 5 ||
      !user.email.includes("@") ||
      !user.email.includes(".")
        ? setIsValid((prev) => {
            return {
              ...prev,
              email: false,
            };
          })
        : setIsValid((prev) => {
            return {
              ...prev,
              email: true,
            };
          });
    }

    if (user.password.trim().length !== 0) {
      user.password.trim().length < 6
        ? setIsValid((prev) => {
            return {
              ...prev,
              password: false,
            };
          })
        : setIsValid((prev) => {
            return {
              ...prev,
              password: true,
            };
          });
    }
  }, [user]);

  return (
    <div className={classes["sr-card"]}>
      <div className={classes["sr-title-wrapper"]}>
        <h2 className={classes["sr-title"]}>Sign Up</h2>
      </div>
      <form className={classes["sr-form"]} onSubmit={signupHandler}>
        <input
          autoComplete="new-off"
          style={{ display: "none" }}
          id="fake-hidden-input-to-stop-google-address-lookup"
        />
        <span className={classes["sr-form-text"]}>First name</span>
        <input
          className={`${classes["sr-input"]} ${
            isValid.firstname === false && classes["sr-invalid-input"]
          }`}
          name="firstname"
          type="text"
          onChange={setUserHandler}
          autoComplete="new-off"
          required
        />
        <span className={classes["sr-form-text"]}>Last name</span>
        <input
          className={`${classes["sr-input"]} ${
            isValid.lastname === false && classes["sr-invalid-input"]
          }`}
          name="lastname"
          type="text"
          onChange={setUserHandler}
          autoComplete="none"
          required
        />
        <span className={classes["sr-form-text"]}>Country</span>
        <div className={classes["sr-country-wrapper"]}>
          <input
            className={`${classes["sr-input"]} ${classes["sr-input-country"]}`}
            name="country"
            type="text"
            value={country || user.country}
            onChange={countryHandler}
            onFocus={() => {
              setCountryFocus(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setCountryFocus(false);
              }, 200);
            }}
            autoComplete="none"
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
            value={city || user.city}
            onChange={(e) => {
              setCity(e.target.value);
              setUser((prevState) => {
                return {
                  ...prevState,
                  city: e.target.value,
                };
              });
            }}
            onFocus={() => {
              setCityFocus(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setCityFocus(false);
              }, 200);
            }}
            autoComplete="none"
            disabled={country === "" ? true : false}
          />
          {cityFocus && countryObj && (
            <CitySelector
              city={city || user.city}
              country={countryObj}
              onSetCity={setCity}
              onSetUser={setUser}
            />
          )}
        </div>
        <span className={classes["sr-form-text"]}>E-Mail</span>
        <input
          className={`${classes["sr-input"]} ${
            isValid.email === false && classes["sr-invalid-input"]
          }`}
          name="email"
          type="email"
          onChange={setUserHandler}
          autoComplete="none"
          required
        />
        <span className={classes["sr-form-text"]}>Password</span>
        <div
          className={`${classes["sr-input"]} ${
            isValid.password === false && classes["sr-invalid-input"]
          }`}
        >
          <input
            className={classes["sr-input-password"]}
            name="password"
            type={isPw.type}
            onChange={setUserHandler}
            required
          />
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
        <div className={classes["sr-buttons"]}>
          <button className={classes["sr-signup-button"]} type="submit">
            {isLoading ? (
              <CircularProgress style={{ color: "white" }} size="20px" />
            ) : (
              "Sign Up"
            )}
          </button>
          <button
            className={classes["sr-cancel-button"]}
            type="button"
            onClick={() => navigate("/login")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
