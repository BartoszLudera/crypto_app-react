import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CoinList from "./components/CoinList";
import { coinActions } from "./store/coin-slice";
import Loading from "./components/Loading";
import jsonResponse from "./staticResponse/response.json";
import { Routes, Route } from "react-router";
import CoinDetail from "./routers/CoinDetial";
import Login from "./components/Login";
import Register from "./components/Register";
import Test from "./components/Test";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const coins = useSelector((state) => state.coin.coins);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      // Simulating API response delay with setTimeout (replace with actual fetch logic)
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(coinActions.setCoins(jsonResponse));
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };


  useEffect(() => {
    loadData();
  }, [dispatch]);

  return (
    // <ThemeProvider>
    //   <Navbar />
    //   {/* {loading ? (
    //     <Loading />
    //   ) : error ? (
    //     <div className="flex flex-col items-center justify-center h-screen">
    //       <p>Error: {error}</p>
    //       <p>Failed to load data from JSON file. Please try again.</p>
    //     </div>
    //   ) : (
    //     <CoinList />
    //   )} */}
    //   <Routes>
    //     <Route path='/' element={<CoinList />} />
    //     <Route path='/coin/:coinId' element={<CoinDetail />} />
    //     <Route path='/signin' element={<Login/>}/>
    //     <Route path='/signup' element={<Register/>}/>
    //   </Routes>
    // </ThemeProvider>
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<CoinList />} />
        <Route path='/coin/:coinId' element={<CoinDetail />} />
        <Route path='/signin' element={<Login/>} />
        <Route path='/signup' element={<Register />} />
      </Routes>
    </ThemeProvider>

    
  );
}

export default App;
