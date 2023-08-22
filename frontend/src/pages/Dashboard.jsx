import { Link, useNavigate} from 'react-router-dom'
import { useSelector} from 'react-redux'
import { useEffect } from 'react';
import dashboardImage from '../images/dashBoardImg.jpg';

function Dashboard() {

  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
        navigate('/login');
    }
}, [user, navigate]);

  return (
    <div className="pages">
      <div className='container'>
        <h4 className='dashName'>Welcome {user.name.split(' ')[0]}</h4>
        <img className='dashImg' src={dashboardImage} alt='DashBoard Img'/>
        <div className='dashButtonContainer'>
          <Link to='/flights' className='dashButton'>
              Begin Journey
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard