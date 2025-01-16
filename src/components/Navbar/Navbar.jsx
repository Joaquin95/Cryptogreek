import React from "react";
import "./Navbar.css";
import cryptogreek from "../../assets/cryptogreek.png"
import arrow_icon from '../../assets/arrow_icon.png'

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={cryptogreek} alt="" className="cryptogreek" />
      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="Peso">PESO</option>
        </select>
        <button>Sign up <img src={arrow_icon} alt="" /> </button>
      </div>
    </div>
  );
}

export default Navbar;
