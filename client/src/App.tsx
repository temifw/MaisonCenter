import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import About from './pages/About';

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  if (path === '/details') {
    return <RoomDetails />;
  }

  if (path === '/about') {
    return <About />;
  }

  if (path === '/rooms') {
    return <Rooms />;
  }
  
  return <Home />;
}

export default App;
