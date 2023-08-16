import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import FlightOffers from './pages/FlightOffers'
import Register from './pages/Register'
import Login from './pages/Login'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Accommodation from './pages/Accommodation'
import Weather from './pages/Weather'
import Itineraries from './pages/Itineraries'
import Sidebar from './components/sideBar'
import { useSelector } from 'react-redux'

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className='container'>
        {!user && < Header />}
        <div className='content'>
          {user && <Sidebar />} {/* Render the Sidebar only when the user is logged in */}
          <Routes>
            <Route path='/' element={<Dashboard />} />
            {user && <Route path='/flights' element={<FlightOffers />} />}
            <Route path='/accommodation' element={<Accommodation />} />
            <Route path='/itineraries' element={<Itineraries />} />
            <Route path='/weather' element={<Weather />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
