import React from 'react';

const RoomManagement: React.FC = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col z-50 bg-white dark:bg-slate-950 text-[#102A43] dark:text-slate-100 font-manrope text-sm font-medium w-64 border-r border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="px-6 py-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>bed</span>
            </div>
            <div>
              <h1 className="font-extrabold tracking-tight text-[#102A43] dark:text-white text-lg">LuxStay Management</h1>
              <p className="text-xs text-slate-500">Corporate Admin</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 mt-6">
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </a>
          <a className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-4 border-blue-700 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/rooms">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bed</span>
            Room Management
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/calendar">
            <span className="material-symbols-outlined">calendar_month</span>
            Booking Calendar
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/guests">
            <span className="material-symbols-outlined">group</span>
            Guest Directory
          </a>
        </nav>
        <div className="mt-auto border-t border-slate-200 dark:border-slate-800 pb-8">
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="#support">
            <span className="material-symbols-outlined">contact_support</span>
            Support
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/sign-in">
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </a>
        </div>
      </aside>
      
      {/* TopNavBar */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-2 w-full ml-64 bg-white dark:bg-slate-950 text-[#102A43] dark:text-slate-100 font-manrope antialiased docked border-b border-slate-200 dark:border-slate-800 shadow-sm" style={{ width: 'calc(100% - 16rem)' }}>
        <div className="flex items-center gap-8 flex-1">
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-700 outline-none" placeholder="Search rooms or guests..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-slate-500">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-slate-500">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-slate-500">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right">
              <p className="text-sm font-bold text-[#102A43] dark:text-white">Admin User</p>
              <p className="text-xs text-slate-500">General Manager</p>
            </div>
            <img alt="Administrator Profile Avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" data-alt="A professional headshot of a middle-aged male administrator with a confident and friendly expression. He is wearing a crisp white dress shirt and a navy blue blazer. The background is a blurred high-end hotel lobby with soft, warm golden lighting and marble textures, maintaining a corporate and modern light-mode aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYdWo4d5f5vGvZTFYehIG2no8w1qeLFjBECV16BjTRGoY5jBRgDXEQad8--hbdib9wDe8mZBGEMQ88J-LPM8duxd0ZdlGc___EGOzpDD2VeOh7VTjAh_SDFvQAb2dl0iPDR5rpnduvqHj8iNb2ptGnFLEcu2W2_-kwhBxEfo_e01K9csp357F_DiJTOvY_EhHfzM9AHLIhpcN5Wz-qJO9rVgLG1d2V7gG5r5xe7YhSP_y5wNCxGgJQNEGVNMSmtVD8gHIc2YLBgiA" />
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 p-margin min-h-screen">
        <div className="w-full">
          {/* Page Header */}
          <div className="flex justify-between items-end mb-xl">
            <div>
              <h2 className="font-h2 text-h2 text-on-surface tracking-tight mb-1">Room Management</h2>
              <p className="font-body-md text-body-md text-secondary">Manage room status, floor assignments, and guest allocation across 4 floors.</p>
            </div>
            <a className="bg-primary-container text-white px-lg py-sm rounded-lg font-label-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm" href="/new-room">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add Room
            </a>
          </div>

          {/* Filters & Stats Bento Row */}
          <div className="grid grid-cols-12 gap-gutter mb-xl">
            {/* Status Filter Chips */}
            <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-lg rounded-xl shadow-[rgba(16,42,67,0.08)_0px_4px_12px] flex items-center gap-gutter">
              <div className="flex-1">
                <label className="block font-label-bold text-on-surface-variant mb-2">FILTER BY STATUS</label>
                <div className="flex flex-wrap gap-sm">
                  <button className="px-md py-xs rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-data-tabular text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-700"></div> All Rooms (48)
                  </button>
                  <button className="px-md py-xs rounded-full bg-green-50 text-green-700 border border-green-100 font-data-tabular text-sm flex items-center gap-2 hover:bg-green-100 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-green-600"></div> Available (12)
                  </button>
                  <button className="px-md py-xs rounded-full bg-orange-50 text-orange-700 border border-orange-100 font-data-tabular text-sm flex items-center gap-2 hover:bg-orange-100 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-orange-600"></div> Occupied (28)
                  </button>
                  <button className="px-md py-xs rounded-full bg-red-50 text-red-700 border border-red-100 font-data-tabular text-sm flex items-center gap-2 hover:bg-red-100 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-red-600"></div> Dirty (5)
                  </button>
                  <button className="px-md py-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-data-tabular text-sm flex items-center gap-2 hover:bg-slate-200 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-slate-600"></div> Maintenance (3)
                  </button>
                </div>
              </div>
              <div className="w-[1px] h-12 bg-slate-200"></div>
              <div className="px-lg">
                <label className="block font-label-bold text-on-surface-variant mb-2">FLOOR</label>
                <select className="border-outline-variant bg-surface-container-low rounded-lg text-body-md px-md py-sm focus:ring-blue-700 outline-none w-40">
                  <option>All Floors</option>
                  <option>Floor 1</option>
                  <option>Floor 2</option>
                  <option>Floor 3</option>
                  <option>Floor 4</option>
                </select>
              </div>
            </div>

            {/* Occupancy Quick Stats */}
            <div className="col-span-12 lg:col-span-4 bg-primary-container text-white p-lg rounded-xl shadow-[rgba(16,42,67,0.08)_0px_4px_12px] flex items-center justify-between">
              <div>
                <p className="text-on-primary-container font-label-bold">CURRENT OCCUPANCY</p>
                <h3 className="text-[32px] font-bold mt-1">78.5%</h3>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-on-primary-container border-t-white flex items-center justify-center">
                <span className="text-xs font-bold">28/48</span>
              </div>
            </div>
          </div>

          {/* Room Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {/* Room Card 1 (Suite - Occupied) */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow group overflow-hidden flex flex-col border border-slate-100">
              <div className="relative h-40 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="A luxurious hotel suite with a king-sized bed featuring high-thread-count white linens. The room has floor-to-ceiling windows showing a modern city skyline at dusk. The interior is decorated with contemporary walnut furniture and soft ambient lighting, creating a calm, high-end atmosphere consistent with a luxury hospitality brand." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTrciJ1OY2chBssQiCMODIcmBpAD9gRwTwvVPNRjd9zA-TzsSPU5Hq3FwQK_oeaMUY0woeMxshlkeRJW6GdCLtDh4IFnL4bG7HI1AFzNC4cLkwu9Vl-gyeSEhevA0ezpbU1PdnTR-Kl_tcDpVdTCa_mUzuJDJ9styVLh9We-fknq_RSXNGjU-zwuuSemPsPXiQTqGmrCXdb458ogPMjM395F7cACPcx55kCDUSp47TipIybTxNckuFZbELj-sjC6UJlpWJy4h9Owc" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-sm py-1 rounded shadow-sm">
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">Floor 4</span>
                </div>
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-md py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                  Occupied
                </div>
              </div>
              <div className="p-lg flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-h3 font-h3 text-on-surface">Suite 401</h3>
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
                <p className="text-body-sm text-secondary mb-md">Executive King Suite • Ocean View</p>
                <div className="mt-auto pt-md border-t border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">group</span>
                    <span className="text-data-tabular">2 Guests</span>
                  </div>
                  <a className="text-xs font-bold text-blue-700 hover:underline cursor-pointer" href="/room-detail">View Details</a>
                </div>
              </div>
            </div>

            {/* Room Card 2 (Deluxe - Available) */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow group overflow-hidden flex flex-col border border-slate-100">
              <div className="relative h-40 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="A spacious deluxe hotel room with two queen beds, minimalist grey headboards, and accent pillows in deep blue. The room is bright with natural daylight, featuring light oak flooring and modern abstract art on the walls. The aesthetic is clean, professional, and welcoming, embodying modern corporate travel standards." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcYbseUJh_4mhE6skEYSdAkkyzG_4O_Q_bcOs-fSw5si6pBxOr9_tBNTU0tlfkmG0fiQRhXCnCrc8WfYdTh3ZhF1YPF4tbLXsaFa7S8I9fc3pww1B3sXirmr7jyuGbIJWgQ72zmTKqP2cwQVqpJZHbyTdsV4s8Z3nsIqktgcyK0V5A0trRsAIiBcTenTbpzj1OiXTmcKFhdxVIkOnsPgOB6FLuNDR7GCGgpEoIBCxf3ieSudj8Y62KHxDxLUj3fTBhbhCZylG94GQ" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-sm py-1 rounded shadow-sm">
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">Floor 2</span>
                </div>
                <div className="absolute top-3 right-3 bg-green-600 text-white px-md py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Available
                </div>
              </div>
              <div className="p-lg flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-h3 font-h3 text-on-surface">Deluxe 212</h3>
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
                <p className="text-body-sm text-secondary mb-md">Deluxe Twin Room • Garden View</p>
                <div className="mt-auto pt-md border-t border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">cleaning_services</span>
                    <span className="text-data-tabular">Ready</span>
                  </div>
                  <button className="bg-primary-container text-white px-md py-1 rounded text-xs font-bold hover:opacity-90">Assign</button>
                </div>
              </div>
            </div>

            {/* Room Card 3 (Standard - Dirty) */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow group overflow-hidden flex flex-col border border-slate-100">
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/40 z-10"></div>
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="A cozy standard hotel room seen from the doorway after checkout. The bedding is slightly ruffled, and light filters through partially closed curtains. The room features a warm color palette of beiges and browns with dark wood accents. The mood is transitionary, awaiting service, within a professionally managed property setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH5Bq8z3KJ9VBgHjdUU941blLt7Cj4RQvFxX5Gf02hRmDU-wpK2uElmGjkCcwSxLJJ6ZYNlFQZk5UuhlKJAFJk5WAM8nKOMFhWeSfYwUBOj2YVtLz4OQRe7mi7eREZENSWcKd20OMdq9B5kGxAV7ENKQfl7Fb9agpLLF4RedYwnhqIsIGPzgTLWBb-yYBERL1J3_x62i06fIsCELZZknHW40mp8-scskYBMpqNZud9iRPzMnOdKRkQYcXDHuh6oNiG1FQrxd6Zyao" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-sm py-1 rounded shadow-sm z-20">
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">Floor 1</span>
                </div>
                <div className="absolute top-3 right-3 bg-red-600 text-white px-md py-1 rounded-full text-xs font-bold flex items-center gap-1 z-20">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>mop</span>
                  Dirty
                </div>
              </div>
              <div className="p-lg flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-h3 font-h3 text-on-surface">Room 105</h3>
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
                <p className="text-body-sm text-secondary mb-md">Standard Single • Courtyard</p>
                <div className="mt-auto pt-md border-t border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-red-600 font-bold">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    <span className="text-xs uppercase">Needs Service</span>
                  </div>
                  <span className="text-xs font-bold text-blue-700 hover:underline cursor-pointer">Notify Staff</span>
                </div>
              </div>
            </div>

            {/* Room Card 4 (Deluxe - Maintenance) */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow group overflow-hidden flex flex-col border border-slate-100">
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/60 z-10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-4xl">build</span>
                </div>
                <img className="w-full h-full object-cover" data-alt="A modern hotel corridor with architectural lighting and sleek doors. The perspective focuses on a specific room door where a professional maintenance sign is hung. The lighting is low and dramatic, with cool blue and warm orange contrasts, suggesting a high-end commercial property under professional upkeep." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSZ0yDWd583OAT_HUnotIHeH6APxIczU1XnpiooGm-aqsvskJNZZErbGzgeHMxAiWRdj7iB-yCxDKq6GHL0hN1APwpOjoRm6uzVV6mnlpqzl0zAYoKh0D0wf63BrJKFDSdu0og-uq9zJdXuU-SnJ3ASJr-e2M4iW_sstlypK2My0jX6JBFkUi2HVQzEb84F_KpmD4ZIJxBohh05VfLMoUPabBQDd3DiVJGOljYFiiTdlqQksMPO9orvziQhR_vPW7_uhXcbSUC4vY" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-sm py-1 rounded shadow-sm z-20">
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">Floor 3</span>
                </div>
                <div className="absolute top-3 right-3 bg-slate-700 text-white px-md py-1 rounded-full text-xs font-bold flex items-center gap-1 z-20">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>engineering</span>
                  Maintenance
                </div>
              </div>
              <div className="p-lg flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-h3 font-h3 text-on-surface">Deluxe 302</h3>
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
                <p className="text-body-sm text-secondary mb-md">Deluxe Queen • City Center View</p>
                <div className="mt-auto pt-md border-t border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-slate-500">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                    <span className="text-xs">AC Unit Repair</span>
                  </div>
                  <span className="text-xs font-bold text-blue-700 hover:underline cursor-pointer">Service Log</span>
                </div>
              </div>
            </div>

            {/* Room Card 5 (Suite - Occupied) */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow group overflow-hidden flex flex-col border border-slate-100">
              <div className="relative h-40 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="The living area of a luxury hotel suite with a velvet sofa, a sleek workspace, and premium amenities like a high-end espresso machine. Warm evening light flows into the room, illuminating soft textures and refined materials. The scene is sophisticated and intimate, conveying the prestige of a premium suite booking." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6ELOJO7SI0Xpt2F_nI8OoHzSXk6rmlOuH5puXMwWN4mTsE6fV2cs-diUmGfZRWqPAQGazRXF8elc9I3Lthxd6YjVMhQccL72AIzFS8TewTYoqnMtB4BCfOUitf0gJlLyBcGFw-mfwncMZZwI9FF4CEujodmBQtd8v2Cwrc_gzWiPBdQJ_wTsEKlwtEyrqUiXjMVoroKszd51xL705eVB70GiE5P-GgjxbxlBAxOmW7H6OuTdVJN8tXO4vZqQE4ZCQbSe1m8mibtE" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-sm py-1 rounded shadow-sm">
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">Floor 4</span>
                </div>
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-md py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                  Occupied
                </div>
              </div>
              <div className="p-lg flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-h3 font-h3 text-on-surface">Suite 405</h3>
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
                <p className="text-body-sm text-secondary mb-md">Penthouse Suite • Private Terrace</p>
                <div className="mt-auto pt-md border-t border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span className="text-data-tabular">VIP Guest</span>
                  </div>
                  <a className="text-xs font-bold text-blue-700 hover:underline cursor-pointer" href="/room-detail">Manage Stay</a>
                </div>
              </div>
            </div>

            {/* Add Room Placeholder */}
            <a className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-lg group cursor-pointer hover:border-blue-700 hover:bg-blue-50/30 transition-all min-h-[320px]" href="/new-room">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 group-hover:bg-blue-700 group-hover:text-white flex items-center justify-center transition-colors mb-md">
                <span className="material-symbols-outlined text-[32px]">add</span>
              </div>
              <p className="font-h3 text-h3 text-slate-400 group-hover:text-blue-700">Add New Room</p>
              <p className="text-body-sm text-slate-400 text-center mt-2 max-w-[200px]">Configure a new room unit, set type and floor location.</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoomManagement;
