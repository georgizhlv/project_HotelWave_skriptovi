import React, { useEffect, useState } from 'react';
import api from '../api';
import RoomCard from '../components/RoomCard';

const Home = () => {
  const [rooms, setRooms]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/rooms/') 
      .then(res => setRooms(res.data))
      .catch(err => console.error('Error fetching rooms:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading rooms…</p>;
  }

  return (
    <div className="p-4">
      {rooms.length === 0 ? (
        <p className="text-center mt-8">No rooms available.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map(room => (
            <RoomCard 
              key={room.id} 
              room={room} 
              onSelect={() => { /*...*/ }} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
