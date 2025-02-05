import React, { useContext, useEffect, useState } from "react";
import "./Coins.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coins = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicData, setHistoricData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-fBbRJNeCebyS8EKjeex4nL99",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  const fetchHistoricData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-fBbRJNeCebyS8EKjeex4nL99",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${
        currency?.name || "usd"
      }&days=20&interval=daily`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricData(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricData();
  }, [coinId, currency]); // Added `coinId` as a dependency

  if (coinData && historicData) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image?.large} alt={coinData.name} />
          <p>
            <b>
              {coinData.name} ({coinData.symbol?.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicData={historicData} />
        </div>

        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>MarketCap</li>
            <li>
              {currency.symbol}
              {coinData.market_data.market_cap[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coins;
