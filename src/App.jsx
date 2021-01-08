import React, { useState, useEffect } from "react";
import "./App.scss";
import { fetchData, fetchDailyData, fetchCountries } from "@/api";
import Cards from "@/components/Cards/Cards";
import Chart from "@/components/Chart/Chart";

const App = () => {
	const [data, setData] = useState(null);
	const [dailyData, setDailyData] = useState(null);
	const [countries, setCountries] = useState(null);
	const [country, setCountry] = useState(null);

	useEffect(() => {
		const fetchAllData = async () => {
			try {
				setData(await fetchData(country));
				setDailyData(await fetchDailyData());
				setCountries(await fetchCountries());
			} catch {
				setTimeout(fetchAllData, 1000);
			}
		};

		fetchAllData();
	}, [country]);

	return (
		<div className="App">
			<img src="/assets/logo.png" alt="" className="logo" />
			{data && dailyData && countries
				? <>
					<Cards data={data} />
					<select className="country" onChange={({ target: { value } }) => setCountry(value.toLowerCase() === "global" ? null : value.toLowerCase())}>
						<option value="global">Global</option>
						{countries.map(country => <option value={country} key={country}>{country}</option> )}
					</select>
					<Chart dailyData={dailyData} data={data} country={country} />
				</>
				: <div className="loading">
					<img src="/assets/loading.gif" alt="" />
			 </div>
			}
		</div>
	);
};

export default App;
