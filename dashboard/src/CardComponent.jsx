'use client';

import { Card } from 'flowbite-react';
import PropTypes from 'prop-types';

export function CardComponent({children}) {
  // Add 'children' to props validation
  CardComponent.propTypes = {
	children: PropTypes.node.isRequired
  };
	return (
		<Card className="max-w-full">
			{/* <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Noteworthy technology acquisitions 2021
			</h5>
			<p className="font-normal text-gray-700 dark:text-gray-400">
				Here are the biggest enterprise technology acquisitions of 2021
				so far, in reverse chronological order.
			</p> */}
			{children}
		</Card>
	);
}
