import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import React from 'react'
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import FrontPage from './pages/FrontPage/FrontPage';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';

function App() {
  return (
    <Router>
    <div className='App'>
      <Navbar/>
      <Routes>
          <Route path='/' element={<FrontPage/>}/>
          <Route path='/cosmetics' element={<RecipeDetails/>}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
