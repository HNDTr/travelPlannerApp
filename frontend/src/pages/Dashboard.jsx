import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'

function Dashboard() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])

  return (
    <div className="pages">
      <div className='container'>
        <h1>Welcome {user && user.name}</h1>
      </div>
    </div>
  )
}

export default Dashboard