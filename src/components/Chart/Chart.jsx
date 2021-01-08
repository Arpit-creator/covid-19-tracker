import React from "react";
import "./Chart.scss";
import { Line, Bar } from "react-chartjs-2";

const Chart = ({ dailyData, data: { confirmed, recovered, deaths }, country }) => {
	const lineChart = (
		<Line data={{
			labels: dailyData.map(({ date }) => date),
			datasets: [
				{
					data: dailyData.map(({ confirmed }) => confirmed),
					label: "Infected",
					borderColor: "#8E44AD",
					fill: true
				},
				{
					data: dailyData.map(({ deaths }) => deaths),
					label: "Deaths",
					borderColor: "#E74C3C",
					fill: true
				}
			]
		}} />
	);

	const barChart = (
		<Bar data={{
			labels: ["Infected", "Recovered", "Deaths"],
			datasets: [
				{
					label: "People",
					backgroundColor: [
						"#8E44AD",
						"#52BE80",
						"#E74C3C"
					],
					data: [confirmed, recovered, deaths]
				}
			]
		}} options={{
			legend: { display: false },
			title: { display: true, text: `Current state in ${country}` }
		}} />
	);

	return (
		<div className="Chart">
			{country ? barChart : lineChart}
		</div>
	);
};

export default Chart;
