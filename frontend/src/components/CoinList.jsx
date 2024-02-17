import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "./Table";
import CoinItem from "./CoinItem";
import FavToggle from "./FavToggle";
import SearchField from "./SearchField";
import Trending from "./Trending";
import axios from "axios";

export default function CoinList() {
  const coins = useSelector((state) => state.coin.coins);
  const favCoinsVisible = useSelector((state) => state.coin.favCoinsVisible);
  const [favCoins, setFavCoins] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);



  const fetchFavCoins = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/favorites",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      const favoriteCoins = response.data;
      setFavCoins(favoriteCoins); // Ustawianie stanu favCoins po pobraniu ulubionych monet
  
      // Filtrowanie obiektów coins, których id znajduje się w tablicy favCoins
      const filteredCoins = coins.filter(coin => favCoins.includes(coin.id));
      setSelectedCoins(filteredCoins);
    } catch (error) {
      console.error("Error fetching favorite coins:", error);
    }
  };
  

  useEffect(() => {
    fetchFavCoins();
  }, [favCoinsVisible]);

  return (
    <div className="mx-10 border-2 rounded-2xl rounded-div shadow-3xl shadow-dark">
      <Trending />
      <div className="flex flex-row justify-between ">
        <FavToggle fetchFavCoins={fetchFavCoins} />
        {/* <SearchField /> */}
      </div>
      <Table coins={favCoinsVisible ? selectedCoins : coins} />
    </div>
  );
}
