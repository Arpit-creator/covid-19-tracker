import axios from "axios";

export const fetchData = async (country) => {
	try {
		let fetchUrl = COVID_19_API;

		if (country) {
			fetchUrl = `${COVID_19_API}/countries/${country}`;
		}

		const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(fetchUrl);

		return {
			confirmed: confirmed.value,
			recovered: recovered.value,
			deaths: deaths.value,
			lastUpdate: lastUpdate
		}
	} catch (err) { }
};

export const fetchDailyData = async () => {
	try {
		const { data } = await axios.get(`${COVID_19_API}/daily`);

		return data.map(dailyData => ({
			confirmed: dailyData.confirmed.total,
			deaths: dailyData.deaths.total,
			date: dailyData.reportDate
		}));
	} catch (err) { }
};

export const fetchCountries = async () => {
	try {
		const { data: { countries } } = await axios.get(`${COVID_19_API}/countries`);

		return countries.map(({ name }) => name);
	} catch (err) { }
};
