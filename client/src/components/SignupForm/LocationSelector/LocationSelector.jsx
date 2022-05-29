import classes from "./LocationSelector.module.css";

export const CountrySelector = ({ countries, onSetCountry, onSetCountryObj }) => {
  return (
    <div className={classes["sr-country"]}>
      {countries.map((country) => {
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

export const CitySelector = ({ country, onSetCity }) => {
    return (
      <div className={classes["sr-country"]}>
        {country.cities.map((city) => {
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
        })}
      </div>
    );
  };

// export default CountrySelector;
