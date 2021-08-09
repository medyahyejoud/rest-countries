import React from 'react';

export default function Country(props) {
  const { flag, name, population, region, capital } = props;

  return (
    <div className="country-card">
      <div className="card-header">
        {/* <Link to="/"> */}
        <img src={flag} alt={`${name} Flag`} title={`${name} Flag`} />
        {/* </Link> */}
      </div>
      <div className="card-body">
        <h2>{name}</h2>
        <p>
          <b>Population: </b>
          {new Intl.NumberFormat().format(population)}
        </p>
        <p>
          <b>Region: </b>
          {region}
        </p>
        <p>
          <b>Capital: </b>
          {capital}
        </p>
      </div>
    </div>
  );
}
