import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { coinActions } from "../store/coin-slice";
import { Link } from "react-router-dom";

export default function FavToggle() {
    const dispatch = useDispatch();
    const favCoinsVisible = useSelector(state => state.coin.favCoinsVisible);
    const isLogged = useSelector(state => state.coin.isLogged);

    const toggleFavCoinsVisible = () => {
        dispatch(coinActions.favCoinsVisible());
    };

    const toggleFavCoinsUnvisible = () => {
        dispatch(coinActions.favCoinsUnvisible());
    };

    return (
        <div>
            <button onClick={toggleFavCoinsUnvisible} className={`text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl ${favCoinsVisible ? 'bg-primary text-primary' : 'bg-button'}`}>
                All
            </button>
            {isLogged ? (
            <button onClick={toggleFavCoinsVisible} className={` text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl ${favCoinsVisible ? 'bg-button' : 'bg-primary text-primary'}`}>
                Favourite
            </button>
            ) : (
            <Link to='/signup' className={` text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl ${favCoinsVisible ? 'bg-button' : 'bg-primary text-primary'}`}>
                Favourite
            </Link>
            )}
        </div>
    );
}
