import React, { useContext, useEffect, useState } from "react";
import "./Coins.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";

const Coins = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const {currency} = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    fetch(`https://pro-api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
  }, [currency]);

  if (!coinData) return <div>Loading...</div>;
  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt=""/>
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
    </div>
  );
};

export default Coins;
