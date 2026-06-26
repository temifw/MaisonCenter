import React, { useEffect, useMemo, useState } from 'react';
import { hotelService, type Booking } from '../services/hotelService';

const STATUS_BAR: Record<string, string> = {
  confirmed: 'bg-secondary-container/40 border-secondary text-on-secondary-container',
  pending: 'bg-tertiary-fixed border-tertiary-fixed-dim text-on-tertiary-fixed-variant',
  checked_in: 'bg-primary-fixed border-on-primary-fixed-variant text-on-primary-fixed-variant',
};

const BookingCalendar: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // `anchor` is any date within the week currently being viewed.
  // Changing it lets the admin page back and forth through weeks.
  const [anchor, setAnchor] = useState(() => new Date());

  // Compute Mon–Sun of the week containing `anchor`.
  const weekDays = useMemo(() => {
    const day = (anchor.getDay() + 6) % 7; // 0 = Monday
    const monday = new Date(anchor);
    monday.setDate(anchor.getDate() - day);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }, [anchor]);

  const shiftWeeks = (weeks: number) =>
    setAnchor((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + weeks * 7);
      return next;
    });
  const goToday = () => setAnchor(new Date());

  const weekLabel = `${weekDays[0].toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })} – ${weekDays[6].toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;

  useEffect(() => {
    const from = weekDays[0].toISOString().slice(0, 10);
    const to = weekDays[6].toISOString().slice(0, 10);
    setLoading(true);
    hotelService
      .getCalendar(from, to)
      .then((r) => setBookings(r.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [weekDays]);

  const todayStr = new Date().toISOString().slice(0, 10);

  return (
    <div className="bg-background text-on-background font-body-md overflow-hidden min-h-screen">
      {/* SideNavBar (Fixed Shell) */}
      <aside className="fixed left-0 top-0 h-full flex flex-col z-50 bg-white dark:bg-slate-950 text-[#102A43] dark:text-slate-100 font-manrope text-sm font-medium w-64 border-r border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="px-6 py-8 flex flex-col items-center border-b border-slate-200 dark:border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>hotel</span>
          </div>
          <h1 className="font-extrabold tracking-tight text-[#102A43] dark:text-white text-lg">LuxStay Management</h1>
          <p className="text-xs text-slate-500 mt-1">Corporate Admin</p>
        </div>
        <nav className="flex-1 py-6 overflow-y-auto">
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/dashboard">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/rooms">
            <span className="material-symbols-outlined" data-icon="bed">bed</span>
            <span>Room Management</span>
          </a>
          {/* Active Tab: Booking Calendar */}
          <a className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-4 border-blue-700 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200 font-bold" href="/calendar">
            <span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
            <span>Booking Calendar</span>
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/guests">
            <span className="material-symbols-outlined" data-icon="group">group</span>
            <span>Guest Directory</span>
          </a>
        </nav>
        <div className="mt-auto border-t border-slate-200 dark:border-slate-800 py-4">
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all" href="#support">
            <span className="material-symbols-outlined" data-icon="contact_support">contact_support</span>
            <span>Support</span>
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all" href="/sign-in">
            <span className="material-symbols-outlined" data-icon="logout">logout</span>
            <span>Sign Out</span>
          </a>
        </div>
      </aside>

      {/* TopNavBar */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-2 bg-white dark:bg-slate-950 text-[#102A43] dark:text-slate-100 font-manrope antialiased docked full-width border-b border-slate-200 dark:border-slate-800 shadow-sm ml-64 w-[calc(100%-16rem)]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-sm">search</span>
            </span>
            <input className="pl-10 pr-4 py-1.5 bg-surface-container-low border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-700 w-64" placeholder="Search bookings or guests..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full text-slate-500 hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
          </button>
          <button className="p-2 rounded-full text-slate-500 hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined" data-icon="help">help</span>
          </button>
          <button className="p-2 rounded-full text-slate-500 hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
          </button>
          <div className="h-8 w-px bg-slate-200 mx-2"></div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-bold">Admin User</p>
              <p className="text-[10px] text-slate-500">Corporate Manager</p>
            </div>
            <img alt="Administrator Profile Avatar" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6crhkSvg14TnyfWNJsaIFvk0RnTqbdxiVn6Pbw1adV2Piw5nPgxhtYp6cVxCi-__BpVa5G0pXlAkWoIbMDgZ6P2F8H270Y1HvQKFvVsJKptitMORdEU3qEeBqdTtKWQTY_qWp2D07ShP3GwL2s7H8uF8gIwREbh4ISrMc_Nt50kLXFRGeWKxiiS7JYHKt6lnaFLFHrbWo9rbmdnPKbIn27y-ysELgBMdlMWwd0Mv4AgoarTEr-O8hRwbpHPA8wk0oo4N73-tyDi0" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="ml-64 p-6 h-[calc(100vh-64px)] bg-background flex flex-col gap-6">
        {/* Dashboard Header Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-h2 text-h2 text-primary">Booking Calendar</h2>
            <p className="text-body-sm text-secondary">Manage property occupancy and upcoming arrivals.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={goToday}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant rounded-lg text-body-md font-medium text-on-surface hover:bg-surface-container transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              Today
            </button>
            <div className="flex items-center gap-1">
              <button
                onClick={() => shiftWeeks(-1)}
                aria-label="Previous week"
                className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <span className="min-w-[180px] text-center text-body-md font-bold text-primary">{weekLabel}</span>
              <button
                onClick={() => shiftWeeks(1)}
                aria-label="Next week"
                className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
            <div className="flex items-center gap-1 bg-surface-container rounded-lg p-1">
              <button className="px-3 py-1.5 text-xs font-bold rounded-md bg-white shadow-sm text-primary">Week</button>
              <button className="px-3 py-1.5 text-xs font-medium text-secondary hover:text-primary">Month</button>
            </div>
            <a className="flex items-center gap-2 px-4 py-2 bg-primary-container text-white rounded-lg text-body-md font-bold hover:opacity-90 transition-all shadow-md" href="/new-booking">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
              New Booking
            </a>
          </div>
        </div>

        {/* Interactive Calendar Grid (Bento Style Wrapper) */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          {/* Calendar Navigation & Timeline Header */}
          <div className="flex items-center border-b border-slate-100 bg-surface-container-lowest">
            <div className="w-64 p-4 border-r border-slate-100 font-bold text-slate-700 flex items-center justify-between">
              <span>Rooms &amp; Suites</span>
              <span className="material-symbols-outlined text-sm text-slate-400">filter_list</span>
            </div>
            <div className="flex-1 overflow-x-auto flex scrollbar-hide">
              <div className="flex items-center w-full">
                {weekDays.map((d) => {
                  const iso = d.toISOString().slice(0, 10);
                  const isToday = iso === todayStr;
                  return (
                    <div key={iso} className={`flex-1 min-w-[64px] flex flex-col items-center py-3 border-r border-slate-50 ${isToday ? 'bg-blue-50/50' : ''}`}>
                      <span className={`text-[10px] uppercase tracking-widest font-bold ${isToday ? 'text-blue-600' : 'text-slate-400'}`}>
                        {d.toLocaleDateString(undefined, { weekday: 'short' })}
                      </span>
                      <span className={`text-lg font-extrabold ${isToday ? 'text-blue-700' : 'text-slate-800'}`}>{d.getDate()}</span>
                      <span className={`text-[10px] ${isToday ? 'text-blue-400' : 'text-slate-400'}`}>
                        {isToday ? 'Today' : d.toLocaleDateString(undefined, { month: 'short' })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Scrollable Grid Body — one row per booking this week */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {loading && (
              <div className="p-6 text-center text-secondary">Loading bookings…</div>
            )}
            {!loading && bookings.length === 0 && (
              <div className="p-6 text-center text-secondary">No bookings scheduled this week.</div>
            )}
            {!loading && bookings.map((b) => {
              const bar = STATUS_BAR[b.status] || 'bg-surface-container border-outline-variant text-on-surface';
              return (
                <div className="flex min-h-[80px] border-b border-slate-50 group hover:bg-slate-50/50 transition-colors" key={b.id}>
                  <div className="w-64 p-4 border-r border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary">king_bed</span>
                    </div>
                    <div>
                      <p className="text-body-md font-bold text-primary leading-tight">Room {b.rooms?.room_number ?? '—'}</p>
                      <p className="text-body-sm text-secondary">{b.rooms?.room_types?.name ?? 'Room'}</p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center p-3">
                    <div className={`w-full ${bar} border-l-4 p-2 rounded-r-lg shadow-sm flex items-center justify-between`}>
                      <div>
                        <p className="text-[12px] font-bold truncate">{b.guests?.full_name ?? 'Guest'}</p>
                        <p className="text-[10px] opacity-70 capitalize">
                          {new Date(b.check_in).toLocaleDateString()} → {new Date(b.check_out).toLocaleDateString()} • {b.status}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">{b.source}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Calendar Footer Summary */}
          <div className="p-4 bg-surface-container border-t border-slate-100 flex items-center justify-between">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <span className="text-body-sm font-medium">Confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-tertiary-fixed-dim"></div>
                <span className="text-body-sm font-medium">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-on-primary-fixed-variant"></div>
                <span className="text-body-sm font-medium">Block / Corporate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <span className="text-body-sm font-medium">Maintenance</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-body-sm font-bold text-primary">
              <span>Bookings this week: {bookings.length}</span>
              <span>Arrivals: {bookings.filter((b) => b.check_in >= weekDays[0].toISOString().slice(0, 10)).length}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingCalendar;
