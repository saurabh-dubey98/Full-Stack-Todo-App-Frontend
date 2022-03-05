import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../../features/auth/authSlice'
import "./Register.css"

import { Card } from "../../components"

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isError, isLoading, isSuccess, message, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const registerSubmitHandler = e => {
        e.preventDefault()
        if (!name) {
            return alert('Name is required')
        }
        if (!email.includes('@') || !email.includes('.com')) {
            return alert('Email must include @ and .com')
        }
        if (password.length < 6) {
            return alert('Password must be atleast 6 character long.')
        }
        dispatch(register({
            name,
            email,
            password
        }))
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
        if (isSuccess) {
            navigate('/')
        }
        reset()
    }, [isSuccess, navigate, user])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{message}</div>
    }

    return (
        <form onSubmit={registerSubmitHandler}>
            <div className="login-page-container">
                <div className="login-card">
                    <Card>
                        <div className="login-form">
                            <h2>Register</h2>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input value={name} onChange={e => setName(e.target.value)} id="name" placeholder="Enter your name" type="text" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} id="email" placeholder="Enter your email" type="email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor='password'>Password</label>
                                    <input value={password} onChange={e => setPassword(e.target.value)} id="password" placeholder="Enter your password" type="password" />
                                </div>
                                <button className="login-btn">Register</button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </form>
    )
}

export default Register