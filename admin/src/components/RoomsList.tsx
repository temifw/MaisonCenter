import { useEffect, useState } from 'react';
import { hotelService } from '../services/hotelService';

export const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await hotelService.getRooms();
        setRooms(response.data);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {rooms.map((room: any) => (
        <div key={room.id}>{room.name}</div>
      ))}
    </div>
  );
};