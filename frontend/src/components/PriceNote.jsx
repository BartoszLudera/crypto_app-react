import React, { useState } from "react";
import PriceNoteForm from "./PriceNoteForm";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import PriceNoteDisplay from "./PriceNoteDispaly";
import axios from "axios";

export default function PriceNote({ isLogged }) {
  const [showMoreTrending, setShowMoreTrending] = useState(false);

  const showMoreTrendingToggle = () => {
    setShowMoreTrending(!showMoreTrending);
  };

  const [priceNote, setPriceNote] = useState([]);

  const fetchPriceNote = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/priceNote", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const priceNotes = response.data;
      setPriceNote(priceNotes);
    } catch (error) {
      console.error("Error fetching favorite coins:", error);
    }
  };

  return (
    <div className="rounded-div mb-8 text-primary pb-2">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold py-4 mr-4">Price Note</h1>
        {showMoreTrending ? (
          <IoIosArrowUp size={24} onClick={showMoreTrendingToggle} />
        ) : (
          <IoIosArrowDown size={24} onClick={showMoreTrendingToggle} />
        )}
      </div>

      {isLogged && showMoreTrending && (
        <div className="mb-4">
          <PriceNoteForm fetchPriceNote={fetchPriceNote}/>
          <h1 className="text-xl py-4">Price Note list:</h1>
          <PriceNoteDisplay fetchPriceNote={fetchPriceNote} priceNote={priceNote} setPriceNote={setPriceNote}/>
        </div>
      )}

      {!isLogged && showMoreTrending && (
        <div className="flex justify-center pb-4">
          <p className="text-2xl">Log in to set price note!</p>
        </div>
      )}
    </div>
  );
}
