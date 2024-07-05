import { useParams } from 'react-router-dom';
import { CardComponent } from './CardComponent';
import Chart from './Chart';
import { Sidenav } from './Sidenav';

const Page = () => {
	const { pageId } = useParams();
	return (
		<div className="flex flex-row h-full">
			<Sidenav />
			<div className="py-6 px-10 gap-4">
				<CardComponent>
					<Chart pageId={pageId} />
				</CardComponent>
			</div>
		</div>
	);
};

export default Page;
