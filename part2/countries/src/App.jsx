import { useState, useEffect } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!country.capital?.[0]) return;

    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: country.capital[0],
          appid: apiKey,
          units: "metric",
        },
      })
      .then((response) => setWeather(response.data))
      .catch((error) => console.log(error.response?.data || error.message));
  }, [country]);

  return (
    <div>
      <h3>{country.name.official}</h3>
      <div>Capital: {country.capital?.join(" ")}</div>
      <div>Area: {country.area}</div>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages || {}).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt || "Country flag"} />
      <h3>Weather in {country.capital}</h3>
      {weather && (
        <div>
          <div>Temperature: {weather.main.temp} °C</div>
          <div>{weather.weather[0].description}</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searched, setSearched] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error));
  }, []);

  const findCountries = (event) => {
    const value = event.target.value.toLowerCase();

    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value),
    );

    setSearched(results);
    setSelectedCountry(null);
  };

  const showCountry = (id) => {
    const country = countries.find((c) => c.cca3 === id);
    setSelectedCountry(country);
  };

  return (
    <div>
      Find countries: <input onChange={findCountries} type="text" />
      <div>
        <h3>Countries</h3>

        {selectedCountry ? (
          <>
            <Country country={selectedCountry} />
          </>
        ) : searched.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : searched.length === 1 ? (
          <Country country={searched[0]} />
        ) : (
          searched.map((country) => (
            <p key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => showCountry(country.cca3)}>show</button>
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
