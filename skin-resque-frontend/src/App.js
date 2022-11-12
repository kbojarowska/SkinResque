import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import React from 'react'
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import FrontPage from './pages/FrontPage/FrontPage';
import Pagination from './components/Pagination/Pagination';

function App() {
  return (
    <Router>
    <div className='App'>
      <Navbar/>
      <Routes>
          <Route path='/' element={<FrontPage/>}/>
        </Routes>
		<Pagination size={15} color='gray'/>
    </div>
    </Router>
  );
}

export default App;
