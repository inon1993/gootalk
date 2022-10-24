import classes from "./SignupForm.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState, useRef } from "react";
import getLocations from "../../helpers/countries-api/getLocations";
import {
  CountrySelector,
  CitySelector,
} from "./LocationSelector/LocationSelector";
import { createSettings, signup } from "../../api/auth/authRoutes";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { accessTokenActions } from "../../store/access-token-slice";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { getPictureUrl } from "../../api/uploadImg/uploadImg";
import { settingsActions } from "../../store/settings-slice";

const SignupForm = ({ profilePicture }) => {
  const firstnameRef = useRef();
  const [previewSource, setPreviewSource] = useState({ type: "", file: "" });
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
  const [errorMsg, setErrorMsg] = useState({ code: null, msg: "" });

  const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordValidator =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/;

  useEffect(() => {
    firstnameRef.current.focus();
  }, []);

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
    setErrorMsg({ code: null, msg: "" });
    try {
      const imgUrl = await getPictureUrl(
        profilePicture.file
          ? profilePicture
          : previewSource.file && previewSource,
        "profile-picture"
      );
      const newUser = await signup(user, imgUrl);
      const accessToken = newUser.data.accessToken;
      const userData = newUser.data.data;
      const newUserToSet = {
        userId: userData._id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email.toLowerCase(),
        country: userData.country,
        city: userData.city,
        profilePicture: imgUrl || userData.profilePicture,
      };
      await createSettings({ userId: userData._id, theme: "light" });
      dispatch(userActions.setUser(newUserToSet));
      dispatch(userActions.setFriends({ friends: [] }));
      dispatch(userActions.setNotifications({ notifications: [] }));
      dispatch(accessTokenActions.setAccessToken(accessToken));
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 409) {
        setErrorMsg({
          code: 409,
          msg: "E-Mail address is already registered.",
        });
      } else {
        setErrorMsg({
          code: 500,
          msg: "Something went wrong. Please try again.",
        });
      }
      throw new Error(error);
    }
  };

  const setUserHandler = (e) => {
    if (e.target.name === "email") {
      setErrorMsg({ code: null, msg: "" });
    }
    setUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (user.firstname.trim().length !== 0) {
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
      user.email.trim().length < 5 || !emailValidator.test(user.email)
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
      !passwordValidator.test(user.password)
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
        <div className={classes["profile-picture-mobile"]}>
          <ProfilePicture
            onId="file-input-mobile"
            preview={previewSource}
            onPreview={setPreviewSource}
            page="signup"
          />
        </div>
        <h2 className={classes["sr-title"]}>Sign Up</h2>
      </div>
      <form
        className={classes["sr-form"]}
        onSubmit={signupHandler}
        autoComplete="new-password"
      >
        <input type="hidden" value="something" />
        <div className={classes["sr-field-text"]}>
          <span className={classes["sr-form-text"]}>First name</span>
          {isValid.firstname === false && (
            <span className={classes["sr-err-instructions"]}>
              (At least 2 characters.)
            </span>
          )}
        </div>

        <input
          className={`${classes["sr-input"]} ${
            isValid.firstname === false && classes["sr-invalid-input"]
          }`}
          name="firstname"
          type="text"
          onChange={setUserHandler}
          autoComplete="new-off"
          required
          ref={firstnameRef}
          minLength={2}
          maxLength={20}
        />
        <div className={classes["sr-field-text"]}>
          <span className={classes["sr-form-text"]}>Last name</span>
          {isValid.lastname === false && (
            <span className={classes["sr-err-instructions"]}>
              (At least 2 characters.)
            </span>
          )}
        </div>
        <input
          className={`${classes["sr-input"]} ${
            isValid.lastname === false && classes["sr-invalid-input"]
          }`}
          name="lastname"
          type="text"
          onChange={setUserHandler}
          autoComplete="none"
          required
          minLength={2}
          maxLength={20}
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
            onBlur={() => setCountryFocus(false)}
            autoComplete="none"
            maxLength={20}
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
            onFocus={() => setCityFocus(true)}
            onBlur={() => setCityFocus(false)}
            autoComplete="none"
            disabled={country === "" ? true : false}
            maxLength={20}
          />
          {cityFocus && countryObj && (
            /*city !== "" &&*/ <CitySelector
              city={city || user.city}
              country={countryObj}
              onSetCity={setCity}
              onSetUser={setUser}
            />
          )}
        </div>
        <div className={classes["sr-field-text"]}>
          <span className={classes["sr-form-text"]}>E-Mail</span>
          {isValid.email === false && (
            <span className={classes["sr-err-instructions"]}>
              (A valid E-Mail address is required.)
            </span>
          )}
        </div>
        <input
          className={`${classes["sr-input"]} ${
            isValid.email === false && classes["sr-invalid-input"]
          }`}
          name="email"
          type="email"
          onChange={setUserHandler}
          autoComplete="none"
          required
          maxLength={50}
        />
        {errorMsg.code === 409 && (
          <span className={classes["sr-err"]}>{errorMsg.msg}</span>
        )}
        <div className={classes["sr-field-text"]}>
          <span className={classes["sr-form-text"]}>Password</span>
          {isValid.password === false && (
            <span
              className={`${classes["sr-err-instructions"]} ${classes["sr-err-password"]}`}
            >
              (Min. 1 upper and lower case letters, 1 number and special
              characters. Min. 8 characters.)
            </span>
          )}
        </div>
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
            minLength={8}
            maxLength={50}
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
        {errorMsg.code === 500 && (
          <span className={classes["sr-err"]}>{errorMsg.msg}</span>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
