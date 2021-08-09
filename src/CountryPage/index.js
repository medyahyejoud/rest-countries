import { useState, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function CountryPage({ match, countriesData, dataLoading }) {
  const {
    params: { countryCode },
  } = match;

  let language = [];
  let currency = [];
  let domain = [];
  let filterBorders;

  console.log("Here", countriesData);

  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [countryCode]);

  if (!loading && !dataLoading) {
    for (let i = 0; i < country.languages.length; i++) {
      language.push(country.languages[i].name);
    }
    for (let i = 0; i < country.currencies.length; i++) {
      currency.push(country.currencies[i].name);
    }
    for (let i = 0; i < country.topLevelDomain.length; i++) {
      domain.push(country.topLevelDomain[i].name);
    }
    filterBorders = country.borders.map((element) => {
      return countriesData.find((c) => {
        return c.alpha3Code === element;
      });
    });
  }

  return (
    <div className="country-page">
      <div className="wrapper">
        <div className="country-page-wrapper">
          <div className="search-form-wrapper">
            <Link to="/">
              <button className="btn back-btn">
                <BsArrowLeft size={25} />
                Back
              </button>
            </Link>
          </div>
          {!dataLoading && !loading ? (
            <div className="country-content">
              <div className="country-image">
                <img src={country.flag} alt={`${country.name} Flag`} />
              </div>
              <div className="country-description">
                <h1 className="country-description__title">{country.name}</h1>
                <div className="country-description__left">
                  <p>
                    <b>Native Name: </b>
                    {country.nativeName}
                  </p>
                  <p>
                    <b>Population: </b>
                    {new Intl.NumberFormat().format(country.population)}
                  </p>
                  <p>
                    <b>Region: </b>
                    {country.region}
                  </p>
                  <p>
                    <b>Sub Region: </b>
                    {country.subregion}
                  </p>
                  <p>
                    <b>Capital: </b>
                    {country.capital}
                  </p>
                </div>
                <div className="country-description__right">
                  <p>
                    <b>Top Level Domain: </b>
                    {country.topLevelDomain.join(", ")}
                  </p>
                  <p>
                    <b>Currencies: </b>
                    {currency.join(", ")}
                  </p>
                  <p>
                    <b>Languges: </b>
                    {language.join(", ")}
                  </p>
                </div>

                <div className="country-description__last">
                  <p>
                    <b>Border Countries:</b>
                  </p>
                  <div className="country-description__borders">
                    {filterBorders.map((border, index) => {
                      return (
                        <Link
                          key={border.alpha3Code}
                          to={`/country/${border.alpha3Code}`}
                        >
                          <button className="btn borders-btn">
                            {border.name}
                          </button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
}
