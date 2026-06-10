import './App.css'
import BookingCalendar from './pages/BookingCalendar'
import BookingConfirmation from './pages/BookingConfirmation'
import Dashboard from './pages/Dashboard'
import GuestDirectory from './pages/GuestDirectory'
import NewBooking from './pages/NewBooking'
import NewRoom from './pages/NewRoom'
import RoomDetail from './pages/RoomDetail'
import RoomManagement from './pages/RoomManagement'
import SignIn from './pages/SignIn'

function App() {
  const path = window.location.pathname

  if (path === '/' || path === '/sign-in') {
    return <SignIn />
  }

  if (path === '/dashboard') {
    return <Dashboard />
  }

  if (path === '/rooms') {
    return <RoomManagement />
  }

  if (path === '/calendar') {
    return <BookingCalendar />
  }

  if (path === '/guests') {
    return <GuestDirectory />
  }

  if (path === '/booking-confirmation') {
    return <BookingConfirmation />
  }

  if (path === '/new-booking') {
    return <NewBooking />
  }

  if (path === '/new-room') {
    return <NewRoom />
  }

  if (path === '/room-detail') {
    return <RoomDetail />
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="font-h1 text-h1 text-primary mb-3">Page not found</h1>
        <p className="font-body-md text-body-md text-secondary mb-6">
          The page you requested is not available in LuxStay Management.
        </p>
        <a className="inline-flex items-center justify-center rounded-lg bg-primary px-lg py-sm font-label-bold text-on-primary" href="/dashboard">
          Go to Dashboard
        </a>
      </div>
    </div>
  )
}

export default App
