import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <div id="header">
        <img className="logo" src={require('../logo.jpg')} alt="Byamaso Logo" />
        <nav className="navbar navbar-expand-lg justify-content-end">
          <ul className="nav nav-fill">
            <li className="nav-item col-sm-3"><NavLink className="nav-link" exact to="/">Home</NavLink></li>
            <li className="nav-item col-sm-3 dropdown">
              <NavLink className="nav-link dropdown-toggle" to="/services" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Services</NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <NavLink className="dropdown-item" to="/real-estate">Real Estate</NavLink>
                <NavLink className="dropdown-item" to="/car-rental">Car Rental</NavLink>
                <NavLink className="dropdown-item" to="/cleaning&Laundry">Cleaning & Laundry</NavLink>
                <NavLink className="dropdown-item" to="/ad-hoc">Ad-Hoc Services</NavLink>
              </div>
            </li>
            <li className="nav-item col-sm-3"><NavLink className="nav-link" to="/aboutUs">About Us</NavLink></li>
            <li className="nav-item col-sm-3"><NavLink className="nav-link" to="/appointment">Appointment</NavLink></li>
          </ul>
        </nav>
      </div>
    )
  }
}
