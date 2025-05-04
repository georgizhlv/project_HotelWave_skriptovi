import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from '../components/RoomCard';
import ReservationForm from '../components/ReservationForm';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + '/rooms/'
        );
        setRooms(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onSelect={setSelectedRoom}
          />
        ))
      )}
    </div>
  );
};

export default Home;