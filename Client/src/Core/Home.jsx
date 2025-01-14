import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import MainMenu from './MainMenu';

import './../Styling/home_style.css';

const Home = () => {
  return (
    <div className="main-container">
      <MainMenu></MainMenu>
    </div>
  );
}
  
export default Home;