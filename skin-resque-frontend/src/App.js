import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import FrontPage from './pages/FrontPage/FrontPage';
import CosmeticsCatalogue from './pages/Cosmetics/CosmeticsCatalogue/CosmeticsCatalogue';
import RecipeDetails from './pages/Cosmetics/RecipeDetails/RecipeDetails'
import SkintypeTestPage from './pages/SkintypeTest/SkintypeTestPage/SkintypeTestPage'
import Userpage from './pages/Userpage/Userpage';
import Info from './pages/ColorPalette/Info';
import Test from './pages/ColorPalette/Test/Test';
import CollorPalletResults from './pages/ColorPalette/Result/Result';
import LoginRegister from './pages/LoginRegister/LoginRegister';


function App() {
	const [users, setUsers] = useState([
		{
			username: 'dpionk',
			password: 'password',
			email: 'dpionk@domain.com'
		},
		{
			username: 'kbojarowska',
			password: 'password',
			email: 'kbojarowska@domain.com'
		},
		{
			username: 'bwujec',
			password: 'password',
			email: 'bwujec@domain.com'
		}
	]);

	console.log(users);
	const [user, setUser] = useState({});

	return (
		<Router>
			<div className='App'>
				<Navbar />
				<Routes>
					<Route path='/' element={<FrontPage />} />
					<Route path='/cosmetics/page/:currentPage' element={<CosmeticsCatalogue />} />
					<Route path='/cosmetics/:cosmeticId' element={<RecipeDetails />} />
					<Route path='/skintype-test' element={<SkintypeTestPage />} />
					<Route path='/skintype-test/question/:questionNumber' element={<SkintypeTestPage />} />
					<Route path='/color-test' element={<Test />} />
					<Route path='/color-test/results' element={<CollorPalletResults />} />
					<Route path='/userprofile' element={<Userpage />} />
					<Route path='/color-test' element={<Info />} />
					<Route path='/color-test/try' element={<Test />} />
					<Route path='/login' element={<LoginRegister isLogin={true} setUser={setUser} users={users} />} />
					<Route path='/register' element={<LoginRegister isLogin={false} setUsers={setUsers} />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
