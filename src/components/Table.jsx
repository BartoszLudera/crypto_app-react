import React, { useState } from "react";
import CoinItem from "./CoinItem";
import ReactPaginate from "react-paginate";


export default function Table({ coins }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCoins = coins.slice(indexOfFirstItem, indexOfLastItem);

  const pageCount = Math.ceil(coins.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div>
      <table className="w-full border-collapse text-center mt-5">
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
          {currentCoins.map((coin) => (
            <CoinItem key={coin.id} coin={coin} />
          ))}
        </tbody>
      </table>
      {pageCount > 1 && (
        <div className="mt-5">
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
      )}
    </div>
  );
}