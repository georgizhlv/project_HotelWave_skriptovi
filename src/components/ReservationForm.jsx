import React, { useState } from 'react';
import axios from 'axios';

const ReservationForm = ({ room, onSuccess }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        process.env.REACT_APP_API_URL + '/reservations/',
        { room: room.id, check_in: checkIn, check_out: checkOut },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Error creating reservation');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-medium">Book {room.name}</h3>
      <div className="mt-2">
        <label>Check-in:</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mt-2">
        <label>Check-out:</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Confirm
      </button>
    </form>
  );
};

export default ReservationForm;