import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class Nav extends Component {
    render() { 
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>Home</Link> 
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <Link className="nav-link active" to={'/login'}>Login</Link>
                    </li>Link
                    <li className="nav-item">
                        <Link className="nav-link active" to={'/register'}>Register</Link>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
        )
    }
}