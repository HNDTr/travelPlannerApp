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
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className='content'>
        {!user && < Header />}
        <div className='content'>
            {user && <Sidebar />} {/* Render the Sidebar only when the user is logged in */}
            <Routes>
              <Route path='/' element={<Login/>} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/flights' element={<FlightOffers />} />
              <Route path='/accommodation' element={<Accommodation />} />
              <Route path='/itineraries' element={<Itineraries />} />
              <Route path='/weather' element={<Weather />} />
              <Route path='/register' element={<Register />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
