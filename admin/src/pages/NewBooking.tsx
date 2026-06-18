import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { hotelService, type RoomType } from '../services/hotelService'

const NewBooking = () => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
  const [roomTypeId, setRoomTypeId] = useState('')
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    hotelService.getRoomTypes().then((res) => {
      setRoomTypes(res.data)
      if (res.data[0]) setRoomTypeId(res.data[0].id)
    }).catch(() => setRoomTypes([]))
  }, [])

  const selectedType = roomTypes.find((t) => t.id === roomTypeId)
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0
    const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime()
    return ms > 0 ? Math.round(ms / 86400000) : 0
  }, [checkIn, checkOut])
  const roomTotal = selectedType ? Number(selectedType.base_price) * nights : 0
  const serviceFee = roomTotal ? 45 : 0
  const tax = +(roomTotal * 0.12).toFixed(2)
  const total = +(roomTotal + serviceFee + tax).toFixed(2)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    if (!roomTypeId) return setError('Please select a room type.')
    if (nights <= 0) return setError('Check-out must be after check-in.')
    setSubmitting(true)
    try {
      const res = await hotelService.createBooking({
        roomTypeId,
        checkIn,
        checkOut,
        guestName,
        guestEmail: guestEmail || undefined,
        guestPhone: guestPhone || undefined,
        guestsCount: adults,
        specialRequests: notes || undefined,
        source: 'walk_in',
      })
      window.location.href = `/booking-confirmation?id=${res.data.id}`
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Could not create the booking.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex">
      <aside className="fixed left-0 top-0 h-full flex flex-col z-50 bg-white dark:bg-slate-950 text-[#102A43] dark:text-slate-100 w-64 border-r border-slate-200 dark:border-slate-800 shadow-sm font-manrope text-sm font-medium">
        <div className="p-6 flex flex-col gap-1">
          <h1 className="font-extrabold tracking-tight text-[#102A43] dark:text-white text-xl">LuxStay Management</h1>
          <p className="text-slate-500 text-xs">Corporate Admin</p>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/dashboard">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/rooms">
            <span className="material-symbols-outlined" data-icon="bed">bed</span>
            <span>Room Management</span>
          </a>
          <a className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-4 border-blue-700 px-4 py-3 flex items-center gap-3 scale-98 active:scale-95 duration-200" href="/calendar">
            <span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
            <span>Booking Calendar</span>
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/guests">
            <span className="material-symbols-outlined" data-icon="group">group</span>
            <span>Guest Directory</span>
          </a>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
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

      <div className="flex-1 ml-64 flex flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-2 w-full bg-white dark:bg-slate-950 text-[#102A43] dark:text-slate-100 font-manrope antialiased border-b border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" data-icon="search">search</span>
              <input className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-700/20" placeholder="Search bookings, rooms, guests..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors rounded-full relative" type="button">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors rounded-full" type="button">
              <span className="material-symbols-outlined" data-icon="help">help</span>
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors rounded-full" type="button">
              <span className="material-symbols-outlined" data-icon="settings">settings</span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold">Admin User</p>
                <p className="text-[10px] text-slate-500">Super Administrator</p>
              </div>
              <img alt="Administrator Profile Avatar" className="w-9 h-9 rounded-full object-cover border border-slate-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFJj2wvSVn3VZj2dsd8o5nDarWxBzMRTzAo6ypotfNWUJ3sPZYOZqngHkFRfC5-Fn7QrKyGl_0LmgNN0sqFL9l8Id7qKLL_kI62OoFhkDTKwXA7aTbtKDRrcUEaaMvxxOxfYTgvzWmJXoE18XRIVxK32iHAlw6gSyP3AcekuVcR47kEk46_9LEVdMSjBxeSusYuFCy2s1dU9eqhaOIsK-qk2bhKeom1ihXggL_4yqdDjW8jULbRm9mz1q-LoUHpbAfcQraQVShPvM" />
            </div>
          </div>
        </header>

        <main className="p-margin w-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-h1 text-h1 text-primary">New Room Reservation</h2>
              <p className="font-body-md text-body-md text-secondary">Create a new booking entry for LuxStay Premier Suites.</p>
            </div>
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <span>Calendar</span>
              <span className="material-symbols-outlined text-xs" data-icon="chevron_right">chevron_right</span>
              <span className="text-primary font-semibold">New Booking</span>
            </nav>
          </div>

          <form className="grid grid-cols-12 gap-gutter items-start" onSubmit={handleSubmit}>
            <div className="col-span-12 lg:col-span-8 space-y-gutter">
              <section className="bg-white rounded-xl shadow-sm p-lg border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined p-2 bg-blue-50 text-blue-700 rounded-lg" data-icon="person">person</span>
                  <h3 className="font-h3 text-h3">Guest Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="guest-name">FULL NAME</label>
                    <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="guest-name" placeholder="e.g. Jonathan Doe" type="text" required value={guestName} onChange={(e) => setGuestName(e.target.value)} />
                  </div>
                  <div className="space-y-xs">
                    <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="loyalty-id">LOYALTY ID (OPTIONAL)</label>
                    <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="loyalty-id" placeholder="LX-8829-10" type="text" />
                  </div>
                  <div className="space-y-xs">
                    <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="guest-email">EMAIL ADDRESS</label>
                    <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="guest-email" placeholder="j.doe@example.com" type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
                  </div>
                  <div className="space-y-xs">
                    <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="guest-phone">PHONE NUMBER</label>
                    <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="guest-phone" placeholder="+1 (555) 000-0000" type="tel" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} />
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl shadow-sm p-lg border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined p-2 bg-blue-50 text-blue-700 rounded-lg" data-icon="bed">bed</span>
                  <h3 className="font-h3 text-h3">Stay Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-8">
                  <div className="space-y-xs">
                    <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="check-in">CHECK-IN DATE</label>
                    <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="check-in" type="date" required value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                  </div>
                  <div className="space-y-xs">
                    <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="check-out">CHECK-OUT DATE</label>
                    <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="check-out" type="date" required value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                  </div>
                  <div className="space-y-xs">
                    <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="adults">ADULTS</label>
                    <select className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="adults" value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
                      <option value={1}>1 Adult</option>
                      <option value={2}>2 Adults</option>
                      <option value={3}>3 Adults</option>
                      <option value={4}>4 Adults</option>
                    </select>
                  </div>
                  <div className="space-y-xs">
                    <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="children">CHILDREN</label>
                    <select className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" defaultValue="0 Children" id="children">
                      <option>0 Children</option>
                      <option>1 Child</option>
                      <option>2 Children</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-md">
                  <label className="block font-label-bold text-label-bold text-on-surface-variant">SELECT ROOM TYPE</label>
                  {roomTypes.length === 0 && (
                    <p className="text-body-sm text-secondary">No room types configured yet. Add one under Room Management.</p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                    {roomTypes.map((room) => (
                      <label className="relative group cursor-pointer" key={room.id}>
                        <input className="peer absolute opacity-0" checked={roomTypeId === room.id} onChange={() => setRoomTypeId(room.id)} name="room_type" type="radio" />
                        <div className="p-md rounded-xl border border-outline-variant peer-checked:border-primary peer-checked:bg-blue-50/30 transition-all hover:bg-slate-50 h-full flex flex-col">
                          <div className="mb-3 overflow-hidden rounded-lg bg-slate-100 h-32 flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-300 text-5xl">bed</span>
                          </div>
                          <p className="font-bold text-primary text-sm">{room.name}</p>
                          <p className="text-xs text-secondary mt-1">Sleeps {room.capacity}</p>
                          <p className="mt-auto pt-3 font-bold text-primary text-md">${room.base_price}<span className="text-xs font-normal text-secondary">/night</span></p>
                        </div>
                        <div className="absolute top-2 right-2 hidden peer-checked:block text-primary">
                          <span className="material-symbols-outlined text-lg" data-icon="check_circle" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl shadow-sm p-lg border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined p-2 bg-blue-50 text-blue-700 rounded-lg" data-icon="note_alt">note_alt</span>
                  <h3 className="font-h3 text-h3">Special Requests</h3>
                </div>
                <div className="space-y-xs">
                  <label className="block font-label-bold text-label-bold text-on-surface-variant" htmlFor="guest-notes">GUEST NOTES &amp; INSTRUCTIONS</label>
                  <textarea className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" id="guest-notes" placeholder="Mention allergies, late check-in, preferred floor, or airport shuttle requirements..." rows={4} value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                </div>
              </section>
            </div>

            <aside className="col-span-12 lg:col-span-4 sticky top-24">
              <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
                <div className="bg-primary p-lg text-white">
                  <h4 className="font-h3 text-h3 text-white">Booking Summary</h4>
                  <p className="text-blue-200 text-xs mt-1">Review selection before confirmation</p>
                </div>
                <div className="p-lg space-y-md">
                  <div className="space-y-sm">
                    <div className="flex justify-between text-body-md font-medium text-secondary">
                      <span>{selectedType?.name ?? 'Room'} ({nights} night{nights === 1 ? '' : 's'})</span>
                      <span className="text-primary">${roomTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-body-md font-medium text-secondary">
                      <span>Service Fee (Fixed)</span>
                      <span className="text-primary">${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-body-md font-medium text-secondary">
                      <span>Tourism Tax (12%)</span>
                      <span className="text-primary">${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  <hr className="border-slate-100" />
                  <div className="flex justify-between items-center py-2">
                    <span className="font-bold text-primary text-lg">Estimated Total</span>
                    <span className="font-extrabold text-primary text-2xl">${total.toFixed(2)}</span>
                  </div>
                  {error && (
                    <p className="text-error font-body-sm text-body-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">error</span>{error}
                    </p>
                  )}
                  <div className="bg-surface-container-low p-md rounded-lg border border-blue-100/50">
                    <div className="flex gap-3">
                      <span className="material-symbols-outlined text-blue-700" data-icon="info">info</span>
                      <p className="text-xs text-secondary leading-relaxed">
                        Check-in: 14:00 • Check-out: 11:00. Cancellations permitted up to 48 hours before arrival for a full refund.
                      </p>
                    </div>
                  </div>
                  <div className="pt-lg space-y-md">
                    <button className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60" type="submit" disabled={submitting}>
                      {submitting ? 'Creating…' : 'Confirm Booking'}
                      <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
                    </button>
                    <a className="w-full py-3 bg-white text-secondary border border-outline-variant rounded-lg font-bold hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center" href="/dashboard">
                      Cancel &amp; Return
                    </a>
                  </div>
                </div>
                <div className="p-md bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm" data-icon="verified_user">verified_user</span>
                    SECURE BOOKING
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm" data-icon="sync">sync</span>
                    REAL-TIME UPDATE
                  </div>
                </div>
              </div>

              <div className="mt-md bg-white rounded-xl shadow-sm border border-slate-100 p-md flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-slate-200 overflow-hidden flex-shrink-0">
                  <img alt="Property Location Map" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCadUK4_zJnHnRvjJJNhxlh7ywgoH5Y4Su0OiIuAyifMDuCWkYud_8QW5Qn28-zPYHjoDw87Jus_RZf9l4uqOxNV6z1FrFGuWRBbYH7wNpzSbgrXM_wFxksE8ZIhzD6KYuOtjufc8Qsadd5amCBRJVkZoiULRgb3M5yuNYEN3-3G-79oNZlSb9YNP0nnzlZYXq5_empjziqczLhE2_--4UR4IzSG8eVH0igJKH8gH1jDgdVFrToHCJhMVNSd7qf33I1nzjtfFymS_Y" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary">LuxStay Premier Suites</p>
                  <p className="text-[10px] text-secondary leading-tight mt-1">482 Park Avenue, Manhattan<br />New York, NY 10022</p>
                </div>
              </div>
            </aside>
          </form>
        </main>
      </div>
    </div>
  )
}

export default NewBooking
