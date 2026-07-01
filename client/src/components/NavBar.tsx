import { useState, useEffect } from 'react';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  const isActive = (path: string) => {
    return currentPath === path
      ? "text-[#776E20] border-b border-[#776E20] pb-1"
      : "text-stone-600 dark:text-stone-400 hover:text-[#776E20]";
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200/50 dark:border-stone-800/50">
        <div className="flex justify-between items-center w-full px-6 md:px-12 py-5 md:py-6">
          <div className="text-xl md:text-2xl font-serif tracking-widest text-stone-900 dark:text-stone-50">
            The Maison Center
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <a className={`font-serif tracking-[0.15em] uppercase text-sm transition-colors duration-300 ${isActive('/')}`} href="/">Home</a>
            <a className={`font-serif tracking-[0.15em] uppercase text-sm transition-colors duration-300 ${isActive('/rooms')}`} href="/rooms">Rooms</a>
            <a className={`font-serif tracking-[0.15em] uppercase text-sm transition-colors duration-300 ${isActive('/about')}`} href="/about">About</a>
            <a className={`font-serif tracking-[0.15em] uppercase text-sm transition-colors duration-300 ${isActive('/my-booking')}`} href="/my-booking">My Booking</a>
          </div>

          <a href="/book" className="hidden md:block bg-[#776E20] text-white px-8 py-3 font-label-caps text-label-caps tracking-[0.2em] scale-100 active:scale-95 transition-transform">
            RESERVE NOW
          </a>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-stone-900 dark:text-stone-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white dark:bg-stone-950 z-40 transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden flex flex-col justify-center items-center gap-8`}>
        <a className={`font-serif tracking-[0.15em] uppercase text-2xl transition-colors duration-300 ${isActive('/')}`} href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
        <a className={`font-serif tracking-[0.15em] uppercase text-2xl transition-colors duration-300 ${isActive('/rooms')}`} href="/rooms" onClick={() => setIsMobileMenuOpen(false)}>Rooms</a>
        <a className={`font-serif tracking-[0.15em] uppercase text-2xl transition-colors duration-300 ${isActive('/about')}`} href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
        <a className={`font-serif tracking-[0.15em] uppercase text-2xl transition-colors duration-300 ${isActive('/my-booking')}`} href="/my-booking" onClick={() => setIsMobileMenuOpen(false)}>My Booking</a>
        <a href="/book" className="bg-[#776E20] text-white px-10 py-4 mt-8 font-label-caps text-label-caps tracking-[0.2em]">
          RESERVE NOW
        </a>
      </div>
    </>
  );
};

export default NavBar;
