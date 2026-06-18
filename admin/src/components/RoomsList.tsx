import { useEffect, useState } from 'react';
import { hotelService, type Room } from '../services/hotelService';

// Minimal example list of rooms (used for quick checks / embedding).
export const RoomsList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hotelService
      .getRooms()
      .then((response) => setRooms(response.data))
      .catch((error) => console.error('Failed to fetch rooms:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {rooms.map((room) => (
        <div key={room.id}>
          {room.room_number} - {room.room_types?.name ?? 'Room'} ({room.status})
        </div>
      ))}
    </div>
  );
};
