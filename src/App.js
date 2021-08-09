import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import "./Sass/base.scss";
import Dropdown from "./components/Dropdown";
import Search from "./components/Search";
import Country from "./components/Country";
import CountryPage from "./CountryPage";

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [filtredList, setFiltredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = localStorage.getItem("theme");

  useEffect(() => {
    if (theme === "dark-mode") {
      document.body.classList.add(theme);
      setIsDarkMode(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(query);

  const regionFilter = (region) => {
    if (region === "All") {
      setFiltredList(countriesData);
      return;
    }

    const filtredData = countriesData.filter((item) => item.region === region);
    console.log("Filtred", filtredData);
    setFiltredList(filtredData);
  };

  const filtredCountries = filtredList.filter((item) => {
    return (
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.nativeName.toLowerCase().includes(query.toLowerCase()) ||
      item.capital.toLowerCase().includes(query.toLowerCase()) ||
      item.region.toLowerCase().includes(query.toLowerCase())
    );
  });

  const fetchCountries = async () => {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const data = await res.json();
    setCountriesData(data);
    setFiltredList(data);
    setLoading(false);
  };

  const onThemeToggle = () => {
    const mode = document.body.classList.toggle("dark-mode");
    setIsDarkMode(!isDarkMode);
    if (mode) {
      localStorage.setItem("theme", "dark-mode");
      return;
    }
    localStorage.setItem("theme", "");
  };

  useEffect(() => {
    fetchCountries().catch((err) => console.log(err));
  }, []);

  console.log(countriesData);
  console.log(loading);

  return (
    <Router>
      <Header onThemeToggle={onThemeToggle} isDarkMode={isDarkMode} />
      <Route
        exact
        path="/"
        render={(props) => (
          <>
            <div className="search">
              <div className="search-wrapper">
                <Search query={query} setQuery={setQuery} />
                <Dropdown regionFilter={regionFilter} regions={regions} />
              </div>
            </div>
            <div className="country-list">
              {loading ? (
                <h2>Loading ...</h2>
              ) : (
                filtredCountries.map((country) => {
                  return (
                    <Link
                      key={country.alpha2Code}
                      to={`/country/${country.alpha3Code}`}
                    >
                      <Country
                        code={country.alpha3Code}
                        flag={country.flag}
                        name={country.name}
                        population={country.population}
                        region={country.region}
                        capital={country.capital}
                      />
                    </Link>
                  );
                })
              )}
            </div>
          </>
        )}
      />
      <Route
        path="/country/:countryCode"
        render={(props) => (
          <CountryPage
            {...props}
            countriesData={countriesData}
            dataLoading={loading}
          />
        )}
      />
    </Router>
  );
}

export default App;
