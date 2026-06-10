import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="bg-background text-on-background antialiased min-h-screen">
      {/* SideNavBar Shell */}
      <aside className="fixed left-0 top-0 h-full flex flex-col z-50 bg-white dark:bg-slate-950 text-[#102A43] dark:text-slate-100 font-manrope text-sm font-medium w-64 border-r rounded-none border-slate-200 dark:border-slate-800 shadow-sm transition-all">
        <div className="px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>apartment</span>
            </div>
            <div>
              <h2 className="font-extrabold tracking-tight text-[#102A43] dark:text-white text-lg">LuxStay Management</h2>
              <p className="text-xs text-secondary opacity-70">Corporate Admin</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <a className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-4 border-blue-700 px-4 py-3 flex items-center gap-3 scale-98 active:scale-95 duration-200" href="/dashboard">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/rooms">
            <span className="material-symbols-outlined" data-icon="bed">bed</span>
            <span>Room Management</span>
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/calendar">
            <span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
            <span>Booking Calendar</span>
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/guests">
            <span className="material-symbols-outlined" data-icon="group">group</span>
            <span>Guest Directory</span>
          </a>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="#support">
            <span className="material-symbols-outlined" data-icon="contact_support">contact_support</span>
            <span>Support</span>
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/sign-in">
            <span className="material-symbols-outlined" data-icon="logout">logout</span>
            <span>Sign Out</span>
          </a>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="ml-64 min-h-screen">
        {/* TopNavBar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-2 w-full bg-white dark:bg-slate-950 text-[#102A43] dark:text-slate-100 font-manrope antialiased border-b border-slate-200 dark:border-slate-800 shadow-sm h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-[#102A43] dark:text-white">LuxStay PMS</h1>
            <div className="relative w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-container" placeholder="Search reservations, guests..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors rounded-full relative">
                <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
              </button>
              <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors rounded-full">
                <span className="material-symbols-outlined" data-icon="help">help</span>
              </button>
              <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors rounded-full">
                <span className="material-symbols-outlined" data-icon="settings">settings</span>
              </button>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold">Admin User</p>
                <p className="text-xs text-secondary">Property Manager</p>
              </div>
              <img alt="Administrator Profile Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-primary-fixed" data-alt="A professional headshot of a mature administrative professional in a modern office setting. The individual is wearing a charcoal blazer over a crisp white shirt, radiating confidence and hospitality. The lighting is soft and flattering, emphasizing a bright, trustworthy workspace in the background with a soft bokeh effect. The overall aesthetic is clean, corporate, and premium." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC89JkNNH4LmS7PRbCoBj2nneKUW6QU1jJs6vBGLJKWvODe-GxkZKDPMPrqrfas0NM4t-xR9eYZ77A1s8b8E3cw2LBwPbZIwgW_xKvhZ_zyLU5pp2XXmO12jmJy1vIW_IWyZISMMDGbh59th8nwsVD18ocmtlKaeNSM8zeepANKztPm9kgjHgBZP21zMcZFqRJU2Q1WucBv0nzLnNV2t5Ws5yUJ38qav0KVGWZR9MZQVJo_zbnGaxRoRWtG2D-jKGT0BhxQ-QHfoAY" />
            </div>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="p-margin w-full">
          <div className="mb-xl flex items-center justify-between">
            <div>
              <h2 className="font-h1 text-h1 text-primary">Property Overview</h2>
              <p className="font-body-md text-body-md text-secondary">Live metrics and performance summary for today, October 24th.</p>
            </div>
            <a className="bg-primary text-on-primary font-label-bold text-label-bold px-lg py-sm rounded-lg flex items-center gap-2 hover:opacity-90 transition-all" href="/new-booking">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
              NEW BOOKING
            </a>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-gutter">
            {/* KPI 1 */}
            <div className="bg-surface-container-lowest p-lg rounded-xl shadow-[rgba(16,42,67,0.08)_0px_4px_12px] border border-white/50">
              <div className="flex items-center justify-between mb-md">
                <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
                </div>
                <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">trending_up</span> +2.4%
                </span>
              </div>
              <p className="font-label-bold text-label-bold text-secondary uppercase tracking-wider mb-xs">Occupancy Rate</p>
              <h3 className="font-h1 text-h1 text-primary">85%</h3>
              <div className="mt-md w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-700 h-full w-[85%]"></div>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-surface-container-lowest p-lg rounded-xl shadow-[rgba(16,42,67,0.08)_0px_4px_12px] border border-white/50">
              <div className="flex items-center justify-between mb-md">
                <div className="p-2 bg-green-50 text-green-700 rounded-lg">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                </div>
                <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">trending_up</span> +12.5%
                </span>
              </div>
              <p className="font-label-bold text-label-bold text-secondary uppercase tracking-wider mb-xs">Monthly Revenue</p>
              <h3 className="font-h1 text-h1 text-primary">$12,450</h3>
              <p className="text-xs text-secondary-container bg-on-secondary-container/10 px-2 py-1 rounded inline-block mt-2 font-medium">Target: $15,000</p>
            </div>

            {/* KPI 3 */}
            <div className="bg-surface-container-lowest p-lg rounded-xl shadow-[rgba(16,42,67,0.08)_0px_4px_12px] border border-white/50">
              <div className="flex items-center justify-between mb-md">
                <div className="p-2 bg-orange-50 text-orange-700 rounded-lg">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>luggage</span>
                </div>
                <span className="text-secondary text-xs font-medium">Today</span>
              </div>
              <p className="font-label-bold text-label-bold text-secondary uppercase tracking-wider mb-xs">Upcoming Arrivals</p>
              <h3 className="font-h1 text-h1 text-primary">12</h3>
              <div className="flex mt-md -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-500 flex items-center justify-center text-[10px] text-white font-bold">+9</div>
              </div>
            </div>
          </div>

          {/* Bento Grid Main */}
          <div className="grid grid-cols-12 gap-gutter">
            {/* Booking Trends Chart (Bento Large) */}
            <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-lg rounded-xl shadow-[rgba(16,42,67,0.08)_0px_4px_12px] border border-white/50">
              <div className="flex items-center justify-between mb-xl">
                <h3 className="font-h2 text-h2 text-primary">Booking Trends</h3>
                <select className="bg-surface border-outline-variant rounded-lg text-xs font-medium py-1 px-3 focus:ring-primary-container">
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>Year to Date</option>
                </select>
              </div>
              {/* Mock Chart Visualization */}
              <div className="relative h-64 w-full flex items-end justify-between gap-4 pt-4">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div className="border-b border-surface-variant w-full"></div>
                  <div className="border-b border-surface-variant w-full"></div>
                  <div className="border-b border-surface-variant w-full"></div>
                  <div className="border-b border-surface-variant w-full"></div>
                </div>
                <div className="flex-1 bg-primary-fixed h-2/5 rounded-t-sm group relative">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">45</div>
                </div>
                <div className="flex-1 bg-primary-fixed h-3/5 rounded-t-sm group relative"></div>
                <div className="flex-1 bg-primary-fixed h-2/3 rounded-t-sm group relative"></div>
                <div className="flex-1 bg-primary-fixed h-4/5 rounded-t-sm group relative"></div>
                <div className="flex-1 bg-blue-700 h-full rounded-t-sm group relative">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded">Today</div>
                </div>
                <div className="flex-1 bg-primary-fixed h-3/4 rounded-t-sm group relative"></div>
                <div className="flex-1 bg-primary-fixed h-1/2 rounded-t-sm group relative"></div>
                <div className="flex-1 bg-primary-fixed h-4/5 rounded-t-sm group relative"></div>
                <div className="flex-1 bg-primary-fixed h-3/5 rounded-t-sm group relative"></div>
                <div className="flex-1 bg-primary-fixed h-5/6 rounded-t-sm group relative"></div>
              </div>
              <div className="flex justify-between mt-md text-xs text-secondary font-medium">
                <span>Oct 01</span>
                <span>Oct 08</span>
                <span>Oct 15</span>
                <span>Oct 22</span>
                <span>Oct 30</span>
              </div>
            </div>

            {/* Recent Activity Feed (Bento Sidebar) */}
            <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-lg rounded-xl shadow-[rgba(16,42,67,0.08)_0px_4px_12px] border border-white/50 flex flex-col">
              <h3 className="font-h3 text-h3 text-primary mb-lg">Recent Activity</h3>
              <div className="space-y-md flex-1 overflow-y-auto pr-2">
                {/* Activity Item 1 */}
                <div className="flex gap-4 p-md rounded-lg hover:bg-surface transition-colors border border-transparent hover:border-surface-variant/30">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-sm" data-icon="key">key</span>
                  </div>
                  <div>
                    <p className="text-body-md font-semibold text-primary">New Booking: Suite 402</p>
                    <p className="text-body-sm text-secondary">James Wilson • 3 nights • $1,200</p>
                    <p className="text-label-bold text-[10px] text-secondary-container uppercase mt-1">2 minutes ago</p>
                  </div>
                </div>

                {/* Activity Item 2 */}
                <div className="flex gap-4 p-md rounded-lg hover:bg-surface transition-colors border border-transparent hover:border-surface-variant/30">
                  <div className="w-10 h-10 rounded-full bg-on-tertiary-fixed-variant/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-tertiary text-sm" data-icon="logout">logout</span>
                  </div>
                  <div>
                    <p className="text-body-md font-semibold text-primary">Check-out: Room 105</p>
                    <p className="text-body-sm text-secondary">Sarah Jenkins • Completed</p>
                    <p className="text-label-bold text-[10px] text-secondary-container uppercase mt-1">45 minutes ago</p>
                  </div>
                </div>

                {/* Activity Item 3 */}
                <div className="flex gap-4 p-md rounded-lg hover:bg-surface transition-colors border border-transparent hover:border-surface-variant/30">
                  <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-error text-sm" data-icon="cancel">cancel</span>
                  </div>
                  <div>
                    <p className="text-body-md font-semibold text-primary">Cancellation: Room 212</p>
                    <p className="text-body-sm text-secondary">Refund processed • $450</p>
                    <p className="text-label-bold text-[10px] text-secondary-container uppercase mt-1">2 hours ago</p>
                  </div>
                </div>

                {/* Activity Item 4 */}
                <div className="flex gap-4 p-md rounded-lg hover:bg-surface transition-colors border border-transparent hover:border-surface-variant/30">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-sm" data-icon="key">key</span>
                  </div>
                  <div>
                    <p className="text-body-md font-semibold text-primary">New Booking: Deluxe Twin</p>
                    <p className="text-body-sm text-secondary">Michael Chen • 1 night • $280</p>
                    <p className="text-label-bold text-[10px] text-secondary-container uppercase mt-1">4 hours ago</p>
                  </div>
                </div>
              </div>
              <button className="mt-lg w-full py-sm border border-outline-variant text-secondary font-label-bold text-label-bold rounded-lg hover:bg-surface transition-colors">
                VIEW ALL ACTIVITY
              </button>
            </div>
          </div>

          {/* Bottom Section: Room Status Summary */}
          <div className="mt-gutter grid grid-cols-12 gap-gutter">
            <div className="col-span-12 bg-surface-container-lowest rounded-xl shadow-[rgba(16,42,67,0.08)_0px_4px_12px] border border-white/50 overflow-hidden">
              <div className="px-lg py-md border-b border-surface-variant flex items-center justify-between bg-surface/50">
                <h3 className="font-label-bold text-label-bold text-secondary uppercase tracking-widest">Live Room Inventory</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-xs font-medium text-secondary">Available (42)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span className="text-xs font-medium text-secondary">Occupied (112)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                    <span className="text-xs font-medium text-secondary">Cleaning (8)</span>
                  </div>
                </div>
              </div>
              <div className="p-lg">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-surface-variant">
                      <th className="py-md text-xs font-bold text-secondary uppercase tracking-tighter">Room</th>
                      <th className="py-md text-xs font-bold text-secondary uppercase tracking-tighter">Type</th>
                      <th className="py-md text-xs font-bold text-secondary uppercase tracking-tighter">Guest</th>
                      <th className="py-md text-xs font-bold text-secondary uppercase tracking-tighter">Stay Dates</th>
                      <th className="py-md text-xs font-bold text-secondary uppercase tracking-tighter">Status</th>
                      <th className="py-md text-xs font-bold text-secondary uppercase tracking-tighter text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-surface-variant/50">
                    <tr className="hover:bg-surface transition-colors">
                      <td className="py-md font-bold text-primary">101</td>
                      <td className="py-md text-secondary">Deluxe King</td>
                      <td className="py-md text-primary">Marcus Aurelius</td>
                      <td className="py-md text-secondary">Oct 22 - Oct 26</td>
                      <td className="py-md">
                        <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">OCCUPIED</span>
                      </td>
                      <td className="py-md text-right">
                        <button className="p-1 hover:text-primary-container"><span className="material-symbols-outlined text-sm">more_horiz</span></button>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface transition-colors bg-surface/30">
                      <td className="py-md font-bold text-primary">102</td>
                      <td className="py-md text-secondary">Superior Twin</td>
                      <td className="py-md text-secondary">—</td>
                      <td className="py-md text-secondary">—</td>
                      <td className="py-md">
                        <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-700">AVAILABLE</span>
                      </td>
                      <td className="py-md text-right">
                        <button className="p-1 hover:text-primary-container"><span className="material-symbols-outlined text-sm">more_horiz</span></button>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface transition-colors">
                      <td className="py-md font-bold text-primary">103</td>
                      <td className="py-md text-secondary">Executive Suite</td>
                      <td className="py-md text-primary">Elena Gilbert</td>
                      <td className="py-md text-secondary">Oct 20 - Oct 24</td>
                      <td className="py-md">
                        <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-orange-50 text-orange-700">DUE OUT</span>
                      </td>
                      <td className="py-md text-right">
                        <button className="p-1 hover:text-primary-container"><span className="material-symbols-outlined text-sm">more_horiz</span></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
