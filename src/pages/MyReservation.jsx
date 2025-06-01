import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const MyReservation = () => {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading]         = useState(true);
  const navigate                       = useNavigate();

  useEffect(() => {
    api.get('/api/reservations/')
      .then(res => {
        if (res.data.length > 0) setReservation(res.data[0]);
      })
      .catch(err => console.error('Error fetching reservations:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async () => {
    if (!reservation) return;
    try {
      await api.delete(`/api/reservations/${reservation.id}/`);
      alert('Reservation canceled');
      navigate('/reservations');
    } catch (err) {
      console.error(err);
      alert('Error canceling');
    }
  };

  if (loading) return <p className="text-center mt-8">Loading…</p>;
  if (!reservation) return <p className="text-center mt-8">No active reservation.</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">My Reservation</h2>
      <div className="border p-4 rounded mb-4">
        <h3 className="text-xl font-semibold">{reservation.room_name || reservation.room}</h3>
        <p><strong>Check-in:</strong> {reservation.check_in}</p>
        <p><strong>Check-out:</strong> {reservation.check_out}</p>
      </div>
      <button
        className="w-full bg-red-500 text-white py-2 rounded"
        onClick={handleCancel}
      >
        Cancel Reservation
      </button>
    </div>
  );
};

export default MyReservation;
