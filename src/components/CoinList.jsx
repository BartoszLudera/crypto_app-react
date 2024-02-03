import React from "react";
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

  return (
    <div className="mx-10 my-10 border-2 rounded-2xl rounded-div shadow-3xl shadow-dark">
      <div className="flex flex-row justify-between">
        <FavToggle />
        <SearchField />
      </div>
      <Trending/>
      {favCoinsVisible ? <Table coins={favCoins} /> : <Table coins={coins} />}
    </div>
  );
}
