import React, { useContext } from "react";
import "./Navbar.css";
import cryptogreek from "../../assets/cryptogreek.png";
import arrow_icon from "../../assets/arrow_icon.png";
import { CoinContext } from "../../context/CoinContext";

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext)

  const currencyMap = {
    usd: {name: "usd", symbol: "$"},
    eur: {name: "eur", symbol: "€"},
    pesos: {name: "mxn", symbol: "$"},
    // quetzal: {name: "gtq", symbol: "Q"}
  };

  const currencyHandler = (e) => {
    setCurrency(currencyMap[e.target.value] || currencyMap.usd);
  };
  
  return (
    <div className="navbar">
      <img src={cryptogreek} alt="Cryptogreek Logo" className="cryptogreek" />
      <nav>
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">Pricing</a>
      </nav>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="pesos">PESOS</option>
          {/* <option value="quetzal">QUETZAL</option> */}
        </select>
        <button className="signup-button">
          Sign up <img src={arrow_icon} alt="Arrow Icon" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
