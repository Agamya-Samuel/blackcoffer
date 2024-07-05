import axios from 'axios';
import { Button, ButtonGroup } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';

export function TopNav() {
	const [data, setData] = useState([]);
	const initialRender = useRef(true);

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
			console.log('Fetching data...');
			axios
				.get(`http://127.0.0.1:5000/keys`)
				.then((response) => {
					console.log('Data fetched:', response.data);
					setData(response.data);
				})
				.catch((error) => {
					console.error(
						'There was an error fetching the data!',
						error
					);
				});
		}
	}, []);

	return (
		<div>
			<ButtonGroup className="flex flex-row gap-x-[3px]">
				{data.map((item) => (
					<a href={`/${item}`} key={item}>
						<Button variant="danger">
							{item}
						</Button>
					</a>
				))}
			</ButtonGroup>
		</div>
	);
}
