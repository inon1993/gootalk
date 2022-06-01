import classes from "./LocationSelector.module.css";

export const CountrySelector = ({ country, countries, onSetCountry, onSetCountryObj }) => {
  return (
    <div className={classes["sr-country"]}>
      {countries.filter((c) => {
        if(c.country.toLowerCase().includes(country)) {
          return c
        }
      })
      .map((country) => {
        return (
          <span
            key={`${country.iso2}${country.iso3}${Math.random()}`}
            className={classes["sr-country-name"]}
            onClick={() => {
              onSetCountryObj(country);
              onSetCountry(country.country);
            }}
          >
            {country.country}
          </span>
        );
      })}
    </div>
  );
};

export const CitySelector = ({ city, country, onSetCity }) => {
    return (
      <div className={classes["sr-country"]}>
        {country.cities.filter((c) => {
          if(c.toLowerCase().includes(city)) {
            return c
          }
        })
        .map((city) => {
          return (
            <span
              key={`${country.iso2}${country.iso3}${Math.random()}`}
              className={classes["sr-country-name"]}
              onClick={() => {
                onSetCity(city);
              }}
            >
              {city}
            </span>
          )
        })
        }
        {/* {country.cities.map((city) => {
          return (
            <span
              key={`${country.iso2}${country.iso3}${Math.random()}`}
              className={classes["sr-country-name"]}
              onClick={() => {
                onSetCity(city);
              }}
            >
              {city}
            </span>
          );
        })} */}
      </div>
    );
  };

// export default CountrySelector;