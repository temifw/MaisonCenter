const RoomDetail = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
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

      <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-2 w-full ml-64 bg-white dark:bg-slate-950 text-[#102A43] dark:text-slate-100 font-manrope antialiased docked border-b border-slate-200 dark:border-slate-800 shadow-sm" style={{ width: 'calc(100% - 16rem)' }}>
        <div className="flex items-center gap-8 flex-1">
          <a className="flex items-center gap-2 text-secondary hover:text-primary font-bold text-body-sm" href="/rooms">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Back to Rooms
          </a>
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-700 outline-none" placeholder="Search rooms or guests..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-slate-500" type="button">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-slate-500" type="button">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      <main className="ml-64 p-margin min-h-screen">
        <div className="grid grid-cols-12 gap-gutter items-start">
          <section className="col-span-12">
            <div className="relative h-[360px] rounded-xl overflow-hidden shadow-sm border border-slate-100">
              <img className="w-full h-full object-cover" alt="Suite 401 bedroom" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTrciJ1OY2chBssQiCMODIcmBpAD9gRwTwvVPNRjd9zA-TzsSPU5Hq3FwQK_oeaMUY0woeMxshlkeRJW6GdCLtDh4IFnL4bG7HI1AFzNC4cLkwu9Vl-gyeSEhevA0ezpbU1PdnTR-Kl_tcDpVdTCa_mUzuJDJ9styVLh9We-fknq_RSXNGjU-zwuuSemPsPXiQTqGmrCXdb458ogPMjM395F7cACPcx55kCDUSp47TipIybTxNckuFZbELj-sjC6UJlpWJy4h9Owc" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
              <div className="absolute left-lg right-lg bottom-lg flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-sm">
                    <span className="bg-white/90 text-primary px-md py-xs rounded-full text-xs font-bold uppercase">Floor 4</span>
                    <span className="bg-orange-500 text-white px-md py-xs rounded-full text-xs font-bold uppercase">Occupied</span>
                  </div>
                  <h2 className="font-h1 text-h1 text-white">Suite 401</h2>
                  <p className="font-body-lg text-body-lg text-white/80">Executive King Suite • Ocean View • 72 m²</p>
                </div>
                <div className="flex gap-sm">
                  <button className="bg-white text-primary px-lg py-sm rounded-lg font-label-bold flex items-center gap-2 hover:bg-surface-container-low transition-colors" type="button">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                    Edit Room
                  </button>
                  <button className="bg-primary-container text-white px-lg py-sm rounded-lg font-label-bold flex items-center gap-2 hover:opacity-90 transition-opacity" type="button">
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="col-span-12 lg:col-span-8 space-y-gutter">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
              <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-slate-100">
                <p className="font-label-bold text-label-bold text-secondary uppercase mb-xs">Nightly Rate</p>
                <p className="font-h2 text-h2 text-primary">$480</p>
              </div>
              <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-slate-100">
                <p className="font-label-bold text-label-bold text-secondary uppercase mb-xs">Occupancy</p>
                <p className="font-h2 text-h2 text-primary">2 Guests</p>
              </div>
              <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-slate-100">
                <p className="font-label-bold text-label-bold text-secondary uppercase mb-xs">Housekeeping</p>
                <p className="font-h2 text-h2 text-primary">Ready</p>
              </div>
              <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-slate-100">
                <p className="font-label-bold text-label-bold text-secondary uppercase mb-xs">Next Available</p>
                <p className="font-h2 text-h2 text-primary">Oct 28</p>
              </div>
            </div>

            <section className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-lg">
                <h3 className="font-h3 text-h3 text-primary">Current Stay</h3>
                <span className="bg-blue-50 text-blue-700 px-md py-xs rounded-full text-xs font-bold">Confirmed</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                <div>
                  <p className="font-label-bold text-label-bold text-secondary uppercase mb-xs">Guest</p>
                  <p className="font-body-lg text-body-lg text-primary font-bold">James Wilson</p>
                  <p className="text-body-sm text-secondary">j.wilson@northstar.com</p>
                </div>
                <div>
                  <p className="font-label-bold text-label-bold text-secondary uppercase mb-xs">Stay Window</p>
                  <p className="font-body-lg text-body-lg text-primary font-bold">Oct 24 - Oct 28</p>
                  <p className="text-body-sm text-secondary">4 nights • Corporate rate</p>
                </div>
                <div>
                  <p className="font-label-bold text-label-bold text-secondary uppercase mb-xs">Balance</p>
                  <p className="font-body-lg text-body-lg text-primary font-bold">$1,920.00</p>
                  <p className="text-body-sm text-green-600 font-bold">Paid in full</p>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-slate-100">
              <h3 className="font-h3 text-h3 text-primary mb-lg">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
                {['King Bed', 'Ocean View', 'Workspace', 'Mini Bar', 'Smart TV', 'Balcony', 'Coffee Station', 'Safe'].map((amenity) => (
                  <div className="flex items-center gap-2 rounded-lg bg-surface-container-low p-sm text-body-sm text-secondary" key={amenity}>
                    <span className="material-symbols-outlined text-green-600 text-[18px]">check_circle</span>
                    {amenity}
                  </div>
                ))}
              </div>
            </section>
          </section>

          <aside className="col-span-12 lg:col-span-4 space-y-gutter">
            <section className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-slate-100">
              <h3 className="font-h3 text-h3 text-primary mb-lg">Room Controls</h3>
              <div className="space-y-sm">
                <button className="w-full px-lg py-sm rounded-lg bg-primary-container text-white font-label-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" type="button">
                  <span className="material-symbols-outlined text-[20px]">cleaning_services</span>
                  Request Housekeeping
                </button>
                <button className="w-full px-lg py-sm rounded-lg border border-outline-variant text-secondary font-label-bold flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors" type="button">
                  <span className="material-symbols-outlined text-[20px]">build</span>
                  Open Maintenance Ticket
                </button>
                <button className="w-full px-lg py-sm rounded-lg border border-outline-variant text-secondary font-label-bold flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors" type="button">
                  <span className="material-symbols-outlined text-[20px]">key</span>
                  Issue Key Card
                </button>
              </div>
            </section>

            <section className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-slate-100">
              <h3 className="font-h3 text-h3 text-primary mb-lg">Activity</h3>
              <div className="space-y-md">
                <div className="flex gap-sm">
                  <span className="material-symbols-outlined text-blue-700 text-[20px]">login</span>
                  <div>
                    <p className="text-body-md text-primary font-bold">Guest checked in</p>
                    <p className="text-body-sm text-secondary">Today, 2:14 PM</p>
                  </div>
                </div>
                <div className="flex gap-sm">
                  <span className="material-symbols-outlined text-green-700 text-[20px]">cleaning_services</span>
                  <div>
                    <p className="text-body-md text-primary font-bold">Room inspected</p>
                    <p className="text-body-sm text-secondary">Today, 11:05 AM</p>
                  </div>
                </div>
                <div className="flex gap-sm">
                  <span className="material-symbols-outlined text-slate-500 text-[20px]">event</span>
                  <div>
                    <p className="text-body-md text-primary font-bold">Booking created</p>
                    <p className="text-body-sm text-secondary">Oct 18, 9:42 AM</p>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default RoomDetail
