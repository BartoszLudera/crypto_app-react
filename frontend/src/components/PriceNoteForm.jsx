import React, { useState } from "react";
import axios from "axios";

export default function PriceNoteForm({fetchPriceNote}) {
  const [coinName, setCoinName] = useState("");
  const [price, setPrice] = useState("");

  const handleCoinNameChange = (event) => {
    setCoinName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/priceNote/add",
        {
          username: localStorage.getItem("username"),
          coinName: coinName,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Coin added successfully");
    } catch (error) {
      console.error("Error adding coin:", error);
    }
    setCoinName("");
    setPrice("");
    fetchPriceNote();
  };

  return (
    <div className="flex items-center justify-between">
      <form className="flex items-center">
        <div className="mr-4">
          <input
            type="text"
            placeholder="Coin name"
            value={coinName}
            onChange={handleCoinNameChange}
            className="w-full px-3 py-2 rounded border"
            required
          />
        </div>
        <div className="mr-4">
          
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={handlePriceChange}
            className="w-full px-3 py-2 rounded border"
            required
          />
        </div>
        <button
          type="submit"
          onClick={handleAdd}
          className="bg-button hover:bg-button text-btnText hover:border-secondary font-bold py-2 px-4 rounded flex item-center"
        >
          Add
        </button>
      </form>
    </div>
  );
}
