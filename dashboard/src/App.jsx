import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TopNav } from './TopNav';
import Page from './Page';

function App() {
	return (
		<Router>
			<TopNav />
			<Routes>
				<Route path={'/:pageId'} element={<Page />} />
			</Routes>
		</Router>
	);
}

export default App;
