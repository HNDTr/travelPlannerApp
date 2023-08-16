import { Link } from 'react-router-dom'
import {FaSignInAlt, FaUser} from 'react-icons/fa'

function Header() {

  return (
    <header className="header">
        <div className="logo">
            <Link to='/'>Portal</Link>
        </div>
        <ul>
            <>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt></FaSignInAlt>Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser></FaUser>Register
                    </Link>
                </li>
            </>
        </ul>
    </header>
  )
}

export default Header