import React from 'react';

const RoomCard = ({ room, onSelect }) => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold">{room.name}</h2>
      <p>Type: {room.type}</p>
      <p>Price: ${room.price} / night</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => onSelect(room)}
      >
        Book Now
      </button>
    </div>
  );
};

export default RoomCard;
