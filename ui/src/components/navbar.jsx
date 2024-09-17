import React from 'react';
import './css/navbar.css'; // Assuming you have a CSS file for styling
import { Nav, NavItem } from 'react-bootstrap';

const Navbar = () => {
    return (
        <Nav className="navbar">
            <div className="navbar-brand">
                <Nav.Link href="/" >Stark Tech</Nav.Link>
            </div>
            <div className="nav-group">
                <Nav.Item className="nav-item">
                    <Nav.Link href="#">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                    <Nav.Link href="#questionnaire">Questionnaire</Nav.Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                    <Nav.Link href="#calendar">Calendar</Nav.Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                    <Nav.Link href="/contact">Contact</Nav.Link>
                </Nav.Item>
            </div>
        </Nav>
    );
};

export default Navbar;