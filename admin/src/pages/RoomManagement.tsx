import React, { useEffect, useMemo, useState } from 'react';
import { hotelService, type Room } from '../services/hotelService';

const STATUS_STYLES: Record<Room['status'], { label: string; badge: string; dot: string }> = {
  available:   { label: 'Available',   badge: 'bg-green-600',  dot: 'bg-green-600' },
  occupied:    { label: 'Occupied',    badge: 'bg-orange-500', dot: 'bg-orange-600' },
  cleaning:    { label: 'Cleaning',    badge: 'bg-red-600',    dot: 'bg-red-600' },
  maintenance: { label: 'Maintenance', badge: 'bg-slate-700',  dot: 'bg-slate-600' },
};
const STATUS_ORDER: Room['status'][] = ['available', 'occupied', 'cleaning', 'maintenance'];

const RoomManagement: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | Room['status']>('all');

  const loadRooms = () => {
    setLoading(true);
    hotelService
      .getRooms()
      .then((res) => setRooms(res.data.filter((r) => r.is_active !== false)))
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  };
  useEffect(loadRooms, []);

  const counts = useMemo(() => {
    const c = { available: 0, occupied: 0, cleaning: 0, maintenance: 0 };
    rooms.forEach((r) => { if (c[r.status] !== undefined) c[r.status] += 1; });
    return c;
  }, [rooms]);

  const occupancy = rooms.length ? Math.round((counts.occupied / rooms.length) * 100) : 0;
  const visibleRooms = filter === 'all' ? rooms : rooms.filter((r) => r.status === filter);

  const changeStatus = async (room: Room, status: Room['status']) => {
    setRooms((prev) => prev.map((r) => (r.id === room.id ? { ...r, status } : r))); // optimistic
    try {
      await hotelService.setRoomStatus(room.id, status);
    } catch {
      loadRooms(); // revert from server on failure
    }
  };

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
                  <button onClick={() => setFilter('all')} className={`px-md py-xs rounded-full border font-data-tabular text-sm flex items-center gap-2 transition-colors ${filter === 'all' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-surface text-secondary border-outline-variant hover:bg-surface-container'}`}>
                    <div className="w-2 h-2 rounded-full bg-blue-700"></div> All Rooms ({rooms.length})
                  </button>
                  <button onClick={() => setFilter('available')} className={`px-md py-xs rounded-full border font-data-tabular text-sm flex items-center gap-2 transition-colors ${filter === 'available' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-green-50 text-green-700 border-green-100 hover:bg-green-100'}`}>
                    <div className="w-2 h-2 rounded-full bg-green-600"></div> Available ({counts.available})
                  </button>
                  <button onClick={() => setFilter('occupied')} className={`px-md py-xs rounded-full border font-data-tabular text-sm flex items-center gap-2 transition-colors ${filter === 'occupied' ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100'}`}>
                    <div className="w-2 h-2 rounded-full bg-orange-600"></div> Occupied ({counts.occupied})
                  </button>
                  <button onClick={() => setFilter('cleaning')} className={`px-md py-xs rounded-full border font-data-tabular text-sm flex items-center gap-2 transition-colors ${filter === 'cleaning' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-red-50 text-red-700 border-red-100 hover:bg-red-100'}`}>
                    <div className="w-2 h-2 rounded-full bg-red-600"></div> Cleaning ({counts.cleaning})
                  </button>
                  <button onClick={() => setFilter('maintenance')} className={`px-md py-xs rounded-full border font-data-tabular text-sm flex items-center gap-2 transition-colors ${filter === 'maintenance' ? 'bg-slate-200 text-slate-700 border-slate-300' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'}`}>
                    <div className="w-2 h-2 rounded-full bg-slate-600"></div> Maintenance ({counts.maintenance})
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
                <h3 className="text-[32px] font-bold mt-1">{occupancy}%</h3>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-on-primary-container border-t-white flex items-center justify-center">
                <span className="text-xs font-bold">{counts.occupied}/{rooms.length}</span>
              </div>
            </div>
          </div>

          {/* Room Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {loading && (
              <div className="col-span-full text-center text-secondary py-xl">Loading rooms…</div>
            )}
            {!loading && visibleRooms.length === 0 && (
              <div className="col-span-full text-center text-secondary py-xl">No rooms match this filter.</div>
            )}
            {!loading && visibleRooms.map((room) => {
              const s = STATUS_STYLES[room.status];
              return (
                <div className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col border border-slate-100" key={room.id}>
                  <div className="relative h-40 overflow-hidden bg-slate-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-300 text-6xl">bed</span>
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-sm py-1 rounded shadow-sm">
                      <span className="text-xs font-bold text-primary tracking-widest uppercase">Floor {room.floor ?? '—'}</span>
                    </div>
                    <div className={`absolute top-3 right-3 ${s.badge} text-white px-md py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
                      <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
                      {s.label}
                    </div>
                  </div>
                  <div className="p-lg flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-h3 font-h3 text-on-surface">Room {room.room_number}</h3>
                    </div>
                    <p className="text-body-sm text-secondary mb-md">{room.room_types?.name ?? 'Room'}</p>
                    <div className="mt-auto pt-md border-t border-slate-100 flex justify-between items-center gap-2">
                      <label className="text-[11px] font-bold text-secondary uppercase tracking-wider">Status</label>
                      <select
                        value={room.status}
                        onChange={(e) => changeStatus(room, e.target.value as Room['status'])}
                        className="border-outline-variant bg-surface rounded-lg text-xs font-bold px-2 py-1 focus:ring-blue-700 outline-none"
                      >
                        {STATUS_ORDER.map((st) => (
                          <option key={st} value={st}>{STATUS_STYLES[st].label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}

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
