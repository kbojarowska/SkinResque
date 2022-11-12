import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import React from 'react'
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import FrontPage from './pages/FrontPage/FrontPage';
import CosmeticsCatalogue from './pages/CosmeticsCatalogue/CosmeticsCatalogue';

function App() {
	return (
		<Router>
			<div className='App'>
				<Navbar />
				<Routes>
					<Route path='/' element={<FrontPage />} />
					<Route path='/cosmetics' element={<CosmeticsCatalogue/>} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
