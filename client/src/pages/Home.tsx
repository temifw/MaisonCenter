import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="font-body-md text-on-background">
      <main>
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img alt="Hero Background" className="w-full h-full object-cover" data-alt="A majestic architectural view of a luxury hotel at sunset. The building features clean lines, tall arched windows, and a warm golden glow from internal lighting. The sky is a deep twilight blue with soft pink clouds, creating a peaceful and exclusive atmosphere that highlights the premium quality of The Maison Center's design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlPCZ_dHx_z_IcA0_xUATQrqZbtmZ_c_4XWDDF_AQS_h2A-fluOJPljwKb-JL4_TP34Mvid5SI833PHlogh5d4Z3JNTncTldlK5FZpUoGIHp8xJIv7wrIaZ5IILowvbpsqBrrBRlORpMkP03zEIC6c9Y_OmAc9TnM9yak3bfbquJl5DQBzulQDqYnFhwV1DRMKJjdNziHN07jhgVMOenMryIIbjOzWMNpdZGB1itNA4zYS-F_-bMCJ3SED9ZFlRlXGUHQAXXI3qA" />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
            <p className="font-label-caps text-[10px] md:text-label-caps tracking-[0.4em] mb-6 uppercase">Timeless Architectural Elegance</p>
            <h1 className="font-display-lg text-4xl md:text-display-lg max-w-4xl mb-8">Refined Living in the Heart of the City</h1>
            <div className="w-24 h-px bg-white/50 mb-8"></div>
          </div>
        </section>
        {/* About Section: Curated Excellence */}
        <section className="py-16 md:py-[120px] px-6 md:px-12 w-full bg-surface">
          <div className="grid grid-cols-12 gap-gutter items-center">
            <div className="col-span-12 lg:col-span-5 mb-12 lg:mb-0">
              <p className="font-label-caps text-label-caps tracking-[0.2em] text-[#776E20] mb-6 uppercase">Philosophy</p>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">Curated Excellence in Every Detail</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 leading-relaxed">
                The Maison Center is more than a destination; it is a meticulously crafted experience designed for those who appreciate the quiet luxury of space and the art of subtle service. Our architectural approach prioritizes light and flow, creating a sanctuary of calm.
              </p>
              <button className="border-b border-[#776E20] text-[#776E20] pb-2 font-label-caps text-label-caps tracking-[0.15em] hover:opacity-70 transition-opacity">
                READ OUR STORY
              </button>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <div className="relative aspect-[4/5] bg-surface-container overflow-hidden">
                <img alt="Interior Detail" className="w-full h-full object-cover" data-alt="Close-up detail of a minimalist hotel lobby with white marble floors and structured architectural pillars. Soft sunlight filters through large windows, creating dramatic shadows. The space is uncluttered, featuring only one high-end velvet armchair in a muted olive tone, emphasizing the brand's commitment to space as a functional luxury." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpP3Y5VEp3quQDfI6zyRuPluHutwwDdqSn-hLuaic3te_cabtTbJlNc1LNN4t_u1cOAvdN8yPsO4XzUGQ55nFj9W4zbale78ctzPMIF1nJr-o82S-hWNU9831VfFjRu8UdSIPsPT_mhEVfQw9rNAGfdkboCzxXHlhkW18ln2_DnqDpfVpeK_5LyWg9a0TWbpkSGcFb0uSs7zr1chseGoAhtz2J-xZgLHGtH0eNgwk8R3daSR0Ys1W8xzwinJqtFUw42p7-CGkOog" />
              </div>
            </div>
          </div>
        </section>
        {/* The Collections (Featured Rooms) - Bento Style */}
        <section className="py-16 md:py-[120px] bg-surface-bright border-y border-stone-200/50">
          <div className="w-full px-6 md:px-12">
            <div className="text-center mb-20">
              <p className="font-label-caps text-label-caps tracking-[0.2em] text-[#776E20] mb-4 uppercase">Accommodation</p>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">The Collections</h2>
            </div>
            <div className="grid grid-cols-12 gap-8 h-[800px]">
              {/* Large Feature Card */}
              <div className="col-span-12 md:col-span-8 relative group overflow-hidden">
                <img alt="The Grand Suite" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A spacious master suite at The Maison Center. The room features floor-to-ceiling windows overlooking a serene garden, a king-sized bed with crisp white linens, and custom dark oak furniture. The lighting is soft and ambient, highlighting the premium textures of silk and wool throughout the room's minimalist design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwYn-jfhZSWiOJ60me0PBuao1Wcbi-urmh3jks6aJYge1gQihK7I5xR-atMqGW5Dc4NqEIzaer9Kp5WksaqrIG35pALew_JDTj1mvqNyloaKINxqWAf8kU9RLvcQkjV91r0vSnGZP_uDEcfQNsDJrmLqR9dIOmDax6ogu2t5bXMHWjgxB9qnU5NGjiHAHoR6f34p6dttPtIr6X2-h4HoZg3ElJvaApHXGaJQSOwKmSS6PZGXjzX0cLnmS9thBbBS8ffCEt2fMHHQ" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12">
                  <span className="font-label-caps text-[10px] text-white/80 border border-white/40 w-fit px-3 py-1 mb-4">CITY VIEW • 120 SQM</span>
                  <h3 className="font-headline-md text-white mb-2">The Grand Suite</h3>
                  <p className="text-white/80 font-body-md mb-6 max-w-md">Our premier residence offering unparalleled comfort and architectural brilliance.</p>
                  <button className="bg-white text-stone-900 px-8 py-3 w-fit font-label-caps text-label-caps">VIEW SUITE</button>
                </div>
              </div>
              {/* Side Stack */}
              <div className="col-span-12 md:col-span-4 flex flex-col gap-8">
                <div className="flex-1 relative group overflow-hidden">
                  <img alt="Studio Loft" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A minimalist boutique hotel room showing a sleek writing desk by a window. The styling is architectural and quiet, using a palette of warm grays and natural wood. High-quality editorial photography highlights the negative space and the meticulous attention to detail in the room's curated furniture selection." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPjDsnrk9YD3pPnf4choqgRnN21MIPgzyXdH58b0WmWfaCN7YzSJmQBoitgkFtAa-lk64ADLHllQZBb8RPbyl_wE-wN9Kuc3YRqzFC82D61n7zK7x51wjz4K15u7kYkYlakDr0gHLmYHg-fgy3is-BVP-nKdCPQ6IFa_LeJbWhz_1F4Q6owS2EcfAlgCOXqARDMtRes2WbYAtGx3RBcAbF0E77qSEUMgiWYHOKg8QxVz9iJiWX06LjWs7j9UJjViWga59JaV1Aug" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute bottom-8 left-8">
                    <h3 className="font-headline-md text-white text-2xl">Studio Loft</h3>
                    <p className="font-label-caps text-white/70 mt-2">URBAN RETREAT</p>
                  </div>
                </div>
                <div className="flex-1 relative group overflow-hidden">
                  <img alt="Sky Residence" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Luxury hotel bathroom with a freestanding stone tub, gold fixtures, and marble walls. The lighting is bright and high-key, creating an atmosphere of immediate calm and exclusivity. This visual emphasizes the sanctuary-like quality of the amenities at The Maison Center." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEw2uf2KNbZ4Oc6eM37jbhhHWat-cJsk4j3viXCOEMXC943-Cfsd74UXDehqOopkmBtmHHHHt0-4YO332sbdjaLVBlHdVu_0TKtTprQoquSmjsCJNEM-_XqtH0nFLOaZvnUIvDYTUVFH38hUDRxjx0m95BmBKNwS0JvD029wTgrdqlHL1qQ2kx0u-tanoOHYI7e-DVe0oLscz_M6nVY9WJqwUpHpM5fEEDFwLRXfl4wTWyaNaKgNoDDlsPCMlMLKITaElzFoXWAw" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute bottom-8 left-8">
                    <h3 className="font-headline-md text-white text-2xl">Sky Residence</h3>
                    <p className="font-label-caps text-white/70 mt-2">PENTHOUSE LEVEL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* World-Class Amenities */}
        <section className="py-16 md:py-[120px] px-6 md:px-12 w-full bg-surface">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <p className="font-label-caps text-label-caps tracking-[0.2em] text-[#776E20] mb-4 uppercase">Curation</p>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">World-Class Amenities</h2>
            </div>
            <div className="hidden md:block">
              <a className="font-label-caps text-[#776E20] border-b border-[#776E20] pb-1" href="#">ALL SERVICES</a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Amenity 1 */}
            <div className="flex flex-col group">
              <div className="mb-8 overflow-hidden aspect-square bg-stone-100">
                <img alt="The Spa" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" data-alt="High-end spa interior at The Maison Center. A long, narrow infinity-edge indoor pool reflects minimalist architectural lighting. The scene is dominated by natural stone textures and a serene, quiet atmosphere that promises complete relaxation for guests." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWNQUeL6f-07rvfQkg1Mh3rgQ0gnR4WBUAhgIur2wJa0wT5JyKdM4x7HRh37QufWu3Q-MM4oxbZgnoic78_8SMr2s1cQ2l3uhIjxYNzPg7uKmUZ-Qu7W7cApaB3N6vAkRJTa4nTyZfdmnTYcbaOmFHReabM24AagMSkEUdU0iUO6Pk2S_UDm36Lw-Ber0Is562rVxMKGioUw62V0Evz8cCnLArZ1a3UQjJmN8RMFXth7iLN334ItmIZ675D1ts8K2FwpYjuMvp6g" />
              </div>
              <span className="material-symbols-outlined text-[#776E20] mb-4">spa</span>
              <h4 className="font-headline-md text-xl mb-4">The Holistic Spa</h4>
              <p className="font-body-md text-on-surface-variant text-sm">A sanctuary of wellness featuring treatments curated by world-renowned practitioners.</p>
            </div>
            {/* Amenity 2 */}
            <div className="flex flex-col group">
              <div className="mb-8 overflow-hidden aspect-square bg-stone-100">
                <img alt="The Bar" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" data-alt="The Maison Center signature cocktail bar. Dark walnut wood, soft amber lighting, and crystal glassware create a poised and architectural bar space. The design is timeless and editorial, focusing on high-quality materials and a sophisticated atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOkor8-T8bgmF1VOsMdKwyPoIgIZX4ZqCKLCwQOJwssazNvqcwqr9IRm6py7aYcFSGHtCLwiI-kGU71BchXJ58EPS28cDRCDL1_X5cL1Ci_eGH56rbAwSublbiESUf8l_wL1KETJUeTZC-AxNb1i7ewwK9lrDGwTooeK-QUdrm_2S7lwKWZKdhw9r6srJ7G2rBcNdFnIrEZj5QgBBGKiVzfvM495vOU407_CV-hlxwfQivPbsng9Kb2MZiKx1lKM7KC7FuKMB3qQ" />
              </div>
              <span className="material-symbols-outlined text-[#776E20] mb-4">local_bar</span>
              <h4 className="font-headline-md text-xl mb-4">L'Observatoire Bar</h4>
              <p className="font-body-md text-on-surface-variant text-sm">Crafted mixology served in an architectural setting overlooking the city skyline.</p>
            </div>
            {/* Amenity 3 */}
            <div className="flex flex-col group">
              <div className="mb-8 overflow-hidden aspect-square bg-stone-100">
                <img alt="Dining" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" data-alt="A private dining room at The Maison Center's flagship restaurant. The table is perfectly set with fine white linen, minimalist ceramics, and single stem flowers. Large architectural windows frame the view, creating an exclusive and meticulously detailed dining environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdFxxgxDpv2i6yTaesxtssLLqqVLxfIkVBLRv7_ILZDROrWOSRkz03mnFb_apFGwghZC9qNMIQDao8Dh5LbFc12Q0Qa_MPSSFLDc-R9Btr1xYn-Zymn9-DK9ILfdS6gChy8EC2UfatYHNVpC3ygggvjyhxN4iCOHRWyXQugB-kiwNHqKBM0C_rjK6RyEJrJhwWZk2RVad1E8fnsClh4sPw1GZVwo76bJp5gRdWWRUwPE3uYX3g5P1T5F9IoTBrAmqz1wFOfjep6Q" />
              </div>
              <span className="material-symbols-outlined text-[#776E20] mb-4">restaurant</span>
              <h4 className="font-headline-md text-xl mb-4">Culinaria Royale</h4>
              <p className="font-body-md text-on-surface-variant text-sm">Fine dining that celebrates seasonal ingredients with meticulous attention to detail.</p>
            </div>
            {/* Amenity 4 */}
            <div className="flex flex-col group">
              <div className="mb-8 overflow-hidden aspect-square bg-stone-100">
                <img alt="Fitness" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" data-alt="Modern fitness center with advanced equipment. The space features large windows and high ceilings, maintaining a bright and open feel. The design is clean and unobtrusive, allowing guests to focus on their wellness routine in a premium setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfAf0sVlJNUnq6f01WWCtRpAeFFXGGssFSMuS-1QZNiSC5dBJY3W9qgW7eOVrpMVIXDWFXwPzqPJekoayt0sdhUZaZY11xd_lX29rqgLHUPzjPv7JelGgbIWP_gtyJ9Gm_-WeUoMs2RLkJVDtbvvZBzpaZTHOPL2ntsQyDb3wUskIxX8yzOsIc6Dj19llNRIwaHs3orlWvHlBr9tQR9GE2hrDSMf6G_CGrk3ix4HnVwfAirl8AduFgoDLHfP1qHYFdkIybMjWv8w" />
              </div>
              <span className="material-symbols-outlined text-[#776E20] mb-4">fitness_center</span>
              <h4 className="font-headline-md text-xl mb-4">Precision Fitness</h4>
              <p className="font-body-md text-on-surface-variant text-sm">State-of-the-art equipment in a space designed to inspire movement and vitality.</p>
            </div>
          </div>
        </section>
        {/* Newsletter / Contact Teaser */}
        <section className="py-16 md:py-[120px] px-6 md:px-12 text-center bg-stone-900 text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline-lg text-headline-lg mb-8 italic">Stay Informed</h2>
            <p className="font-body-lg mb-12 text-white/60">Subscribe to receive exclusive offers and the latest news from The Maison Center.</p>
            <form className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-grow w-full border-b border-white/30 text-left">
                <label className="font-label-caps text-[10px] text-white/50 uppercase">Email Address</label>
                <input className="bg-transparent border-none w-full py-4 text-white placeholder:text-white/20 focus:ring-0" placeholder="your@email.com" type="email" />
              </div>
              <button className="bg-[#776E20] text-white px-12 py-4 font-label-caps text-label-caps tracking-[0.2em] whitespace-nowrap">SIGN UP</button>
            </form>
          </div>
        </section>
      </main>
    </div>
    </Layout>
  );
};

export default Home;
