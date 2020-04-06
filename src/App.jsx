import React, { useState, useEffect } from 'react';
import './App.scss';
import { fetchData, fetchDailyData, fetchCountries } from 'api';
import LoadingGif from 'images/loading.gif';
import Logo from 'images/logo.png';
import Cards from 'components/Cards/Cards';
import Chart from 'components/Chart/Chart';

const App = () => {
  const [data, setData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetchData(country).then(data => {
      setData(data);
    });
    fetchDailyData().then(data => {
      setDailyData(data);
    });
    fetchCountries().then(countries => {
      setCountries(countries);
    });
  }, [country]);

  return (
    <div className="App">
      <img src={Logo} alt="" className="logo" />
      {data && dailyData && countries
        ? <>
          <Cards data={data} />
          <select className="country" onChange={({ target: { value } }) => setCountry(value.toLowerCase() === 'global' ? null : value.toLowerCase())}>
            <option value="global">Global</option>
            {countries.map(country => <option value={country} key={country}>{country}</option> )}
          </select>
          <Chart dailyData={dailyData} data={data} country={country} />
        </>
        : <div className="loading">
          <img src={LoadingGif} alt="" />
       </div>
      }
    </div>
  );
};

export default App;
