import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../../features/auth/authSlice'
import "./Login.css"

import { Card } from "../../components"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isError, isLoading, isSuccess, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginSubmitHandler = e => {
        e.preventDefault()
        if (!email.includes('@') || !email.includes('.com')) {
            return alert('Email must include @ and .com')
        }
        if (password.length < 6) {
            return alert('Password must be atleast 6 character long.')
        }
        dispatch(login({
            email,
            password
        }))
    }

    useEffect(() => {
        if (user) {
            navigate('/')
            reset()
        }
        if (isSuccess) {
            navigate('/')
        }
        if (isError) {
            alert('Invalid Credentials')
        }
        reset()
    }, [isSuccess, navigate, user, isError])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <form onSubmit={loginSubmitHandler}>
            <div className="login-page-container">
                <div className="login-card">
                    <Card>
                        <div className="login-form">
                            <h2>Login</h2>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input onChange={e => setEmail(e.target.value)} value={email} id="email" placeholder="Enter your email" type="email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor='password'>Password</label>
                                    <input onChange={e => setPassword(e.target.value)} value={password} id="password" placeholder="Enter your password" type="password" />
                                </div>
                                <button className="login-btn" type="submit">Login</button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </form>
    )
}

export default Login