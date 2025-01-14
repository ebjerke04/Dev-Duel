import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './../Styling/main_menu.css';

const MainMenu = () => {
  return (
    <nav className="main-menu">
        <ul className="menu-items">
            <li><Link className="menu-item" to="/">Home</Link></li>
            <li><Link className="menu-item" to="/editor">Editor</Link></li>
            <li><Link className="menu-item" to="/editor">Play</Link></li>
        </ul>
    </nav>
  );
}
  
export default MainMenu;