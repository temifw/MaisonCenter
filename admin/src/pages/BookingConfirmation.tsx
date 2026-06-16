import { useEffect, useRef } from 'react'

const BookingConfirmation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationFrameId: number
    const particles: {
      x: number
      y: number
      size: number
      color: string
      speed: number
      angle: number
      spin: number
    }[] = []
    const colors = ['#102A43', '#49607c', '#d1e4ff', '#001d32', '#c4e0fe']

    function createParticle() {
      return {
        x: Math.random() * canvas!.width,
        y: -20,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * 2 * Math.PI,
        spin: Math.random() * 0.2 - 0.1,
      }
    }

    function initConfetti() {
      for (let i = 0; i < 150; i++) {
        particles.push(createParticle())
      }
      animateConfetti()
    }

    function animateConfetti() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.y += p.speed
        p.x += Math.sin(p.angle) * 2
        p.angle += p.spin

        ctx.fillStyle = p.color
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()

        if (p.y > canvas.height) {
          particles.splice(i, 1)
        }
      }

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(animateConfetti)
      }
    }

    const timeoutId = setTimeout(initConfetti, 500)

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="bg-background font-body-md text-on-background min-h-screen">
      <canvas
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[60]"
        ref={canvasRef}
      />
      {/* SideNavBar */}
      <nav className="fixed left-0 top-0 h-full flex flex-col z-50 bg-white border-r border-slate-200 shadow-sm w-64">
        <div className="p-lg flex flex-col gap-2">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">apartment</span>
            </div>
            <div>
              <h2 className="font-extrabold tracking-tight text-[#102A43] text-lg">LuxStay Management</h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Corporate Admin</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-1 px-2">
          <a className="text-slate-600 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 transition-all rounded-lg" href="/dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-manrope text-sm font-medium">Dashboard</span>
          </a>
          <a className="text-slate-600 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 transition-all rounded-lg" href="/rooms">
            <span className="material-symbols-outlined">bed</span>
            <span className="font-manrope text-sm font-medium">Room Management</span>
          </a>
          <a className="bg-blue-50 text-blue-700 border-r-4 border-blue-700 px-4 py-3 flex items-center gap-3 font-manrope text-sm font-medium" href="/calendar">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="font-manrope text-sm font-medium">Booking Calendar</span>
          </a>
          <a className="text-slate-600 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 transition-all rounded-lg" href="/guests">
            <span className="material-symbols-outlined">group</span>
            <span className="font-manrope text-sm font-medium">Guest Directory</span>
          </a>
        </div>
        <div className="mt-auto border-t border-slate-100 p-2">
          <a className="text-slate-600 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 transition-all rounded-lg" href="#support">
            <span className="material-symbols-outlined">contact_support</span>
            <span className="font-manrope text-sm font-medium">Support</span>
          </a>
          <a className="text-slate-600 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 transition-all rounded-lg" href="/sign-in">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-manrope text-sm font-medium">Sign Out</span>
          </a>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="ml-64 p-margin">
        <div className="max-w-5xl mx-auto">
          {/* 1. Confirmation Header */}
          <div className="flex flex-col items-center text-center mb-xl">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-md shadow-sm border border-green-200">
              <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'wght' 600" }}>check_circle</span>
            </div>
            <h1 className="font-h1 text-h1 text-primary-container mb-xs">Booking Confirmed!</h1>
            <p className="text-secondary font-body-lg">Reservation ID: <span className="font-bold text-primary">#LX-99210</span></p>
            <div className="mt-sm bg-green-50 text-green-700 px-4 py-1 rounded-full text-label-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">verified</span>
              Payment Received &amp; Guaranteed
            </div>
          </div>
          {/* Bento Grid Layout for Summary */}
          <div className="grid grid-cols-12 gap-gutter">
            {/* 2. Stay Summary Card (Main) */}
            <div className="col-span-8 space-y-gutter">
              {/* Room Details & Dates */}
              <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(16,42,67,0.06)] overflow-hidden border border-slate-100">
                <div className="flex h-64">
                  <div className="w-2/5 relative">
                    <img alt="A luxurious hotel suite with a king-sized bed dressed in high-thread count white linens, minimalist modern furniture, large floor-to-ceiling windows overlooking a serene garden, and warm ambient lighting. The atmosphere is sophisticated, airy, and high-end, perfectly aligned with a professional corporate property management aesthetic." className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOGIqnUQnKOa-D8WrxrnTXlEyq7zXKRiBlErV0DgDspBDuZVVygK0hts_OxTvBtrMu39j-JJv-ulUJiEHcyIIu7cFj2qV1J024ChADeyYZydp4lzLaOhegkg2aAesEX7LFG_8Sb0dyPPFfRmngoDucI8lY65JV9JFR03c58liqpnlDmun0ytjZRBOX_TgZJRuPJwSZqFrq9M--5x64TvDSIz8DuIWYYDF8l7Xo-n6RrCT0_PxGnZ-kwsrVl0tyodx8c9VJtCVnR8o" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded shadow-sm text-label-bold text-primary">
                      EXECUTIVE SUITE
                    </div>
                  </div>
                  <div className="w-3/5 p-lg flex flex-col justify-between">
                    <div>
                      <h3 className="font-h2 text-h2 text-primary-container mb-2">Executive Garden Suite</h3>
                      <p className="text-on-surface-variant font-body-md flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">location_on</span>
                        Wing A, Level 4 • Room 402
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-md py-md border-y border-slate-100">
                      <div>
                        <p className="text-label-bold text-secondary uppercase tracking-wider mb-1">Check-In</p>
                        <p className="font-h3 text-h3 text-primary-container">Oct 24, 2023</p>
                        <p className="text-body-sm text-on-surface-variant">From 3:00 PM</p>
                      </div>
                      <div>
                        <p className="text-label-bold text-secondary uppercase tracking-wider mb-1">Check-Out</p>
                        <p className="font-h3 text-h3 text-primary-container">Oct 28, 2023</p>
                        <p className="text-body-sm text-on-surface-variant">By 11:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-lg">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">person</span>
                        <span className="font-data-tabular">2 Guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">nights_stay</span>
                        <span className="font-data-tabular">4 Nights</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Guest Info Card */}
              <div className="bg-white rounded-xl p-lg shadow-[0px_4px_20px_rgba(16,42,67,0.06)] border border-slate-100">
                <div className="flex justify-between items-center mb-md">
                  <h4 className="font-h3 text-h3 text-primary-container">Guest Information</h4>
                  <button className="text-primary font-label-bold hover:underline" type="button">Edit Details</button>
                </div>
                <div className="grid grid-cols-3 gap-lg">
                  <div className="flex items-start gap-3">
                    <div className="bg-surface-container text-secondary p-2 rounded-lg">
                      <span className="material-symbols-outlined">badge</span>
                    </div>
                    <div>
                      <p className="text-label-bold text-secondary uppercase text-[10px]">Primary Guest</p>
                      <p className="font-body-lg text-primary-container font-semibold">Alexander Sterling</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-surface-container text-secondary p-2 rounded-lg">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p className="text-label-bold text-secondary uppercase text-[10px]">Email Address</p>
                      <p className="font-body-lg text-primary-container font-semibold">a.sterling@corporate.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-surface-container text-secondary p-2 rounded-lg">
                      <span className="material-symbols-outlined">phone</span>
                    </div>
                    <div>
                      <p className="text-label-bold text-secondary uppercase text-[10px]">Phone Number</p>
                      <p className="font-body-lg text-primary-container font-semibold">+1 (555) 012-3456</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 3. Payment Summary & Actions (Sidebar) */}
            <div className="col-span-4 space-y-gutter">
              {/* 4. Next Steps */}
              <div className="bg-white rounded-xl p-lg shadow-[0px_4px_20px_rgba(16,42,67,0.06)] border border-slate-100">
                <h4 className="font-label-bold text-secondary uppercase tracking-widest mb-md">Next Steps</h4>
                <div className="flex flex-col gap-sm">
                  <a className="w-full bg-primary-container text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2" href="/dashboard">
                    <span className="material-symbols-outlined">dashboard</span>
                    Go to Dashboard
                  </a>
                  <button className="w-full border border-slate-200 text-primary-container py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2" type="button">
                    <span className="material-symbols-outlined">print</span>
                    Print Confirmation
                  </button>
                  <button className="w-full border border-slate-200 text-primary-container py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2" type="button">
                    <span className="material-symbols-outlined">edit_calendar</span>
                    Manage Booking
                  </button>
                </div>
                <div className="mt-md p-md bg-surface-container-low rounded-lg">
                  <p className="text-body-sm text-secondary">
                    Need to make changes? You can cancel or modify your reservation up to 48 hours before check-in.
                  </p>
                </div>
              </div>
              {/* Helpful Map Link */}
              <div className="bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(16,42,67,0.06)] border border-slate-100 group cursor-pointer">
                <div className="h-32 bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#e5e7eb] flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-400 text-4xl">map</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-primary rounded-full border-2 border-white flex items-center justify-center text-white shadow-lg">
                      <span className="material-symbols-outlined text-xs">location_on</span>
                    </div>
                  </div>
                </div>
                <div className="p-md flex justify-between items-center">
                  <div>
                    <p className="text-label-bold text-primary">Get Directions</p>
                    <p className="text-xs text-secondary">Open in Google Maps</p>
                  </div>
                  <span className="material-symbols-outlined text-secondary group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BookingConfirmation
