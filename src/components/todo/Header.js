import React from 'react'
import { Link } from '../router'
/* import {partial} from '../../lib/utils' */

export const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#"><h1>React tracking app</h1 ></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to='/'>All</Link><span className="sr-only"></span>
                    </li>
                    <li className="nav-item">
                        <Link to='/active'>Active</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/complete'>Completed</Link>
                    </li>
                </ul>
            </div>

        </nav>
    )
}