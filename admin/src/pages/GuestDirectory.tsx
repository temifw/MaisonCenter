import React, { useEffect, useState } from 'react';
import { hotelService, type Guest } from '../services/hotelService';

const GuestDirectory: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Debounced search against GET /guests?search=
  useEffect(() => {
    let active = true;
    setLoading(true);
    const t = setTimeout(() => {
      hotelService
        .getGuests(search)
        .then((res) => { if (active) setGuests(res.data); })
        .catch(() => { if (active) setGuests([]); })
        .finally(() => { if (active) setLoading(false); });
    }, 250);
    return () => { active = false; clearTimeout(t); };
  }, [search]);

  return (
    <div className="bg-surface text-on-surface min-h-screen flex">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col z-50 bg-white dark:bg-slate-950 w-64 border-r border-slate-200 dark:border-slate-800 shadow-sm font-manrope text-sm font-medium">
        <div className="px-6 py-8 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>bed</span>
            </div>
            <div>
              <h1 className="font-extrabold tracking-tight text-[#102A43] dark:text-white text-lg">LuxStay Management</h1>
              <p className="text-xs text-slate-500">Corporate Admin</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/rooms">
            <span className="material-symbols-outlined">bed</span>
            Room Management
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/calendar">
            <span className="material-symbols-outlined">calendar_month</span>
            Booking Calendar
          </a>
          <a className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-4 border-blue-700 px-4 py-3 flex items-center gap-3 scale-98 active:scale-95 duration-200" href="/guests">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            Guest Directory
          </a>
        </nav>
        <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800">
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all" href="#support">
            <span className="material-symbols-outlined">contact_support</span>
            Support
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all" href="/sign-in">
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </a>
        </div>
      </aside>

      <div className="ml-64 flex flex-col min-h-screen w-full">
        {/* TopNavBar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-2 w-full bg-white dark:bg-slate-950 text-[#102A43] dark:text-slate-100 font-manrope antialiased border-b border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-body-md focus:ring-2 focus:ring-blue-700/20" placeholder="Search guests by name, email, or phone..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors opacity-80 duration-150">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors opacity-80 duration-150">
              <span className="material-symbols-outlined">help</span>
            </button>
            <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors opacity-80 duration-150 border border-slate-100 dark:border-slate-800">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-[#102A43] dark:text-white">Admin User</p>
                <p className="text-xs text-slate-500">Property Manager</p>
              </div>
              <img alt="Administrator Profile Avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" data-alt="A professional headshot of a corporate property manager in a well-lit modern office environment. The subject is wearing a crisp navy suit and has a friendly, confident expression. The lighting is soft and professional, creating a high-end business aesthetic. The background is slightly blurred, showing a clean glass-partitioned workspace with corporate blue accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw-qnRCH048fkU1kJWLGfv8VVjsAvPjA3OtXCPsGkQhqHDVcHQW-q9r4kmv1lK-budmm5fBQu0e_iK22nijuWE3ssY1h6Db385IkqO3OklwpkRQO8dl8GV_NVRlsad8IjFG0m8r__Q1ULQn43AWdl6kxulSe3uxo21jijjhQ5iDnoVrpwOxQgNGOx-2eaqOwa0icaq0ckD5MCeMDKQChlxajdG_ppjD-C-P_TdzufHyBKzSPEWPAkzimajjV-5r5_KPAHonpG0cxo" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8 w-full">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-h1 text-h1 text-primary">Guest Directory</h2>
              <p className="text-body-md text-secondary mt-1">Manage guest information and loyalty history across all properties.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant text-primary rounded-lg font-data-tabular hover:bg-surface-container transition-all shadow-sm">
                <span className="material-symbols-outlined text-[20px]">download</span>
                Export List
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-lg font-data-tabular hover:bg-primary-container transition-all shadow-md">
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                Add New Guest
              </button>
            </div>
          </div>

          {/* Bento Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col gap-2">
              <span className="text-label-bold text-secondary-fixed-variant uppercase tracking-widest">Total Guests</span>
              <div className="flex items-end justify-between">
                <span className="text-h1 font-h1 text-primary">{loading ? '—' : guests.length.toLocaleString()}</span>
                <span className="text-body-sm text-secondary font-medium">In directory</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col gap-2">
              <span className="text-label-bold text-secondary-fixed-variant uppercase tracking-widest">Active Bookings</span>
              <div className="flex items-end justify-between">
                <span className="text-h1 font-h1 text-primary">156</span>
                <span className="text-body-sm text-secondary">Currently In</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col gap-2">
              <span className="text-label-bold text-secondary-fixed-variant uppercase tracking-widest">Repeat Customers</span>
              <div className="flex items-end justify-between">
                <span className="text-h1 font-h1 text-primary">42%</span>
                <span className="text-body-sm text-blue-600 font-bold">Loyalty Level</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col gap-2">
              <span className="text-label-bold text-secondary-fixed-variant uppercase tracking-widest">Avg. Spend</span>
              <div className="flex items-end justify-between">
                <span className="text-h1 font-h1 text-primary">$1,240</span>
                <span className="text-body-sm text-secondary">Per Guest</span>
              </div>
            </div>
          </div>

          {/* Data Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-surface-container-high overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-container-high flex items-center justify-between bg-surface-container-lowest">
              <div className="flex items-center gap-4">
                <span className="text-label-bold text-primary">Filter By:</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-body-sm font-bold flex items-center gap-1">
                    Status: All <span className="material-symbols-outlined text-sm">close</span>
                  </span>
                  <span className="px-3 py-1 bg-surface-container text-secondary rounded-full text-body-sm hover:bg-surface-container-high cursor-pointer">
                    Tier: VIP
                  </span>
                </div>
              </div>
              <div className="text-body-sm text-secondary">
                {loading ? 'Loading…' : `Showing ${guests.length} guest${guests.length === 1 ? '' : 's'}`}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-surface-container-high">
                    <th className="px-6 py-4 font-label-bold text-secondary uppercase tracking-wider text-[11px]">Guest Name</th>
                    <th className="px-6 py-4 font-label-bold text-secondary uppercase tracking-wider text-[11px]">Contact Details</th>
                    <th className="px-6 py-4 font-label-bold text-secondary uppercase tracking-wider text-[11px]">Status</th>
                    <th className="px-6 py-4 font-label-bold text-secondary uppercase tracking-wider text-[11px]">Last Stay</th>
                    <th className="px-6 py-4 font-label-bold text-secondary uppercase tracking-wider text-[11px]">Total Spend</th>
                    <th className="px-6 py-4 font-label-bold text-secondary uppercase tracking-wider text-[11px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {loading && (
                    <tr><td className="px-6 py-8 text-center text-secondary" colSpan={6}>Loading guests…</td></tr>
                  )}
                  {!loading && guests.length === 0 && (
                    <tr><td className="px-6 py-8 text-center text-secondary" colSpan={6}>No guests found.</td></tr>
                  )}
                  {!loading && guests.map((guest) => {
                    const initials = guest.full_name
                      .split(' ')
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase();
                    return (
                      <tr className="hover:bg-blue-50/30 transition-colors group" key={guest.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-body-sm">
                              {initials || '?'}
                            </div>
                            <div>
                              <p className="font-data-tabular text-primary font-bold">{guest.full_name}</p>
                              <p className="text-body-sm text-secondary">Guest</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-body-md text-primary">{guest.email || '—'}</span>
                            <span className="text-body-sm text-secondary">{guest.phone || '—'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-body-md text-secondary">
                          {guest.created_at ? new Date(guest.created_at).toLocaleDateString() : '—'}
                        </td>
                        <td className="px-6 py-4 font-data-tabular text-primary font-bold">—</td>
                        <td className="px-6 py-4 text-right">
                          <button className="px-4 py-1.5 text-blue-700 border border-blue-700 rounded-lg text-body-sm font-bold hover:bg-blue-700 hover:text-white transition-all">
                            View Profile
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-surface-container-high bg-surface-container-lowest flex items-center justify-between">
              <button className="px-4 py-2 text-body-sm font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1 disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span> Previous
              </button>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded-lg bg-primary text-on-primary text-body-sm font-bold">1</button>
                <button className="w-8 h-8 rounded-lg hover:bg-surface-container text-body-sm font-bold">2</button>
                <button className="w-8 h-8 rounded-lg hover:bg-surface-container text-body-sm font-bold">3</button>
                <span className="px-2 self-center">...</span>
                <button className="w-8 h-8 rounded-lg hover:bg-surface-container text-body-sm font-bold">284</button>
              </div>
              <button className="px-4 py-2 text-body-sm font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1">
                Next <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GuestDirectory;
