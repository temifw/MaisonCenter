import type { FormEvent } from 'react'

const amenities = [
  'King Bed',
  'Ocean View',
  'Workspace',
  'Mini Bar',
  'Balcony',
  'Accessible',
  'Smart TV',
  'Coffee Station',
]

const NewRoom = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.location.href = '/rooms'
  }

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
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-700 outline-none" placeholder="Search rooms or guests..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-slate-500" type="button">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-slate-500" type="button">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-slate-500" type="button">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-[#102A43] dark:text-white">Admin User</p>
              <p className="text-xs text-slate-500">General Manager</p>
            </div>
            <img alt="Administrator Profile Avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYdWo4d5f5vGvZTFYehIG2no8w1qeLFjBECV16BjTRGoY5jBRgDXEQad8--hbdib9wDe8mZBGEMQ88J-LPM8duxd0ZdlGc___EGOzpDD2VeOh7VTjAh_SDFvQAb2dl0iPDR5rpnduvqHj8iNb2ptGnFLEcu2W2_-kwhBxEfo_e01K9csp357F_DiJTOvY_EhHfzM9AHLIhpcN5Wz-qJO9rVgLG1d2V7gG5r5xe7YhSP_y5wNCxGgJQNEGVNMSmtVD8gHIc2YLBgiA" />
          </div>
        </div>
      </header>

      <main className="ml-64 p-margin min-h-screen">
        <form className="grid grid-cols-12 gap-gutter items-start" onSubmit={handleSubmit}>
          <div className="col-span-12 flex justify-between items-end mb-sm">
            <div>
              <h2 className="font-h2 text-h2 text-on-surface tracking-tight mb-1">New Room</h2>
              <p className="font-body-md text-body-md text-secondary">Configure a new room unit, assign its location, and set the initial availability profile.</p>
            </div>
            <nav className="flex items-center gap-2 text-body-sm text-secondary">
              <a className="hover:text-primary" href="/rooms">Room Management</a>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-primary font-bold">New Room</span>
            </nav>
          </div>

          <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-lg rounded-xl shadow-[rgba(16,42,67,0.08)_0px_4px_12px] border border-white/50">
            <div className="flex items-center gap-3 mb-lg">
              <span className="material-symbols-outlined p-2 bg-blue-50 text-blue-700 rounded-lg">meeting_room</span>
              <h3 className="font-h3 text-h3 text-primary">Room Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-xs">
                <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="room-number">ROOM NUMBER</label>
                <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="room-number" placeholder="e.g. 405" required type="text" />
              </div>
              <div className="space-y-xs">
                <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="room-name">ROOM NAME</label>
                <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="room-name" placeholder="Executive King Suite" required type="text" />
              </div>
              <div className="space-y-xs">
                <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="room-type">ROOM TYPE</label>
                <select className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="room-type" required>
                  <option>Deluxe King</option>
                  <option>Deluxe Twin</option>
                  <option>Executive Suite</option>
                  <option>Penthouse Suite</option>
                  <option>Standard Single</option>
                </select>
              </div>
              <div className="space-y-xs">
                <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="status">INITIAL STATUS</label>
                <select className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="status" defaultValue="Available">
                  <option>Available</option>
                  <option>Occupied</option>
                  <option>Dirty</option>
                  <option>Maintenance</option>
                </select>
              </div>
              <div className="space-y-xs">
                <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="floor">FLOOR</label>
                <select className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="floor">
                  <option>Floor 1</option>
                  <option>Floor 2</option>
                  <option>Floor 3</option>
                  <option>Floor 4</option>
                </select>
              </div>
              <div className="space-y-xs">
                <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="capacity">MAX OCCUPANCY</label>
                <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="capacity" min={1} placeholder="2" type="number" />
              </div>
              <div className="space-y-xs">
                <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="rate">NIGHTLY RATE</label>
                <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="rate" min={0} placeholder="249.00" type="number" />
              </div>
              <div className="space-y-xs">
                <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="view">VIEW</label>
                <select className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="view">
                  <option>City View</option>
                  <option>Ocean View</option>
                  <option>Garden View</option>
                  <option>Courtyard View</option>
                </select>
              </div>
            </div>
          </section>

          <aside className="col-span-12 lg:col-span-4 space-y-gutter">
            <section className="bg-surface-container-lowest p-lg rounded-xl shadow-[rgba(16,42,67,0.08)_0px_4px_12px] border border-white/50">
              <div className="flex items-center gap-3 mb-lg">
                <span className="material-symbols-outlined p-2 bg-green-50 text-green-700 rounded-lg">checklist</span>
                <h3 className="font-h3 text-h3 text-primary">Amenities</h3>
              </div>
              <div className="grid grid-cols-2 gap-sm">
                {amenities.map((amenity) => (
                  <label className="flex items-center gap-2 rounded-lg border border-outline-variant p-sm text-body-sm text-secondary hover:bg-surface-container-low cursor-pointer" key={amenity}>
                    <input className="text-primary focus:ring-primary-container" type="checkbox" />
                    {amenity}
                  </label>
                ))}
              </div>
            </section>

            <section className="bg-surface-container-lowest p-lg rounded-xl shadow-[rgba(16,42,67,0.08)_0px_4px_12px] border border-white/50">
              <div className="flex items-center gap-3 mb-lg">
                <span className="material-symbols-outlined p-2 bg-orange-50 text-orange-700 rounded-lg">image</span>
                <h3 className="font-h3 text-h3 text-primary">Room Image</h3>
              </div>
              <div className="border-2 border-dashed border-outline-variant rounded-xl p-lg text-center bg-surface-container-low">
                <span className="material-symbols-outlined text-4xl text-secondary">cloud_upload</span>
                <p className="text-body-md text-primary font-bold mt-sm">Upload Image</p>
                <p className="text-body-sm text-secondary mt-xs">Add a primary room photo for the catalog.</p>
              </div>
            </section>
          </aside>

          <section className="col-span-12 bg-surface-container-lowest p-lg rounded-xl shadow-[rgba(16,42,67,0.08)_0px_4px_12px] border border-white/50">
            <label className="block font-label-bold text-label-bold text-on-surface-variant mb-xs" htmlFor="notes">INTERNAL NOTES</label>
            <textarea className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="notes" placeholder="Housekeeping notes, maintenance restrictions, or sales context..." rows={4}></textarea>
            <div className="flex justify-end gap-md mt-lg">
              <a className="px-lg py-sm rounded-lg border border-outline-variant text-secondary font-label-bold hover:bg-surface-container transition-colors" href="/rooms">
                Cancel
              </a>
              <button className="px-lg py-sm rounded-lg bg-primary-container text-white font-label-bold hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2" type="submit">
                <span className="material-symbols-outlined text-[20px]">save</span>
                Save Room
              </button>
            </div>
          </section>
        </form>
      </main>
    </div>
  )
}

export default NewRoom
