import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "./Table";
import CoinItem from "./CoinItem";
import FavToggle from "./FavToggle";
import SearchField from "./SearchField";
import Trending from "./Trending";
import axios from "axios";

export default function CoinList() {
  const coins = useSelector((state) => state.coin.coins);
  const favCoins = useSelector((state) => state.coin.favCoins);
  const favCoinsVisible = useSelector((state) => state.coin.favCoinsVisible);

  // Początkowe filtrowanie danych na podstawie favCoins
  const [filteredCoins, setFilteredCoins] = useState(coins.filter((coin) => favCoins.includes(coin.id)));

  // Użyj useEffect do ponownego filtrowania danych po zmianie favCoins
  useEffect(() => {
    const fetchFavorites = () => {
        const username = localStorage.getItem('username'); // Pobranie username z localStorage

        axios.get(`http://localhost:3000/api/get-favorites/${username}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Pobranie token z localStorage
            }
        })
        .then(response => {
            if (response.status === 200) {
                // Tutaj obsłuż odpowiedź, na przykład przypisując dane do stanu
                // Można założyć, że odpowiedź zawiera listę ulubionych kryptowalut
                console.log('Favorites retrieved successfully:', response.data);
            }
        })
        .catch(error => {
            console.error('Error retrieving favorite coins:', error);
        });
    };

    fetchFavorites(); // Wywołanie funkcji pobierającej ulubione kryptowaluty
}, [favCoins, coins]); // Zależności useEffect

  return (
    <div className="mx-10 border-2 rounded-2xl rounded-div shadow-3xl shadow-dark">
      <Trending />
      <div className="flex flex-row justify-between ">
        <FavToggle />
        {/* <SearchField /> */}
      </div>
      <Table coins={favCoinsVisible ? filteredCoins : coins} />
    </div>
  );
}
