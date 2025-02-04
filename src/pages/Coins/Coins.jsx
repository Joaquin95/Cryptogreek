import React, { useContext, useEffect, useState } from "react";
import "./Coins.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";

const Coins = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    try {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      const response = await fetch(
        `https://pro-api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, [coinId, currency]); // Added `coinId` as a dependency

  return coinData ? (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image?.large} alt={coinData.name} />
        <p>
          <b>
            {coinData.name} ({coinData.symbol?.toUpperCase()})
          </b>
        </p>
      </div>
    </div>
  ) : (
    <div className="spinner">
      <div className="spin"></div>
    </div>
  );
};

export default Coins;
