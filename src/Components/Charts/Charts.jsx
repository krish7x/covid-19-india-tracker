import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchTimeSeries } from "../../api";

import styles from "./Charts.module.css";

const Charts = () => {
	const [indiaData, setIndiaData] = useState({});

	const fetchAPI = async () => {
		const fetchData = await fetchTimeSeries();

		setIndiaData(fetchData);
	};

	useEffect(() => {
		fetchAPI();
	}, []);

	const lineChart = indiaData[0] ? (
		<Line
			data={{
				labels: indiaData.map(({ date }) => date),
				pointHoverRadius: 5,

				datasets: [
					{
						data: indiaData.map((data) => data.confirmedDaily),
						label: "Infected",
						borderColor: "#3333ff",
						backgroundColor: "rgba(0, 0, 255, 0.6)",
						fill: true,
					},
					{
						data: indiaData.map((data) => data.deathsDaily),
						label: "Deaths",
						borderColor: "red",
						backgroundColor: "rgba(255, 0, 0, 0.6)",
						fill: true,
					},
				],
			}}
		/>
	) : null;

	return <div className={styles.container}>{lineChart}</div>;
};

export default Charts;