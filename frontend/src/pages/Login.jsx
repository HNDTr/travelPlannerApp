import { FaSignInAlt } from "react-icons/fa"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { login, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData

    const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }
    
    dispatch(login(userData))
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    if(isLoading){
        return <Spinner></Spinner>
    }

  return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt></FaSignInAlt>Login
            </h1>
            <p>Login and start your journey!</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange}/>
                </div>

                <div>
                    <button type="subit" className="btn btn-block">
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login