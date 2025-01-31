import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";

const Home = () => {
  const { allCoin, currency, setCurrency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);

  useEffect(() => {
    setDisplayCoin(allCoin || []); // Ensure no errors if allCoin is undefined
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          The Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's best cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form>
          <input type="text" placeholder="Search Crypto..." />
          <button type="submit">Search</button>
        </form>
      </div>
      
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24Hr Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        
        {displayCoin.slice(0, 50).map((item) => (
          <div className="table-layout" key={item.market_cap_rank || item.id}>
            <p>{item.market_cap_rank || "N/A"}</p>
            <div>
              <img src={item.image} alt={item.name || "Crypto"} />
              <p>{`${item.name || "Unknown"} - ${item.symbol?.toUpperCase() || ""}`}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price?.toLocaleString() || "N/A"}
            </p>
            <p className={item.price_change_percentage_24h > 0 ? "positive" : "negative"}>
              {item.price_change_percentage_24h?.toFixed(2) || "0.00"}%
            </p>
            <p className="market-cap">
              {currency.symbol} {item.market_cap?.toLocaleString() || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
