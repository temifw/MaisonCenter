import { useEffect, useRef } from 'react';
import Layout from '../components/Layout';
const RoomDetails = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach(el => {
      if (el) {
        el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-8');
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <Layout>
      <div className="font-body-md text-on-surface">
      {/* Hero Section */}
      <header className="relative h-screen w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" data-alt="A grand luxury hotel suite with floor-to-ceiling windows overlooking a twilight city skyline. The interior features mid-century modern furniture, soft velvet textures in olive and sand tones, and architectural cove lighting. The aesthetic is extremely minimalist and clean, capturing a sense of quiet luxury and editorial architectural photography style with high contrast and soft morning light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTLDo8YG1A0vhUM2GBzH9WEzBztn4ySIH5VhpKVaTw15rzzE7ObSytIWsRpg8qYBBedMFNfNzm3iwCkopE_EQwtDbeIU3rZl1Rsj2n1aPh5g9vGiOkqdSRz-RUVH5C5FY-y9Qnv7mQesUMJbJ_Ssb_Z_TAAhZsIPgFW8DhXvC1i1K2vSOWzbXDCPCgHjnSQNpoghmY36ak7fwQkCQvXAw6HYEq2edII2QCDuaJ8_zKGl6qUzIuBdwePbuV_0nnnkwfUIUGAOFtXQ" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
        <div ref={addToRefs} className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-24">
          <span className="font-label-caps text-white mb-4 block">LEVEL 42 — PREMIER COLLECTION</span>
          <h1 className="font-display-lg text-4xl md:text-display-lg text-white max-w-2xl">Deluxe Suite</h1>
        </div>
      </header>
      {/* Design Philosophy Narrative */}
      <section className="py-16 md:py-section-gap px-6 md:px-12 w-full">
        <div ref={addToRefs} className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <h2 className="font-headline-lg text-primary-container mb-8">Quiet Luxury, Defined.</h2>
            <p className="font-body-lg text-tertiary mb-6">
              The Deluxe Suite is an architectural dialogue between soft textures and rigid geometry. Designed by the Atelier Maison, every corner of this 45-square-meter sanctuary serves as a testament to the beauty of restraint.
            </p>
            <p className="font-body-md text-tertiary/80 leading-relaxed">
              We believe that luxury isn't found in excess, but in the meticulous selection of materials. Italian marble, hand-woven linens, and warm oak floors create a sensory experience that grounds you amidst the bustling city skyline visible through the expansive glass walls.
            </p>
          </div>
          <div className="col-span-12 md:col-start-7 md:col-span-6 flex items-center">
            <img className="w-full aspect-[4/5] object-cover grayscale-[30%]" data-alt="Detailed shot of a minimalist reading corner in a luxury suite. A charcoal grey velvet lounge chair sits next to a small brass side table holding a single art book. The background shows a sheer white linen curtain diffusing soft natural daylight, emphasizing high-end textures and a serene, quiet luxury atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWxeSWewFIJYw8F2blc-8W_86OmXJy3TD7ypcooS2wU7sd47QzSeUweaNVbKz4ezOniEmM70FPChO5F1QU2GFYxzymQyg_fIu1vLg4TIXNUWCfIKPXced4ifr00EIgo74OGDQGktAh1C-WQQPt1JuvYx1E4qqXlYZ25FnX2Eqwk4SvjHpBKYtvgeJ04K8sz2NJzwMg9KxjCdJZwvHxU-t_3wAOz8gYN33SbhhB9R9JQUnbyCYGTqnMHSF2GfjmK5MKzS79fbO3mg" />
          </div>
        </div>
      </section>
      {/* Specifications Bar */}
      <section className="bg-surface-container-low border-y border-outline-variant/30 py-12 px-6 md:px-12">
        <div ref={addToRefs} className="w-full flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col">
            <span className="font-label-caps text-outline mb-2">SIZE</span>
            <span className="font-headline-md text-on-surface">45 SQM</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-outline mb-2">VIEW</span>
            <span className="font-headline-md text-on-surface">City Skyline</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-outline mb-2">BED</span>
            <span className="font-headline-md text-on-surface">King Size</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-outline mb-2">OCCUPANCY</span>
            <span className="font-headline-md text-on-surface">2 Adults</span>
          </div>
        </div>
      </section>
      {/* Amenities & Features Grid */}
      <section className="py-16 md:py-section-gap px-6 md:px-12 w-full">
        <h3 className="font-label-caps text-primary-container mb-12 text-center">CURATED AMENITIES</h3>
        <div ref={addToRefs} className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
          <div className="flex flex-col items-center text-center group">
            <span className="material-symbols-outlined text-4xl mb-4 text-primary-container font-light" data-icon="bathtub">bathtub</span>
            <span className="font-label-caps text-on-surface">Marble Bathroom</span>
            <p className="text-xs text-tertiary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Featuring heated floors and rainfall shower.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <span className="material-symbols-outlined text-4xl mb-4 text-primary-container font-light" data-icon="nest_remote_comfort_sensor">nest_remote_comfort_sensor</span>
            <span className="font-label-caps text-on-surface">Smart Controls</span>
            <p className="text-xs text-tertiary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Intuitive tablet for lighting, climate, and TV.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <span className="material-symbols-outlined text-4xl mb-4 text-primary-container font-light" data-icon="coffee_maker">coffee_maker</span>
            <span className="font-label-caps text-on-surface">Nespresso Selection</span>
            <p className="text-xs text-tertiary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Curated coffee and artisanal tea blends.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <span className="material-symbols-outlined text-4xl mb-4 text-primary-container font-light" data-icon="night_shelter">night_shelter</span>
            <span className="font-label-caps text-on-surface">Nightly Turndown</span>
            <p className="text-xs text-tertiary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Signature pillow menu and evening ritual.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <span className="material-symbols-outlined text-4xl mb-4 text-primary-container font-light" data-icon="wifi">wifi</span>
            <span className="font-label-caps text-on-surface">Ultra-Fast Wi-Fi</span>
            <p className="text-xs text-tertiary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Dedicated high-speed connectivity for all devices.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <span className="material-symbols-outlined text-4xl mb-4 text-primary-container font-light" data-icon="wine_bar">wine_bar</span>
            <span className="font-label-caps text-on-surface">Private Bar</span>
            <p className="text-xs text-tertiary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Locally sourced snacks and premium spirits.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <span className="material-symbols-outlined text-4xl mb-4 text-primary-container font-light" data-icon="checkroom">checkroom</span>
            <span className="font-label-caps text-on-surface">Walk-in Closet</span>
            <p className="text-xs text-tertiary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Bespoke storage with aromatic cedar hangers.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <span className="material-symbols-outlined text-4xl mb-4 text-primary-container font-light" data-icon="spa">spa</span>
            <span className="font-label-caps text-on-surface">Le Labo Toiletries</span>
            <p className="text-xs text-tertiary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Custom Santal 33 bathroom amenities.</p>
          </div>
        </div>
      </section>
      {/* Secondary Gallery */}
      <section className="pb-16 md:pb-section-gap px-6 md:px-12 w-full">
        <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 overflow-hidden">
            <img className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700" data-alt="Wide shot looking out from a high-rise hotel suite window at a sprawling metropolitan city during blue hour. The lights of the skyscrapers twinkle below, framed by the dark, sleek window frames of the suite. The interior reflect slightly on the glass, showing a hint of a premium leather armchair." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtmikUoyDLKMr_u5rYBSpHoohcs_Qr6TZKz2S-dqv1OW91POlipo9geNuPpHaM2nbrCBpQdfseYAYxdn_-nGZmzBgOxAPqZW60Y9bz3noV2SwTHs4a-Fyv1WAagveNlZ0Aynd-Mo5bCtA6-vYVcsz6ZzxweNoepoh-dVMVUITZ4qyZ6s0YKopcjiQK5hZVvdsx7atHNpOXIDA2VyGXzKlqasGV1K5rD8eIQ_NpHm9_DyJJQqldOBjP3weMiA0APEnVVTP7NTMnYg" />
          </div>
          <div className="overflow-hidden">
            <img className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700" data-alt="An ultra-modern bathroom with white Carrara marble walls and a freestanding sculptural bathtub. The lighting is soft and recessed, creating a spa-like mood. Minimalist chrome fixtures and a single green eucalyptus branch in a glass vase provide clean, high-end visual accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuSr2jQuZ6x8nybpHkmywPUA9hKf_spT35bMNtu4L3WrHU2r7DF41ghYoVgjUFpphECBzzqLxo2OWu10dDVWUL3vxlRd87Oy1bTyBoEobHrFYsgPQX8xApHHvvQ7MCxglRJUsE562RMgvOc9fCwr5Y8LurLeKPe2lFmypGipPgzK2YFgx1hhEZmvJRGPel3TPsxanzVitiLFyvdRDXW7THlz-TlR245bUmwjoOrBWmmjnqxJtXJld-bCUvtZ7AJ7wZwAMS9KggyA" />
          </div>
        </div>
      </section>
      {/* Booking Widget Section */}
      <section className="py-16 md:py-24 bg-white px-6 md:px-12 border-t border-stone-100">
        <div ref={addToRefs} className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline-lg mb-12">Experience the Art of Living.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-outline-variant bg-surface">
            <div className="flex flex-col p-4 border-b md:border-b-0 md:border-r border-outline-variant text-left">
              <span className="font-label-caps text-tertiary">CHECK IN</span>
              <input className="bg-transparent border-none p-0 focus:ring-0 font-serif text-lg placeholder:text-stone-300" placeholder="Select Date" type="text" />
            </div>
            <div className="flex flex-col p-4 border-b md:border-b-0 md:border-r border-outline-variant text-left">
              <span className="font-label-caps text-tertiary">GUESTS</span>
              <select defaultValue="2 Adults" className="bg-transparent border-none p-0 focus:ring-0 font-serif text-lg appearance-none cursor-pointer">
                <option>1 Adult</option>
                <option>2 Adults</option>
              </select>
            </div>
            <div className="flex items-center justify-center p-4">
              <button className="w-full bg-primary-container text-white py-4 font-label-caps hover:brightness-110 transition-all tracking-[0.2em]">CHECK AVAILABILITY</button>
            </div>
          </div>
          <p className="mt-8 font-label-caps text-tertiary/60 italic">Best rate guaranteed for direct bookings.</p>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default RoomDetails;
