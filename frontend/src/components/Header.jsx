import { Link } from 'react-router-dom'
import {FaSignInAlt, FaUser} from 'react-icons/fa'

function Header() {

  return (
    <header className="header">
        <div className="header-logo">
            <Link to='/login'>Orbit</Link>
        </div>
        <ul>
            <>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt></FaSignInAlt>Sign in
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