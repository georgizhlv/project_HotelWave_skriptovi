import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const ReservationForm = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // ime i detaili na staqta
  const [room, setRoom] = useState(null);

  //poleta za formata
  const [checkIn, setCheckIn]   = useState('');
  const [checkOut, setCheckOut] = useState('');

  const [error, setError] = useState('');

  //zarejdane na detailite za staqta
  useEffect(() => {
    api.get(`/api/rooms/${roomId}/`)
      .then(res => {
        setRoom(res.data);
      })
      .catch(err => {
        console.error('Error fetching room details:', err);
        setError('Cannot load room details.');
      });
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Proverka na dannite
    if (!checkIn || !checkOut) {
      return setError('Both check-in and check-out dates are required.');
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      return setError('Check-out date must be after check-in date.');
    }

    try {
      //api post na rezervaciqta
      await api.post('/api/reservations/', {
        room: roomId,
        check_in: checkIn,
        check_out: checkOut,
      });
      // sled uspeshna rezervaciq posochvame da preminem kum moite reservacii
      navigate('/my-reservation', { replace: true });
    } catch (err) {
      console.error('Error creating reservation:', err);
      if (err.response?.data) {
        const data = err.response.data;
        let messages = '';
        for (const key in data) {
          const fieldErrors = data[key];
          if (Array.isArray(fieldErrors)) {
            messages += `${key}: ${fieldErrors.join(' ')}\n`;
          } else {
            messages += `${key}: ${fieldErrors}\n`;
          }
        }
        setError(messages.trim());
      } else {
        setError('Error creating reservation.');
      }
    }
  };

  if (error && !room) {
    return <p className="text-center mt-8 text-red-600">{error}</p>;
  }

  if (!room) {
    return <p className="text-center mt-8">Loading room...</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Reserve: {room.name}</h2>
      {error && <p className="mb-4 text-red-600 whitespace-pre-line">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Check-in дата */}
        <div className="mb-4">
          <label className="block mb-1">Check-In Date</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>
        {/* Check-out дата */}
        <div className="mb-4">
          <label className="block mb-1">Check-Out Date</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>
        {/* Submit бутон */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Confirm Reservation
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
