// src/Chart.jsx

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const Chart = ({ pageId }) => {
	const [, setData] = useState([]);
	const initialRender = useRef(true);

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
			console.log('Fetching data...');
			axios
				.get(`http://127.0.0.1:5000/stats?key=${pageId}`)
				.then((response) => {
					console.log('Data fetched:', response.data);
					setData(response.data);
					drawChart(response.data);
				})
				.catch((error) => {
					console.error(
						'There was an error fetching the data!',
						error
					);
				});
		}
	}, []);

	const drawChart = (data) => {
		const width = 1150;
		const height = 400;
		const margin = { top: 20, right: 30, bottom: 40, left: 40 };

		const svg = d3
			.select('#chart')
			.append('svg')
			.attr('width', width)
			.attr('height', height);

		const x = d3
			.scaleBand()
			.domain(data.map((d) => d.name))
			.range([margin.left, width - margin.right])
			.padding(0.5);

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.count)])
			.nice()
			.range([height - margin.bottom, margin.top]);

		svg.append('g')
			.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('x', (d) => x(d.name))
			.attr('y', (d) => y(d.count))
			.attr('height', (d) => y(0) - y(d.count))
			.attr('width', x.bandwidth())
			.attr('fill', 'steelblue');

		svg.append('g')
			.attr('transform', `translate(0,${height - margin.bottom})`)
			.call(d3.axisBottom(x).tickSizeOuter(0));

		svg.append('g')
			.attr('transform', `translate(${margin.left},0)`)
			.call(d3.axisLeft(y));
	};

	return (
		<div className="App">
			<h1>{pageId} Visualization</h1>
			<div id="chart">
				<div id="tooltip">
					<div className="tooltip-label">
						<span id="tooltip-label"></span>
					</div>
					<div className="tooltip-value">
						<span id="count"></span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chart;
