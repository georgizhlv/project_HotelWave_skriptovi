import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate(`/reserve/${room.id}`);
  };

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold">{room.name}</h2>
        <p className="text-sm text-gray-600">{room.type}</p>
        <p className="mt-2 text-lg font-bold">${room.price} / night</p>
      </div>
      <button
        onClick={handleBook}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Book Now
      </button>
    </div>
  );
};

export default RoomCard;

