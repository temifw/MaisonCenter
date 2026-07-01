import { useState, type FormEvent } from 'react';
import Layout from '../components/Layout';
import { hotelService, type BookingLookup } from '../services/hotelService';

const fmtDate = (d: string) => {
  try {
    return new Date(d + 'T00:00:00').toLocaleDateString(undefined, {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch {
    return d;
  }
};

const statusLabel = (s: string) =>
  s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const MyBooking = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingLookup | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBooking(null);
    if (!code.trim() || !email.trim()) {
      setError('Please enter your booking code and email.');
      return;
    }
    setBusy(true);
    try {
      const res = await hotelService.lookupBooking(code.trim(), email.trim());
      setBooking(res.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          'We could not find a booking matching that code and email.'
      );
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setBooking(null);
    setError(null);
  };

  if (booking) {
    const nights = Math.max(
      0,
      Math.round(
        (new Date(booking.check_out).getTime() - new Date(booking.check_in).getTime()) /
          86400000
      )
    );
    return (
      <Layout>
        <div className="pt-40 pb-32 px-6 md:px-12 flex justify-center">
          <div className="w-full max-w-xl">
            <span className="font-label-caps text-[#776E20] mb-4 block text-center">YOUR RESERVATION</span>
            <h1 className="font-display-lg text-4xl text-stone-900 mb-2 text-center">{booking.booking_code}</h1>
            <p className="text-center text-stone-500 font-body-md mb-10">
              {statusLabel(booking.status)}
            </p>

            <div className="border border-stone-200 p-8 text-left space-y-3 mb-10">
              <div className="flex justify-between"><span className="text-stone-500">Guest</span><span>{booking.guest_name}</span></div>
              <div className="flex justify-between"><span className="text-stone-500">Room</span><span>{booking.room_type} · {booking.room_number}</span></div>
              <div className="flex justify-between"><span className="text-stone-500">Check-in</span><span>{fmtDate(booking.check_in)}</span></div>
              <div className="flex justify-between"><span className="text-stone-500">Check-out</span><span>{fmtDate(booking.check_out)}</span></div>
              <div className="flex justify-between"><span className="text-stone-500">Guests</span><span>{booking.guests_count}</span></div>
              {booking.special_requests && (
                <div className="flex justify-between gap-8"><span className="text-stone-500">Requests</span><span className="text-right">{booking.special_requests}</span></div>
              )}
              <div className="flex justify-between font-bold border-t border-stone-200 pt-3"><span>Total{nights > 0 ? ` (${nights} night${nights === 1 ? '' : 's'})` : ''}</span><span>${Number(booking.total_price).toFixed(2)}</span></div>
            </div>

            <div className="text-center">
              <button onClick={reset} className="inline-block px-10 py-4 border border-stone-900 text-stone-900 font-label-caps tracking-[0.2em] uppercase hover:bg-stone-900 hover:text-white transition-colors">
                Look Up Another
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-40 pb-32 px-6 md:px-12 flex justify-center">
        <div className="w-full max-w-md">
          <span className="font-label-caps text-[#776E20] mb-4 block text-center">MY BOOKING</span>
          <h1 className="font-display-lg text-4xl text-stone-900 mb-4 text-center">Find Your Reservation</h1>
          <p className="text-center text-stone-500 font-body-md mb-10">
            Enter the booking code from your confirmation along with the email you booked with.
          </p>
          {error && <p className="mb-6 text-center text-red-700 text-sm">{error}</p>}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none tracking-widest uppercase"
              placeholder="Booking code (e.g. MC-7K4PQ9RD)"
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <input
              className="w-full border border-stone-300 px-4 py-4 font-body-md focus:border-[#776E20] outline-none"
              placeholder="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="w-full py-4 bg-stone-900 text-white font-label-caps tracking-[0.2em] uppercase hover:bg-[#776e20] transition-colors disabled:opacity-60"
              type="submit"
              disabled={busy}
            >
              {busy ? 'Searching…' : 'View My Booking'}
            </button>
          </form>
          <p className="mt-8 text-center text-stone-500 font-body-md">
            No reservation yet? <a className="text-[#776E20] underline" href="/book">Book your stay</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default MyBooking;
