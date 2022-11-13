import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import React from 'react'
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import FrontPage from './pages/FrontPage/FrontPage';

function App() {
  return (
    <Router>
    <div className='App'>
      <Navbar/>
      <Routes>
          <Route path='/' element={<FrontPage/>}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
