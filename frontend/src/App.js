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
import axios from 'axios';


function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const coins = useSelector((state) => state.coin.coins);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/data/currencies');
      // Dispatch actions or update state with response.data
      dispatch(coinActions.setCoins(response.data));
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
      setError(error); // Set error state if an error occurs
      setLoading(false); // Set loading to false to indicate data loading is complete
    }
  };


  useEffect(() => {
    loadData(); // Load data initially
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval); // Clean up interval on component unmount
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