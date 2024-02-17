import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { coinActions } from '../store/coin-slice';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import axios from 'axios';

const CoinItem = ({ coin}) => {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.coin.isLogged);
    // const token = useSelector(state => state.coin.token); // Token from Redux store

    const [savedCoin, setSavedCoin] = useState(false);



    const toogleFavCoin = async () => {
        try {
            if (savedCoin) {
                // Remove fav coin
                await axios.post("http://localhost:3000/api/favorites/remove", {
                    username: localStorage.getItem("username"), // Pobierz nazwę użytkownika z localStorage
                    coinId: coin.id // Przekaż ID coina
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            } else {
                // Add fav coin
                await axios.post("http://localhost:3000/api/favorites/add", {
                    username: localStorage.getItem("username"), // Pobierz nazwę użytkownika z localStorage
                    coinId: coin.id // Przekaż ID coina
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            }
            setSavedCoin(!savedCoin);
        } catch (error) {
            console.error("Error toggling favorite coin:", error);
        }
    };
 

    return (
        <tr className='h-[80px] border-b overflow-hidden'>
            {isLogged ? (
                <td onClick={toogleFavCoin}>
                    {savedCoin ? <AiFillStar size={18} /> : <AiOutlineStar size={18} />}
                </td>
            ) : (
                <td>
                    <Link to='/signup'>
                        {savedCoin ? <AiFillStar size={18} /> : <AiOutlineStar size={18} />}
                    </Link>
                </td>
            )}
            <td>{coin.market_cap_rank}</td>
            <td>
                <Link to={`/coin/${coin.id}`}>
                    <div className='flex items-center'>
                        <img
                            className='w-10 mr-2 rounded-full'
                            src={coin.image}
                            alt={coin.id}
                        />
                        <p className='hidden sm:table-cell text-lg'>{coin.name}</p>
                    </div>
                </Link>
            </td>
            <td className='font-bold'>{coin.symbol.toUpperCase()}</td>
            <td>${coin.current_price.toLocaleString()}</td>
            <td>
                {coin.price_change_percentage_24h > 0 ? (
                    <p className='text-green-600'>
                        {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                ) : (
                    <p className='text-red-600'>
                        {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                )}
            </td>
            <td className='w-[180px] hidden md:table-cell'>
                ${coin.total_volume.toLocaleString()}
            </td>
            <td className='w-[180px] hidden sm:table-cell'>
                ${coin.market_cap.toLocaleString()}
            </td>
            <td>
                <Sparklines data={coin.sparkline_in_7d.price}>
                    <SparklinesLine color={coin.price_change_percentage_24h > 0 ? 'green' : 'red'} />
                </Sparklines>
            </td>
        </tr>
    );
};

export default CoinItem;
