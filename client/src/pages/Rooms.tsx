import Layout from '../components/Layout';

const Rooms = () => {
  return (
    <Layout>
      <div className="font-body-md text-on-surface">
      {/* Page Header */}
      <header className="pt-32 md:pt-48 pb-16 md:pb-24 px-6 md:px-12 w-full text-center">
        <span className="font-label-caps text-[#776E20] mb-4 block">EXCEPTIONAL LIVING</span>
        <h1 className="font-display-lg text-4xl md:text-display-lg text-stone-900 mb-6">Our Accommodations</h1>
        <p className="max-w-2xl mx-auto text-stone-500 font-body-lg">A curated collection of sanctuaries designed for the discerning traveler. Each space is a masterclass in architectural serenity and bespoke comfort.</p>
      </header>
      {/* Rooms Grid */}
      <main className="px-6 md:px-12 pb-16 md:pb-32 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-20">
          {/* Room Tier: Deluxe Suite */}
          <div className="group">
            <div className="aspect-[4/5] overflow-hidden bg-stone-100 mb-8 border border-stone-200/20">
              <img className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" data-alt="A luxurious hotel suite with a minimalist design, featuring high ceilings and large windows that allow soft natural light to pour in. The room is decorated in a palette of warm neutrals and soft gold accents, consistent with The Maison Center's elegant brand. High-quality linen bedding sits atop a master-crafted bed frame, set against a backdrop of clean, white architectural lines." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx7gxljiATUe-J2EDydoLQTCpz4TuUz_RMycNE-9Swea7saZjwGBCEDMaAfQ5IlnqfqB_31UOI0VDHvmsssW_1G9BsbBbne7u4CdHJM0Q8J_OphHFLbqxNoBxjiDdtFmP-bCAMONxL8__XGe0JZx7YUMDwmL8j71At9fitUXQhVSmZQqgQaWziDY8b9CN4GXtI9Gir3taYBYIHd02Cmw0HkXPzDjMTD3rbJBXQl9CChOyNsDE_2Cg6oqu5xjBW23DsapVqlyOXGA" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="font-label-caps text-[#776E20] text-[10px] mb-2 block">TIER I</span>
                <h2 className="font-headline-md text-stone-900">Deluxe Suite</h2>
              </div>
              <div className="text-right">
                <span className="font-label-caps text-stone-400 block mb-1">FROM</span>
                <span className="font-headline-md text-stone-900">$550</span>
              </div>
            </div>
            <div className="flex gap-4 mb-6">
              <span className="px-3 py-1 border border-stone-200 font-label-caps text-[10px] text-stone-500">45 SQM</span>
              <span className="px-3 py-1 border border-stone-200 font-label-caps text-[10px] text-stone-500">CITY VIEW</span>
              <span className="px-3 py-1 border border-stone-200 font-label-caps text-[10px] text-stone-500">KING BED</span>
            </div>
            <a href="/details" className="block text-center w-full py-4 border border-stone-900 font-label-caps tracking-widest text-stone-900 hover:bg-stone-900 hover:text-white transition-colors duration-300 uppercase">
              View Details
            </a>
          </div>
          {/* Room Tier: Presidential Suite */}
          <div className="group">
            <div className="aspect-[4/5] overflow-hidden bg-stone-100 mb-8 border border-stone-200/20">
              <img className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" data-alt="The Presidential Suite at The Maison Center, showcasing a vast, open-plan living area with premium marble flooring and floor-to-ceiling glass walls. The lighting is low and atmospheric, emphasizing the deep gold and rich stone color palette of the brand. Sculptural modern furniture is arranged to overlook a panoramic landscape, embodying a mood of quiet luxury and architectural brilliance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDftS1Q4pXA1UpacbNmHNS1jsom8UOFbb1J6bj2O4MaKbRMEJNtWqkJvh2um0BkVdKfSY4UJ0Ud3712QdIad8obGGhNBj-prEDJyuR5YJg9gBBRc3saz4BcBSOVkk8QP-kCxgklf-gt0X5E7TogYsO2xkVKsH8ZONuIbC_AUZ9_tkJgitTV858vZlH808zK8YyKgVIWMF1rTo5PSGnpqI1HBtFcUd4nkuET_65dONADO7zjTLrBcXPdiEulfEnGHm4AuGfZ7NOxQQ" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="font-label-caps text-[#776E20] text-[10px] mb-2 block">TIER III</span>
                <h2 className="font-headline-md text-stone-900">Presidential Suite</h2>
              </div>
              <div className="text-right">
                <span className="font-label-caps text-stone-400 block mb-1">FROM</span>
                <span className="font-headline-md text-stone-900">$1,850</span>
              </div>
            </div>
            <div className="flex gap-4 mb-6">
              <span className="px-3 py-1 border border-stone-200 font-label-caps text-[10px] text-stone-500">120 SQM</span>
              <span className="px-3 py-1 border border-stone-200 font-label-caps text-[10px] text-stone-500">PANORAMIC VIEW</span>
              <span className="px-3 py-1 border border-stone-200 font-label-caps text-[10px] text-stone-500">PRIVATE LOUNGE</span>
            </div>
            <a href="/details" className="block text-center w-full py-4 border border-stone-900 font-label-caps tracking-widest text-stone-900 hover:bg-stone-900 hover:text-white transition-colors duration-300 uppercase">
              View Details
            </a>
          </div>
          {/* Room Tier: Garden Villa */}
          <div className="group md:col-span-2">
            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-3 aspect-video overflow-hidden bg-stone-100 border border-stone-200/20">
                <img className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" data-alt="A secluded garden villa surrounded by lush, minimalist landscaping, featuring a private limestone terrace and a shallow reflecting pool. The architectural style is modern and geometric, utilizing a high-key lighting approach that makes the white walls and soft golden light fixtures pop. The atmosphere is extremely private and serene, reflecting the premium hospitality experience at The Maison Center." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg6iKUJHq8dR7ay4x8P2g2mBZ0ET8kuyX540QGjMH_H4ZM_gE5kMThDevz44M3o-0CKJksy3eOhS1HccMOFvBDQfHU7300otLvIr0q6P9QmHYBzeC7IQQAnzn2Q7nIIlZz78bo6S6-_jP2xWtBCZ5Z3o3Isps18U4IF_DBmz3qT10J78j1Unp87OpixYBBngHI16K-8QBKmB0BeFmppwKjen3J3xlyFX14JFfmp_vTuBWOr1i7L3_Z2oBXo2VN0vH46etiuUG6dg" />
              </div>
              <div className="md:col-span-2 pr-12">
                <span className="font-label-caps text-[#776E20] text-[10px] mb-4 block">EXCLUSIVE RETREAT</span>
                <h2 className="font-display-lg text-stone-900 mb-6 text-4xl">Garden Villa</h2>
                <p className="font-body-md text-stone-500 mb-8 leading-relaxed">Experience ultimate seclusion within our signature garden villas. Featuring private access, outdoor rainfall showers, and a bespoke concierge service tailored to your personal rhythm.</p>
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-stone-200">
                  <span className="font-label-caps text-stone-400">NIGHTLY RATE</span>
                  <span className="font-headline-md text-stone-900 text-3xl">$2,400</span>
                </div>
                <a href="/details" className="block text-center w-full py-5 bg-stone-900 text-white font-label-caps tracking-[0.2em] uppercase hover:bg-[#776e20] transition-colors duration-300">
                  View Villa Experience
                </a>
              </div>
            </div>
          </div>
          {/* Room Tier: Executive Studio */}
          <div className="group">
            <div className="aspect-[4/5] overflow-hidden bg-stone-100 mb-8 border border-stone-200/20">
              <img className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" data-alt="A sleek executive studio apartment designed with modern minimalism in mind, featuring custom-built oak furniture and integrated smart technology. The color scheme is a sophisticated blend of grey, beige, and the brand's signature gold tones. Soft, diffused lighting highlights the clean surfaces and high-end textures of the interior, creating an atmosphere of quiet productivity and high-end luxury." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZyvpP6d89eBFJfCzdBn7sqOpoZeUFNzluyXjS4tzNfnFK-4MV_5YoD6lMDB3dBR_Vq-hIBzQd5iEr2wLlwDygB_AJoE-_0JL3QO91DFBzFtiyDXFFLWZsi-jZoPjWkyR7YuOTpW5B9tVj9YSaDX-gqOLdi5EfmjK9yM_x7bcUkVpOAmQsKjyZPomfEUS4Ik6ag_36yOrNM0_KkYesKxh2ls8xQm0K_BmbnNSKsctOLBxsAnFWfI9MpphODh-R6VNGgqt2uvh6VQ" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="font-label-caps text-[#776E20] text-[10px] mb-2 block">TIER I</span>
                <h2 className="font-headline-md text-stone-900">Executive Studio</h2>
              </div>
              <div className="text-right">
                <span className="font-label-caps text-stone-400 block mb-1">FROM</span>
                <span className="font-headline-md text-stone-900">$425</span>
              </div>
            </div>
            <div className="flex gap-4 mb-6">
              <span className="px-3 py-1 border border-stone-200 font-label-caps text-[10px] text-stone-500">38 SQM</span>
              <span className="px-3 py-1 border border-stone-200 font-label-caps text-[10px] text-stone-500">INNER COURTYARD</span>
              <span className="px-3 py-1 border border-stone-200 font-label-caps text-[10px] text-stone-500">QUEEN BED</span>
            </div>
            <a href="/details" className="block text-center w-full py-4 border border-stone-900 font-label-caps tracking-widest text-stone-900 hover:bg-stone-900 hover:text-white transition-colors duration-300 uppercase">
              View Details
            </a>
          </div>
          {/* Room Tier: Terrace Suite */}
          <div className="group">
            <div className="aspect-[4/5] overflow-hidden bg-stone-100 mb-8 border border-stone-200/20">
              <img className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" data-alt="A terrace suite at dawn, showing a wide private balcony with minimalist outdoor furniture overlooking a quiet urban garden. The interior of the suite is visible through large sliding glass doors, displaying a harmonious mix of natural stone and high-quality wood. The lighting is cool and serene, transitioning into the warm, golden glow from the suite's interior lighting, perfectly capturing a moment of exclusive tranquility." src="https://lh3.googleusercontent.com/aida-public/AB6AXuASQZ5vhUsjUhh8EwqmZNKIhfFr9J-qFvQh-XbK5t_P1bn2sPhHCFKmcdIjo1CJ_ifRfLibxRBHrSSZ8k879PaPM7Fyck1ijmOKVBW2LeAws4_Y0LPAVQT8sueoGUabUaXaPNmK6Y56Y5qnaYBcl4mX0CYnJ5sEIVsgdJyg-Cy5aH5wDgtU6V-HbdMu4IandiF-B2-nUodAWWbnVZsf9810zGZhU0r6_7xt8VB3i52Lc49VRAKuI5pW0Al-YkVeonPHVwKnTyNzJA" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="font-label-caps text-[#776E20] text-[10px] mb-2 block">TIER II</span>
                <h2 className="font-headline-md text-stone-900">Terrace Suite</h2>
              </div>
              <div className="text-right">
                <span className="font-label-caps text-stone-400 block mb-1">FROM</span>
                <span className="font-headline-md text-stone-900">$890</span>
              </div>
            </div>
            <div className="flex gap-4 mb-6">
              <span className="px-3 py-1 border border-stone-200 font-label-caps text-[10px] text-stone-500">65 SQM</span>
              <span className="px-3 py-1 border border-stone-200 font-label-caps text-[10px] text-stone-500">PRIVATE TERRACE</span>
              <span className="px-3 py-1 border border-stone-200 font-label-caps text-[10px] text-stone-500">SPA BATH</span>
            </div>
            <a href="/details" className="block text-center w-full py-4 border border-stone-900 font-label-caps tracking-widest text-stone-900 hover:bg-stone-900 hover:text-white transition-colors duration-300 uppercase">
              View Details
            </a>
          </div>
        </div>
      </main>
      {/* Compare Section (Bento Style) */}
      <section className="bg-stone-50 py-16 md:py-32 px-6 md:px-12 border-t border-stone-200">
        <div className="w-full">
          <div className="mb-16">
            <span className="font-label-caps text-[#776E20] mb-4 block">AT A GLANCE</span>
            <h2 className="font-headline-lg text-stone-900">Compare Amenities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 bg-white p-12 border border-stone-200/60">
              <span className="material-symbols-outlined text-4xl text-[#776E20] mb-6">concierge</span>
              <h3 className="font-headline-md mb-4">Concierge Excellence</h3>
              <p className="text-stone-500 font-body-md">24/7 dedicated service for all suite tiers, including private travel arrangements and dining reservations.</p>
            </div>
            <div className="bg-white p-12 border border-stone-200/60">
              <span className="material-symbols-outlined text-4xl text-[#776E20] mb-6">wifi</span>
              <h3 className="font-label-caps text-stone-900 mb-4">FIBER WEB</h3>
              <p className="text-stone-500 text-xs uppercase tracking-widest">Global standard connectivity across the entire center.</p>
            </div>
            <div className="bg-white p-12 border border-stone-200/60">
              <span className="material-symbols-outlined text-4xl text-[#776E20] mb-6">local_bar</span>
              <h3 className="font-label-caps text-stone-900 mb-4">MINI BAR</h3>
              <p className="text-stone-500 text-xs uppercase tracking-widest">Curated local spirits and artisan snacks included.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default Rooms;
