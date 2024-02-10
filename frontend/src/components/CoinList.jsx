import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "./Table";
import CoinItem from "./CoinItem";
import FavToggle from "./FavToggle";
import SearchField from "./SearchField";
import Trending from "./Trending";

export default function CoinList() {
  const coins = useSelector((state) => state.coin.coins);
  const favCoins = useSelector((state) => state.coin.favCoins);
  const favCoinsVisible = useSelector((state) => state.coin.favCoinsVisible);

  // Początkowe filtrowanie danych na podstawie favCoins
  const [filteredCoins, setFilteredCoins] = useState(coins.filter((coin) => favCoins.includes(coin.id)));

  // Użyj useEffect do ponownego filtrowania danych po zmianie favCoins
  useEffect(() => {
    const updatedFilteredCoins = coins.filter((coin) => favCoins.includes(coin.id));
    setFilteredCoins(updatedFilteredCoins);
  }, [favCoins, coins]);

  return (
    <div className="mx-10 border-2 rounded-2xl rounded-div shadow-3xl shadow-dark">
      <Trending />
      <div className="flex flex-row justify-between ">
        <FavToggle />
        <SearchField />
      </div>
      <Table coins={favCoinsVisible ? filteredCoins : coins} />
    </div>
  );
}
