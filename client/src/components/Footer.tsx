
const Footer = () => {
  return (
    <footer className="w-full py-16 md:py-20 px-6 md:px-12 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 w-full">
        <div className="text-xl md:text-lg font-serif text-stone-800 dark:text-stone-200 uppercase tracking-widest text-center md:text-left">
          THE MAISON CENTER
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
          <a className="font-serif tracking-widest text-xs uppercase text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors" href="#">Privacy Policy</a>
          <a className="font-serif tracking-widest text-xs uppercase text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors" href="#">Terms of Service</a>
          <a className="font-serif tracking-widest text-xs uppercase text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors" href="#">Contact</a>
          <a className="font-serif tracking-widest text-xs uppercase text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors" href="#">Careers</a>
          <a className="font-serif tracking-widest text-xs uppercase text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors" href="#">Sustainability</a>
        </div>
        <div className="font-serif tracking-widest text-xs uppercase text-stone-500 text-center">
          © {new Date().getFullYear()} THE MAISON CENTER. CURATED EXCELLENCE.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
