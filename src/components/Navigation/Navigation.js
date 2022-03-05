import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { FaUserCircle } from 'react-icons/fa'
import './Navigation.css'

const Navigation = () => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    return (<div className="nav-header-container">
        <div className="nav-header">
            <NavLink to="/">
                <div className="logo">
                    Todo App
                </div>
            </NavLink>

            <div>
                <nav className="nav-container">
                    <ul>
                        {!user ? <><li className="nav-link">
                            <NavLink to="/login" className={({ isActive }) => isActive && "active-link"}>Login</NavLink>
                        </li>
                            <li className="nav-link" >
                                <NavLink to="/register" className={({ isActive }) => isActive && "active-link"}>Register</NavLink>
                            </li></> : <>
                            <li className="current-user-container">
                                <div className="current-user">
                                    <div className="current-user-avatar">
                                        <FaUserCircle className="avatar" />
                                    </div>
                                    <span className="current-user-email">{user ? user.name : 'name'}</span>
                                </div>
                            </li>
                            <li onClick={() => dispatch(logout())} className="logout-btn nav-link">
                                <span>Logout</span>
                            </li>
                        </>}
                    </ul>
                </nav>
            </div>
        </div>
    </div>
    )
}

export default Navigation