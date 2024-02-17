import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

export default function PriceNoteDisplay({fetchPriceNote, priceNote, setPriceNote}) {

  const handleDelete = async (coinName) => {
    try {
      await axios.delete("http://localhost:3000/api/priceNote/delete", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { coinName },
      });
      console.log("Coin deleted successfully");
      // Aktualizacja listy po usunięciu
      fetchPriceNote();
    } catch (error) {
      console.error("Error deleting coin:", error);
    }
  };

  useEffect(() => {
    fetchPriceNote();
  }, []);

  return (
    <div className="">
      {priceNote.length === 0 ? (
        <p className="flex justify-center">You don't have any Price Notes</p>
      ) : (
        priceNote.map((coin, index) => (
          <div key={index} className="rounded-div flex flex-row justify-between py-4">
            <div>
              <p>Coin name: {coin.name}</p>
              <p>Price: {coin.price}$</p>
            </div>
            <button
              onClick={() => handleDelete(coin.name)}
              className="bg-button text-btnText hover:border-secondary font-bold py-2 px-4 rounded flex items-center"
            >
              <div>
                <IoMdClose size={20}/>
              </div>
              Close
            </button>
          </div>
        ))
      )}
    </div>
  );
}