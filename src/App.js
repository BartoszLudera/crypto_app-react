import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import CoinList from "./components/CoinList";
import { coinActions } from "./store/coin-slice";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const coins = useSelector((state) => state.coin.coins);
  const dispatch = useDispatch();

  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=btc&order=market_cap_desc&per_page=100&page=1&sparkline=true&locale=en";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        dispatch(coinActions.setCoins(response.data)); // Dispatch the setCoins action
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [dispatch, url]);

  return (
    <ThemeProvider>
      <Navbar />
      {loading ? (
        <Loading/>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-screen">
    <p>Error: {error}</p>
    <p>Coingeco API isn't working, try again after a couple of minutes...</p>
</div>

      ) : (
        <CoinList coins={coins} />
      )}
    </ThemeProvider>
  );
}

export default App;
