import React from 'react';
import './styles/nav-style.css';
import './App.css';
import Menu from './Menu';
import logo from './images/logo.svg';
import {Router} from '@reach/router';
import Home from './Home';
import About from './About';
import Contacts from './Contacts';
import Services from './Services';
import Portfolio from './Portfolio';
import PortfolioCard from './PortfolioCard';

function App() {
  return (
    <div className="App">
      <div className="logo">
        <img className="logo-image" src={logo} alt="Logo of Jack Toke" />
      </div>
      <Router>
        <Home path="/" />
        <About path="/about" />
        <Services path="/services" />
        <Portfolio path="/portfolio" />
        <PortfolioCard path="/portfolio2" />
        <Contacts path="/contacts" />
      </Router>
      <Menu />
    </div>
  );
}

export default App;
