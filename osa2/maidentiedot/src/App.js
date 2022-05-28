import { useState, useEffect } from "react";
import axios from "axios";

//This is for showing single country with details
const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState({})
  useEffect(() => {
    const capitalInfo = country.capitalInfo.latlng;
    axios
      .get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${capitalInfo[0]}&lon=${capitalInfo[1]}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setWeatherData(response.data);
        console.log(response);
      });
  });

  console.log(country.languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <br />
      <h2>languages</h2>
      {Object.values(country.languages).map((val) => {
        return <p key={val}>{val}</p>;
      })}
      <img src={country.flags.png} />
      <br/>
      <h2>Weather in {country.capital}</h2>
      Temperature:
      <br/>
      
    </div>
  );
};
//<img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
//ylempänä oleva kuva pitää varmistaa kun apiavain alkaa toimia toivottavasti pian.. Lisää rivlle 34

//This is for showing country-entry in list when there are 2..10 entries
const CountryItem = ({ country, filterPhrase, setFilterPhrase }) => {
  const changeFilterPhrase = () => {
    setFilterPhrase(country.name.common);
  };

  return (
    <div>
      {country.name.common} <button onClick={changeFilterPhrase}>Show</button>
    </div>
  );
};

const CountryList = (props) => {
  //console.log("countrylist");
  const filteredList = props.countries.filter((country) => {
    //console.log(country.name.common);
    return country.name.common
      .toLowerCase()
      .includes(props.filterPhrase.toLowerCase());
  });
  //console.log(filteredList)
  return (
    <div>
      {filteredList.length > 10 && <p>Too many results, spesify!</p>}
      {filteredList.length > 1 &&
        filteredList.length < 10 &&
        filteredList.length <= 10 &&
        filteredList.map((country,ix) => {
          return (
            <CountryItem
              key={ix}
              country={country}
              filterPhrase={props.filterPhrase}
              setFilterPhrase={props.setFilterPhrase}
            />
          );
        })}
      {filteredList.length === 1 && <Country country={filteredList[0]} />}
    </div>
  );
};

const App = () => {
  //console.log(process.env.REACT_APP_API_KEY)
  const [countryData, setCountryData] = useState([]);
  const [filterPhrase, setFilterPhrase] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountryData(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilterPhrase(event.target.value);
  };

  return (
    <div>
      Find countries{" "}
      <input value={filterPhrase} onChange={handleFilterChange} />
      <br />
      <CountryList
        countries={countryData}
        filterPhrase={filterPhrase}
        setFilterPhrase={setFilterPhrase}
      />
    </div>
  );
};

export default App;
