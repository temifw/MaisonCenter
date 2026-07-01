import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import About from './pages/About';
import Book from './pages/Book';
import MyBooking from './pages/MyBooking';

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  if (path === '/details') return <RoomDetails />;
  if (path === '/about') return <About />;
  if (path === '/rooms') return <Rooms />;
  if (path === '/book') return <Book />;
  if (path === '/my-booking') return <MyBooking />;

  return <Home />;
}

export default App;
