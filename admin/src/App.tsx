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
import { RequireAuth } from './components/RequireAuth'

function App() {
  const path = window.location.pathname

  if (path === '/' || path === '/sign-in') {
    return <SignIn />
  }

  // Everything below requires an authenticated staff user.
  const protect = (page: React.ReactNode) => <RequireAuth>{page}</RequireAuth>

  if (path === '/dashboard') return protect(<Dashboard />)
  if (path === '/rooms') return protect(<RoomManagement />)
  if (path === '/calendar') return protect(<BookingCalendar />)
  if (path === '/guests') return protect(<GuestDirectory />)
  if (path === '/booking-confirmation') return protect(<BookingConfirmation />)
  if (path === '/new-booking') return protect(<NewBooking />)
  if (path === '/new-room') return protect(<NewRoom />)
  if (path === '/room-detail') return protect(<RoomDetail />)

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
