import React from 'react'
import { Navigation } from '..'
import './Layout.css'

const Layout = ({ children }) => {
    return (
        <main>
            <Navigation />
            <section className="layout-child-container">
                {children}
            </section>
        </main>
    )
}

export default Layout