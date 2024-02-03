import React from "react";
import CoinItem from "./CoinItem";

export default function Table({coins}) {
    return(
    <table className='w-full border-collapse text-center'>
        <thead>
            <tr className='border-b'>
                <th></th>
                <th className='px-4'>#</th>
                <th className='text-left'>Coin</th>
                <th></th>
                <th>Price</th>
                <th>24h</th>
                <th className='hidden md:table-cell'>24h Volume</th>
                <th className='hidden sm:table-cell'>Mkt</th>
                <th>Last 7 Days</th>
            </tr>
        </thead>
        <tbody>
            <CoinItem key={coins.id} coin={coins} />
        </tbody>
    </table>
    )
}