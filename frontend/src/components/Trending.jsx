import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useSelector } from 'react-redux'; // Corrected import
import { Link } from 'react-router-dom';

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [showMoreTrending, setShowMoreTrending] = useState(false);
  const isLogged = useSelector(state => state.coin.isLogged);

  const showMoreTrendingToggle = () => {
    setShowMoreTrending(!showMoreTrending);
  };

  const url = 'https://api.coingecko.com/api/v3/search/trending';

  useEffect(() => {
    axios.get(url).then(response => {
      setTrending(response.data.coins);
    });
  }, []);

  const displayedTrending = showMoreTrending ? trending : trending.slice(0, 3);

  return (
    <div className="rounded-div mb-12 text-primary pb-2">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold py-4 mr-4">Trending Coins</h1>
        {showMoreTrending ? (
          <IoIosArrowUp size={24} onClick={showMoreTrendingToggle} />
        ) : (
          <IoIosArrowDown size={24} onClick={showMoreTrendingToggle} />
        )}
      </div>
      {isLogged ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedTrending.map((coin, idx) => (
            <div
              key={idx}
              className="rounded-div flex justify-between p-4 hover:scale-105 ease-in-out duration-300"
            >
              <Link to={`/coin/${coin.item.id}`} className="flex w-full items-center justify-between">
                <div className="flex">
                  <img
                    className="mr-4 rounded-full"
                    src={coin.item.small}
                    alt={coin.item.name}
                  />
                  <div>
                    <p className="font-bold">{coin.item.name}</p>
                    <p>{coin.item.symbol}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <img
                    className="w-4 mr-2"
                    src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                    alt="Bitcoin"
                  />
                  <p>{coin.item.price_btc.toFixed(7)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        showMoreTrending ? (
          <div className="flex justify-center pb-4">
            <p className="text-2xl">Log in to see best trending coin!</p>
          </div>
        ) : null
      )}
    </div>
  );
};

export default Trending;
