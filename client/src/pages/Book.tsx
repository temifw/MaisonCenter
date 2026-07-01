import { useEffect, useMemo, useState, type FormEvent } from 'react';
import Layout from '../components/Layout';
import { hotelService, type RoomType, type Booking } from '../services/hotelService';

const Book = () => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [roomTypeId, setRoomTypeId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [requests, setRequests] = useState('');

  const [availability, setAvailability] = useState<null | boolean>(null);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  useEffect(() => {
    const preset = new URLSearchParams(window.location.search).get('type');
    hotelService.getRoomTypes().then((res) => {
      setRoomTypes(res.data);
      const initial = preset && res.data.some((t) => t.id === preset) ? preset : res.data[0]?.id;
      if (initial) setRoomTypeId(initial);
    }).catch(() => setRoomTypes([]));
  }, []);

  const selected = roomTypes.find((t) => t.id === roomTypeId);
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return ms > 0 ? Math.round(ms / 86400000) : 0;
  }, [checkIn, checkOut]);
  const total = selected ? Number(selected.base_price) * nights : 0;

  useEffect(() => { setAvailability(null); }, [roomTypeId, checkIn, checkOut]);

  const checkAvailability = async () => {
    if (!roomTypeId || nights <= 0) {
      setError('Pick a room and valid dates first.');
      return;
    }
    setError(null);
    setChecking(true);
    try {
      const res = await hotelService.getAvailability(roomTypeId, checkIn, checkOut);
      setAvailability(res.data.length > 0);
    } catch {
      setError('Could not check availability.');
    } finally {
      setChecking(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!roomTypeId) return setError('Please choose a room.');
    if (nights <= 0) return setError('Check-out must be after check-in.');
    setSubmitting(true);
    try {
      const res = await hotelService.createBooking({
        roomTypeId,
        checkIn,
        checkOut,
        guestName,
        guestEmail: guestEmail || undefined,
        guestPhone: guestPhone || undefined,
        guestsCount: guests,
        specialRequests: requests || undefined,
      });
      setConfirmed(res.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Booking failed. The room may have just been taken.');
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <Layout>
        <div className="pt-40 pb-32 px-6 md:px-12 flex justify-center">
          <div className="w-full max-w-xl text-center">
            <span className="material-symbols-outlined text-6xl text-[#776E20] mb-6">check_circle</span>
            <h1 className="font-display-lg text-4xl text-stone-900 mb-4">Reservation Confirmed</h1>
            <p className="text-stone-500 font-body-lg mb-8">
              Thank you, {guestName}. {guestEmail ? 'A confirmation has been sent to your email.' : ''}
            </p>
            <div className="bg-stone-50 border border-[#776E20]/40 p-6 mb-8">
              <span className="font-label-caps text-stone-500 block mb-2">YOUR BOOKING CODE</span>
              <span className="font-mono text-2xl tracking-widest text-stone-900">{confirmed.booking_code}</span>
              <p className="text-stone-500 font-body-md mt-3">
                Keep this code. Retrieve your reservation anytime at{' '}
                <a className="text-[#776E20] underline" href="/my-booking">My Booking</a>{' '}
                using this code and your email.
              </p>
            </div>
            <div className="border border-stone-200 p-8 text-left space-y-3 mb-10">
              <div className="flex justify-between"><span className="text-stone-500">Room</span><span>{selected?.name}</span></div>
              <div className="flex justify-between"><span className="text-stone-500">Check-in</span><span>{confirmed.check_in}</span></div>
              <div className="flex justify-between"><span className="text-stone-500">Check-out</span><span>{confirmed.check_out}</span></div>
              <div className="flex justify-between font-bold"><span>Total</span><span>${Number(confirmed.total_price).toFixed(2)}</span></div>
            </div>
            <a className="inline-block px-10 py-4 bg-stone-900 text-white font-label-caps tracking-[0.2em] uppercase hover:bg-[#776e20] transition-colors" href="/">Return Home</a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-40 pb-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <span className="font-label-caps text-[#776E20] mb-4 block text-center">RESERVATIONS</span>
          <h1 className="font-display-lg text-4xl md:text-display-lg text-stone-900 mb-4 text-center">Book Your Stay</h1>
          <p className="text-center text-stone-500 font-body-md mb-12">
            After booking you'll get a booking code to view your reservation anytime at{' '}
            <a className="text-[#776E20] underline" href="/my-booking">My Booking</a>.
          </p>

          <form className="grid md:grid-cols-2 gap-x-12 gap-y-8 mt-8" onSubmit={handleSubmit}>
            <div className="md:col-span-2">
              <label className="font-label-caps text-stone-500 block mb-3">ROOM</label>
              <select className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none" value={roomTypeId} onChange={(e) => setRoomTypeId(e.target.value)} required>
                {roomTypes.length === 0 && <option value="">No rooms available</option>}
                {roomTypes.map((t) => (
                  <option key={t.id} value={t.id}>{t.name} - ${t.base_price}/night (sleeps {t.capacity})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-label-caps text-stone-500 block mb-3">CHECK-IN</label>
              <input className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none" type="date" required value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            </div>
            <div>
              <label className="font-label-caps text-stone-500 block mb-3">CHECK-OUT</label>
              <input className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none" type="date" required value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </div>

            <div className="md:col-span-2 flex items-center gap-4">
              <button type="button" onClick={checkAvailability} disabled={checking} className="px-6 py-3 border border-stone-900 font-label-caps tracking-widest uppercase text-stone-900 hover:bg-stone-900 hover:text-white transition-colors disabled:opacity-60">
                {checking ? 'Checking...' : 'Check Availability'}
              </button>
              {availability === true && <span className="text-[#776E20] font-body-md">Available for these dates</span>}
              {availability === false && <span className="text-red-700 font-body-md">Not available - try other dates</span>}
            </div>

            <div className="md:col-span-2 border-t border-stone-200 pt-8">
              <label className="font-label-caps text-stone-500 block mb-3">GUEST NAME</label>
              <input className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none" type="text" required value={guestName} onChange={(e) => setGuestName(e.target.value)} />
            </div>
            <div>
              <label className="font-label-caps text-stone-500 block mb-3">EMAIL</label>
              <input className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none" type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
            </div>
            <div>
              <label className="font-label-caps text-stone-500 block mb-3">PHONE</label>
              <input className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none" type="tel" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} />
            </div>
            <div>
              <label className="font-label-caps text-stone-500 block mb-3">GUESTS</label>
              <select className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} Guest{n === 1 ? '' : 's'}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="font-label-caps text-stone-500 block mb-3">SPECIAL REQUESTS</label>
              <textarea className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none" rows={3} value={requests} onChange={(e) => setRequests(e.target.value)} />
            </div>

            <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-stone-200 pt-8">
              <div className="text-center md:text-left">
                <span className="font-label-caps text-stone-400 block">ESTIMATED TOTAL</span>
                <span className="font-headline-md text-3xl text-stone-900">${total.toFixed(2)}</span>
                <span className="text-stone-500 ml-2">{nights > 0 ? `(${nights} night${nights === 1 ? '' : 's'})` : ''}</span>
              </div>
              <button className="px-12 py-5 bg-stone-900 text-white font-label-caps tracking-[0.2em] uppercase hover:bg-[#776e20] transition-colors disabled:opacity-60" type="submit" disabled={submitting}>
                {submitting ? 'Reserving...' : 'Confirm Reservation'}
              </button>
            </div>
            {error && <p className="md:col-span-2 text-red-700 text-center font-body-md">{error}</p>}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Book;
