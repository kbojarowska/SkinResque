import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import axios from 'axios';
import './App.scss';
import Navbar from './ui/components/Navbar/Navbar';
import FrontPage from './ui/pages/FrontPage/FrontPage';
import CosmeticsCatalogue from './ui/pages/Cosmetics/CosmeticsCatalogue/CosmeticsCatalogue';
import RecipeDetails from './ui/pages/Cosmetics/RecipeDetails/RecipeDetails'
import SkintypeTestPage from './ui/pages/SkintypeTest/SkintypeTestPage/SkintypeTestPage'
import Userpage from './ui/pages/Userpage/View/Userpage';
import Info from './ui/pages/ColorPalette/Info';
import Test from './ui/pages/ColorPalette/Test/Test';
import CollorPalletResults from './ui/pages/ColorPalette/Result/Result';
import LoginRegister from './ui/pages/LoginRegister/LoginRegister';
import SkintypeResult from './ui/pages/SkintypeTest/Result/Result';
import UserEdit from './ui/pages/Userpage/Edit/UserEdit';


function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const id = Cookies.get('userId');
		setUser(id);
	}, []);

	return (
		<Router>
			<div className='App'>
				<Navbar user={user} setUser={setUser}/>
				<Routes>
					<Route path='/' element={<FrontPage />} />
					<Route path='/cosmetics/page/:currentPage' element={<CosmeticsCatalogue/>} />
					<Route path='/cosmetics/:cosmeticId' element={<RecipeDetails/>}/>
					<Route path='/skintype-test' element={<SkintypeTestPage/>}/>
					<Route path='/skintype-test/results/:skintype' element={<SkintypeResult/>}/>
					<Route path='/color-test/results' element={<CollorPalletResults/>}/>
					<Route path='/userprofile/:userId' element={<Userpage/>}/>
					<Route path='/editprofile/:userId' element={<UserEdit setCurrentUser={setUser}/>}/>
					<Route path='/color-test/info' element={<Info/>}/>
					<Route path='/color-test/test' element={<Test/>}/>
					<Route path='/login' element={<LoginRegister isLogin={true} setUser={setUser}/>}/>
					<Route path='/register' element={<LoginRegister isLogin={false}/>}/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
