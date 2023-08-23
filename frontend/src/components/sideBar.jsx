import {FaSignOutAlt, FaBookmark} from 'react-icons/fa'
import { logout, reset } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import {TiWeatherCloudy} from 'react-icons/ti'
import {MdFlightTakeoff, MdLocalHotel, MdDashboard} from 'react-icons/md'
import {SiYourtraveldottv} from 'react-icons/si'

function Sidebar() {
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
    }

  return (
    <div className='sidebar'>
      <div className='logo'>
        <div className='logo-item'>
            <div className='sideBar-mainLogo'>
                <SiYourtraveldottv></SiYourtraveldottv>
            </div>
            <div className='logo-title'>
                <h1>Orbit</h1>
            </div>
        </div>
      </div>
      <ul className='nav-links'>
        <li className='nav-item'>
            <div className='side-bar-logo'>
                <MdDashboard></MdDashboard>
            </div>
            <div>
                <Link to='/dashboard' className='link-item'>
                    Dashboard
                </Link>
            </div>
        </li>
        <li className='nav-item'>
            <div className='side-bar-logo'>
                <MdFlightTakeoff></MdFlightTakeoff>
            </div>
            <div>
                <Link to='/flights' className='link-item'>
                    Flights Search
                </Link>
            </div>
        </li>
        <li className='nav-item'>
            <div className='side-bar-logo'>
                <MdLocalHotel></MdLocalHotel>
            </div>
            <div>
                <Link to='/accommodation' className='link-item'>
                    Accommodation
                </Link>
            </div>
        </li>
        <li className='nav-item'>
            <div className='side-bar-logo'>
                <TiWeatherCloudy></TiWeatherCloudy>
            </div>
            <div>
                <Link to='/weather' className='link-item'>
                    Weather
                </Link>
            </div>
        </li>
        <li className='nav-item'>
            <div className='side-bar-logo'>
                <FaBookmark></FaBookmark>
            </div>
            <div>
                <Link to='/itineraries' className='link-item'>
                    Itineraries
                </Link>
            </div>
        </li>
        <li className='nav-item'>
            <div className='side-bar-logo'>
                <FaSignOutAlt></FaSignOutAlt>
            </div>
            <div>
                <Link onClick={onLogout} to='/' className='link-item'>   
                    Logout
                </Link>
            </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
