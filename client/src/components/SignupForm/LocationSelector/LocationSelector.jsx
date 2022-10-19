import { useEffect } from "react";
import classes from "./LocationSelector.module.css";

export const CountrySelector = ({
  country,
  countries,
  onSetCountry,
  onSetCountryObj,
  onSetUser,
  // onEmptyCountries
}) => {
  // const checkLength = () => {
  //   if(countries.length > 0) {
  //     onEmptyCountries(false)
  //   } else {
  //     onEmptyCountries(true)
  //   }
  // }

  return (
    <div
      className={classes["sr-country"]}
    >
      {countries
        .filter((c) => {
          if (c.country.toLowerCase().includes(country.toLowerCase())) {
            // checkLength();
            return c;
          }
        })
        .map((country) => {
          return (
            <span
              key={`${country.iso2}${country.iso3}${Math.random()}`}
              className={classes["sr-country-name"]}
              onMouseDown={() => {
                onSetCountryObj(country);
                onSetCountry(country.country);
                onSetUser((prevState) => {
                  return {
                    ...prevState,
                    country: country.country,
                  };
                });
              }}
            >
              {country.country}
            </span>
          );
        })}
    </div>
  );
};

export const CitySelector = ({ city, country, onSetCity, onSetUser }) => {
  return (
    <div className={classes["sr-country"]}>
      {country.cities
        .filter((c) => {
          if (c.toLowerCase().includes(city.toLowerCase())) {
            return c;
          }
        })
        .map((city) => {
          return (
            <span
              key={`${country.iso2}${country.iso3}${Math.random()}`}
              className={classes["sr-country-name"]}
              onMouseDown={() => {
                onSetCity(city);
                onSetUser((prevState) => {
                  return {
                    ...prevState,
                    city: city,
                  };
                });
              }}
            >
              {city}
            </span>
          );
        })}
    </div>
  );
};
