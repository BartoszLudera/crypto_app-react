import React from "react";
import ReactPaginate from "react-paginate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CustomPagination = ({ pageCount, handlePageChange }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      onPageChange={handlePageChange}
      containerClassName="pagination flex justify-center mt-8"
      subContainerClassName="pages pagination"
      activeClassName="active border-black border-2 p-2"
      previousLabel={
        <button className="flex items-center gap-2 p-2">
          <FaArrowLeft className="h-5 w-5" /> Previous
        </button>
      }
      nextLabel={
        <button className="flex items-center gap-2 p-2">
          Next <FaArrowRight className="h-5 w-5" />
        </button>
      }
      breakLabel={"..."}
      breakClassName={"break-me text-xl"}
      pageClassName={"inline-block p-2 px-4 mx-2 border border-2 rounded-3xl"}
      activeClassName={"bg-button text-white"}
    />
  );
};

export default CustomPagination;
