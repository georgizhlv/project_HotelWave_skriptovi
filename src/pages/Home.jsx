import React, { useEffect, useState } from 'react';
import api from '../api';
import RoomCard from '../components/RoomCard';
import ReservationForm from '../components/ReservationForm';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    api.get('/rooms/')
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {selectedRoom ? (
        <div className="col-span-full">
          <button
            className="mb-4 text-blue-500"
            onClick={() => setSelectedRoom(null)}
          >
            &larr; Back
          </button>
          <ReservationForm
            room={selectedRoom}
            onSuccess={() => {
              setSelectedRoom(null);
              alert('Reservation created!');
            }}
          />
        </div>
      ) : (
        rooms.map(room => (
          <RoomCard key={room.id} room={room} onSelect={setSelectedRoom} />
        ))
      )}
    </div>
  );
};

export default Home;