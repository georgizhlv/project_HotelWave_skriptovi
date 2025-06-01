import React, { useEffect, useState } from 'react';
import api from '../api';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    api.get('/reservations/')
      .then(res => setReservations(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Reservations</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Room</th>
            <th className="border px-4 py-2">Check-in</th>
            <th className="border px-4 py-2">Check-out</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(r => (
            <tr key={r.id}>
              <td className="border px-4 py-2">{r.room_name || r.room}</td>
              <td className="border px-4 py-2">{r.check_in}</td>
              <td className="border px-4 py-2">{r.check_out}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;