import React from "react";
import { useParams } from "react-router";

const CoinDetail = () => {
    const { coinId } = useParams();
    return (
        <div>
            <h2>Coin Details for {coinId}</h2>
        </div>
    );
};

export default CoinDetail;
