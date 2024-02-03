import React from "react";
import { useParams } from "react-router";

const CoinDetail = () => {
    const { coinId } = useParams();
    const url = 'https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&sparkline=true';
    
    return (
        <div className="rounded-div">
            <h2>Coin Details for {coinId}</h2>
        </div>
    );
};

export default CoinDetail;
