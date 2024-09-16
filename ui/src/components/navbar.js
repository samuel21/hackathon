import React from 'react';
import './css/navbar.css'; // Assuming you have a CSS file for styling

const Navbar = ({ scrollToQuestionnaire }) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a href="/">Stark Tech</a>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="/home" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                    <a href="/about" className="nav-link">About</a>
                </li>
                <li className="nav-item">
                    <a href="#questionnaire" className="nav-link" onClick={scrollToQuestionnaire}>Questionnaire</a>
                </li>
                <li className="nav-item">
                    <a href="/calendar" className="nav-link">Calendar</a>
                </li>
                <li className='nav-item'>
                    <a href="/contact" className="nav-link">Contact</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;