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
import RecipeDetails from './pages/RecipeDetails/RecipeDetails'
import Results from './pages/SkintypeTest/Results/Results';

function App() {
	return (
		<Router>
			<div className='App'>
				<Navbar />
				<Routes>
					<Route path='/' element={<FrontPage />} />
					<Route path='/cosmetics/page/:currentPage' element={<CosmeticsCatalogue/>} />
					<Route path='/cosmetics/:cosmeticId' element={<RecipeDetails/>}/>
					<Route path='/result' element={<Results/>}/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
