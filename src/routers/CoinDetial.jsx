import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const CoinDetail = () => {
    const { coinId } = useParams();
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&sparkline=true`;

    const [coin, setCoin] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setCoin(response.data);
            } catch (error) {
                console.error("Error fetching coin data:", error);
            }
        };

        fetchData();
    }, [url]);

    return (
        <div className="rounded-div">
            <Link to={'/'} className="flex flex-row align-center mb-4">
                <IoIosArrowBack size={24} />
                <p className="underline ml-2 text-md">Back to all coin</p>
            </Link>
            <div>
                {coin ? (
                    <>
                        <div className="flex flex-row items-center mb-4">
                            <img
                                className='w-20 mr-2 rounded-full'
                                src={coin.image.large}
                                alt={coin.id}
                            />
                            <h1 className="text-6xl">{coin.name}</h1>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: coin.description && coin.description.en }} />
                        <div>
                            <Sparklines data={coin.market_data?.sparkline_7d?.price || []}>
                                <SparklinesLine color='teal' />
                            </Sparklines>
                        </div>
                    </>
                ) : (
                    <Loading/>
                )}
            </div>
        </div>
    );
};

export default CoinDetail;
