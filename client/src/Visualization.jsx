import React, { useEffect, useState } from 'react'
import { LineChart, AreaChart } from 'react-chartkick'
import 'chart.js'
import axios from 'axios'


export default function Visualization(props) {
	const [data, setData] = useState({})

	useEffect(() => {
		const endpoint = `https://covidtracking.com/api/v1/states/${props.state}/daily.json`
		axios.get(endpoint)
			.then(res => {
				const totalCases = {name: "Total cases", data: {}}
				const newCases = {name: "New cases", data: {}}
				res.data.slice(0, props.days).forEach(e => {
					totalCases.data[e.date] = e.positive
					newCases.data[e.date] = e.positiveIncrease
				});
				setData([totalCases, newCases])
				console.log(data)
			})
			.catch(err => {
				console.log(err)
				alert("Invalid inputs")
			});
	});

	return (
		<div>
			<AreaChart data={data} xtitle="Date" ytitle="Population" min={0} title={"Past " + props.days + " days for " + props.state}/>
		</div>
	);
}