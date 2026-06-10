const BookingConfirmation = () => {
    return (
        <div className="bg-background text-on-background min-h-screen flex">
            {/* SideNavBar Shell */}
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
                {/* TopNavBar Shell */}
                <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-2 w-full bg-white dark:bg-slate-950 text-[#102A43] dark:text-slate-100 font-manrope antialiased border-b border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-full max-w-md">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" data-icon="search">search</span>
                            <input className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-700/20" placeholder="Search bookings, rooms, guests..." type="text" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors rounded-full relative">
                            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors rounded-full">
                            <span className="material-symbols-outlined" data-icon="help">help</span>
                        </button>
                        <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors rounded-full">
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
                
                {/* Main Content Canvas */}
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
                    
                    {/* Booking Content Grid */}
                    <div className="grid grid-cols-12 gap-gutter items-start">
                        {/* Left Column: Form */}
                        <div className="col-span-12 lg:col-span-8 space-y-gutter pb-margin">
                            {/* Section: Guest Information */}
                            <section className="bg-white rounded-xl shadow-sm p-lg border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="material-symbols-outlined p-2 bg-blue-50 text-blue-700 rounded-lg" data-icon="person">person</span>
                                    <h3 className="font-h3 text-h3">Guest Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                                    <div className="space-y-xs">
                                        <label className="block font-label-bold text-label-bold text-on-surface-variant">FULL NAME</label>
                                        <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" placeholder="e.g. Jonathan Doe" type="text" />
                                    </div>
                                    <div className="space-y-xs">
                                        <label className="block font-label-bold text-label-bold text-on-surface-variant">LOYALTY ID (OPTIONAL)</label>
                                        <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" placeholder="LX-8829-10" type="text" />
                                    </div>
                                    <div className="space-y-xs">
                                        <label className="block font-label-bold text-label-bold text-on-surface-variant">EMAIL ADDRESS</label>
                                        <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" placeholder="j.doe@example.com" type="email" />
                                    </div>
                                    <div className="space-y-xs">
                                        <label className="block font-label-bold text-label-bold text-on-surface-variant">PHONE NUMBER</label>
                                        <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" placeholder="+1 (555) 000-0000" type="tel" />
                                    </div>
                                </div>
                            </section>
                            
                            {/* Section: Stay Details & Room Selection */}
                            <section className="bg-white rounded-xl shadow-sm p-lg border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="material-symbols-outlined p-2 bg-blue-50 text-blue-700 rounded-lg" data-icon="bed">bed</span>
                                    <h3 className="font-h3 text-h3">Stay Details</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-8">
                                    <div className="space-y-xs">
                                        <label className="block font-label-bold text-label-bold text-on-surface-variant">CHECK-IN DATE</label>
                                        <div className="relative">
                                            <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" type="date" />
                                        </div>
                                    </div>
                                    <div className="space-y-xs">
                                        <label className="block font-label-bold text-label-bold text-on-surface-variant">CHECK-OUT DATE</label>
                                        <div className="relative">
                                            <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" type="date" />
                                        </div>
                                    </div>
                                    <div className="space-y-xs">
                                        <label className="block font-label-bold text-label-bold text-on-surface-variant">ADULTS</label>
                                        <select className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" defaultValue="2 Adults">
                                            <option>1 Adult</option>
                                            <option>2 Adults</option>
                                            <option>3 Adults</option>
                                            <option>4 Adults</option>
                                        </select>
                                    </div>
                                    <div className="space-y-xs">
                                        <label className="block font-label-bold text-label-bold text-on-surface-variant">CHILDREN</label>
                                        <select className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" defaultValue="0 Children">
                                            <option>0 Children</option>
                                            <option>1 Child</option>
                                            <option>2 Children</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-md">
                                    <label className="block font-label-bold text-label-bold text-on-surface-variant">SELECT AVAILABLE ROOM TYPE</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                                        {/* Room Option 1 */}
                                        <label className="relative group cursor-pointer">
                                            <input defaultChecked className="peer absolute opacity-0" name="room_type" type="radio" />
                                            <div className="p-md rounded-xl border border-outline-variant peer-checked:border-primary peer-checked:bg-blue-50/30 transition-all hover:bg-slate-50 h-full flex flex-col">
                                                <div className="mb-3 overflow-hidden rounded-lg">
                                                    <img alt="Deluxe King Room" className="w-full h-32 object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnmpa8BlRyTr64w0abS3pcmAOB0EQ6jtn3kiIJh2uqud42jOobgq4AowENRh9LQ8RCkfxSmKD0dtNs_xvIoZOoNQZxuE0phwiiFui_Lc0hs5mg-LeyKVNyqY2QwoJd1rokyo3cAeH4DdqE3c2OEiaIYvM2LYcbvxtepurmo5MxEHOF5cd7Yuad9ixfkj4kOHBK2zycroBSLstgclzqlnCwe_spqkChs_si5rc1WhKx8zVUWLpfqEdv-9-9v-VrWuCNGZjtNAkUcSk" />
                                                </div>
                                                <p className="font-bold text-primary text-sm">Deluxe King</p>
                                                <p className="text-xs text-secondary mt-1">45 m² • City View</p>
                                                <p className="mt-auto pt-3 font-bold text-primary text-md">$249<span className="text-xs font-normal text-secondary">/night</span></p>
                                            </div>
                                            <div className="absolute top-2 right-2 hidden peer-checked:block text-primary">
                                                <span className="material-symbols-outlined text-lg" data-icon="check_circle" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                            </div>
                                        </label>
                                        
                                        {/* Room Option 2 */}
                                        <label className="relative group cursor-pointer">
                                            <input className="peer absolute opacity-0" name="room_type" type="radio" />
                                            <div className="p-md rounded-xl border border-outline-variant peer-checked:border-primary peer-checked:bg-blue-50/30 transition-all hover:bg-slate-50 h-full flex flex-col">
                                                <div className="mb-3 overflow-hidden rounded-lg">
                                                    <img alt="Executive Suite" className="w-full h-32 object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk-1SgNDmRVdZHcvpuYPyEGQeQKVAzviKZ0zLMh7ZVZuLVNDYt0-smR2bL25Wk_NoIjzImUIyCEEes0JvAWbXt74fIQ0XVsZQVvXuGTUUN1ybcbYLu4D1zZ9PGtRaSDolEnuPPuXBa5Kyw13ndFNaUaGsDIksDZ9dRxsLQOBkOKcGryGZoSV0pWaMwdS8kcuqsgAv3qIahDzhUmS9ecfNKCujBxI4MEpz2Ef0aLpQJWAbxovizyHW-XDVG-_TQiP-FeURBr-qw0GY" />
                                                </div>
                                                <p className="font-bold text-primary text-sm">Executive Suite</p>
                                                <p className="text-xs text-secondary mt-1">72 m² • Terrace</p>
                                                <p className="mt-auto pt-3 font-bold text-primary text-md">$480<span className="text-xs font-normal text-secondary">/night</span></p>
                                            </div>
                                            <div className="absolute top-2 right-2 hidden peer-checked:block text-primary">
                                                <span className="material-symbols-outlined text-lg" data-icon="check_circle" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                            </div>
                                        </label>
                                        
                                        {/* Room Option 3 */}
                                        <label className="relative group cursor-pointer">
                                            <input className="peer absolute opacity-0" name="room_type" type="radio" />
                                            <div className="p-md rounded-xl border border-outline-variant peer-checked:border-primary peer-checked:bg-blue-50/30 transition-all hover:bg-slate-50 h-full flex flex-col">
                                                <div className="mb-3 overflow-hidden rounded-lg">
                                                    <img alt="Junior Twin Room" className="w-full h-32 object-cover transition-transform group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUMT5L2zjSCPpcb7H9RGMfKaTK2eEouLHKFhTUPeTuwycwonkdfSEUeFPSkqmGnvPvE_jzUxuFWmsxZ2XqrGB_eNjXRQoA6O3LASAWw74CM05KHwzs6V2VwNAi2V0iWYKTUcAJiQeYw5NQFMhaz_zntzuutuTArWt7Bv9BiIKs0-7RAJJVA90KJAbezpHxQel6UMElVrCrQ7Iosgo8hfg9wirtrBShj6NLypGAurgHgqZvFDZbSWb-LNvEDXkKpMYoPj3z5o_o4qM" />
                                                </div>
                                                <p className="font-bold text-primary text-sm">Junior Twin</p>
                                                <p className="text-xs text-secondary mt-1">38 m² • Courtyard</p>
                                                <p className="mt-auto pt-3 font-bold text-primary text-md">$185<span className="text-xs font-normal text-secondary">/night</span></p>
                                            </div>
                                            <div className="absolute top-2 right-2 hidden peer-checked:block text-primary">
                                                <span className="material-symbols-outlined text-lg" data-icon="check_circle" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </section>
                            
                            {/* Section: Special Requests */}
                            <section className="bg-white rounded-xl shadow-sm p-lg border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="material-symbols-outlined p-2 bg-blue-50 text-blue-700 rounded-lg" data-icon="note_alt">note_alt</span>
                                    <h3 className="font-h3 text-h3">Special Requests</h3>
                                </div>
                                <div className="space-y-xs">
                                    <label className="block font-label-bold text-label-bold text-on-surface-variant">GUEST NOTES & INSTRUCTIONS</label>
                                    <textarea className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" placeholder="Mention allergies, late check-in, preferred floor, or airport shuttle requirements..." rows={4}></textarea>
                                </div>
                            </section>
                            
                            {/* Section: Payment Details */}
                            <section className="bg-white rounded-xl shadow-sm p-lg border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="material-symbols-outlined p-2 bg-blue-50 text-blue-700 rounded-lg" data-icon="payments">payments</span>
                                    <h3 className="font-h3 text-h3">Payment Details</h3>
                                </div>
                                <div className="space-y-lg">
                                    <div className="space-y-xs">
                                        <label className="block font-label-bold text-label-bold text-on-surface-variant">PAYMENT METHOD</label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                                            <label className="flex items-center gap-3 p-md border border-outline-variant rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                                                <input defaultChecked className="text-primary focus:ring-primary h-4 w-4" name="payment_method" type="radio" />
                                                <span className="font-body-md text-primary font-semibold">Credit/Debit Card</span>
                                            </label>
                                            <label className="flex items-center gap-3 p-md border border-outline-variant rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                                                <input className="text-primary focus:ring-primary h-4 w-4" name="payment_method" type="radio" />
                                                <span className="font-body-md text-primary font-semibold">PayPal</span>
                                            </label>
                                            <label className="flex items-center gap-3 p-md border border-outline-variant rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                                                <input className="text-primary focus:ring-primary h-4 w-4" name="payment_method" type="radio" />
                                                <span className="font-body-md text-primary font-semibold">Bank Transfer</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-2">
                                        <div className="space-y-xs md:col-span-2">
                                            <label className="block font-label-bold text-label-bold text-on-surface-variant">CARDHOLDER NAME</label>
                                            <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" placeholder="Johnathan Doe" type="text" />
                                        </div>
                                        <div className="space-y-xs">
                                            <label className="block font-label-bold text-label-bold text-on-surface-variant">CARD NUMBER</label>
                                            <div className="relative">
                                                <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md pl-10" placeholder="0000 0000 0000 0000" type="text" />
                                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" data-icon="credit_card">credit_card</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-md">
                                            <div className="space-y-xs">
                                                <label className="block font-label-bold text-label-bold text-on-surface-variant">EXPIRY DATE</label>
                                                <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" placeholder="MM/YY" type="text" />
                                            </div>
                                            <div className="space-y-xs">
                                                <label className="block font-label-bold text-label-bold text-on-surface-variant">CVV</label>
                                                <input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary font-body-md text-body-md" placeholder="•••" type="password" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 pt-2">
                                        <input defaultChecked className="h-4 w-4 text-primary focus:ring-primary border-outline-variant rounded" id="use_guest_address" type="checkbox" />
                                        <label className="font-body-md text-on-surface-variant cursor-pointer" htmlFor="use_guest_address">Use guest address for billing</label>
                                    </div>
                                </div>
                            </section>
                        </div>
                        
                        {/* Right Column: Summary Card */}
                        <aside className="col-span-12 lg:col-span-4 sticky top-24">
                            <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
                                <div className="bg-primary p-lg text-white">
                                    <h4 className="font-h3 text-h3 text-white">Booking Summary</h4>
                                    <p className="text-blue-200 text-xs mt-1">Review selection before confirmation</p>
                                </div>
                                <div className="p-lg space-y-md">
                                    <div className="space-y-sm">
                                        <div className="flex justify-between text-body-md font-medium text-secondary">
                                            <span>Deluxe King (3 nights)</span>
                                            <span className="text-primary">$747.00</span>
                                        </div>
                                        <div className="flex justify-between text-body-md font-medium text-secondary">
                                            <span>Service Fee (Fixed)</span>
                                            <span className="text-primary">$45.00</span>
                                        </div>
                                        <div className="flex justify-between text-body-md font-medium text-secondary">
                                            <span>Tourism Tax (12%)</span>
                                            <span className="text-primary">$89.64</span>
                                        </div>
                                    </div>
                                    
                                    <hr className="border-slate-100" />
                                    
                                    <div className="flex justify-between items-center py-2">
                                        <span className="font-bold text-primary text-lg">Estimated Total</span>
                                        <span className="font-extrabold text-primary text-2xl">$881.64</span>
                                    </div>
                                    
                                    <div className="bg-surface-container-low p-md rounded-lg border border-blue-100/50">
                                        <div className="flex gap-3">
                                            <span className="material-symbols-outlined text-blue-700" data-icon="info">info</span>
                                            <p className="text-xs text-secondary leading-relaxed">
                                                Check-in: 14:00 • Check-out: 11:00. 
                                                Cancellations permitted up to 48 hours before arrival for a full refund.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-lg space-y-md">
                                        <button className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                            Confirm Booking
                                            <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
                                        </button>
                                        <button className="w-full py-3 bg-white text-secondary border border-outline-variant rounded-lg font-bold hover:bg-slate-50 active:scale-[0.98] transition-all">
                                            Cancel & Return
                                        </button>
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
                            
                            {/* Mini Map Card */}
                            <div className="mt-md bg-white rounded-xl shadow-sm border border-slate-100 p-md flex items-center gap-4">
                                <div className="w-16 h-16 rounded-lg bg-slate-200 overflow-hidden flex-shrink-0">
                                    <img alt="Property Location Map" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCadUK4_zJnHnRvjJJNhxlh7ywgoH5Y4Su0OiIuAyifMDuCWkYud_8QW5Qn28-zPYHjoDw87Jus_RZf9l4uqOxNV6z1FrFGuWRBbYH7wNpzSbgrXM_wFxksE8ZIhzD6KYuOtjufc8Qsadd5amCBRJVkZoiULRgb3M5yuNYEN3-3G-79oNZlSb9YNP0nnzlZYXq5_empjziqczLhE2_--4UR4IzSG8eVH0igJKH8gH1jDgdVFrToHCJhMVNSd7qf33I1nzjtfFymS_Y" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-primary">LuxStay Premier Suites</p>
                                    <p className="text-[10px] text-secondary leading-tight mt-1">482 Park Avenue, Manhattan<br/>New York, NY 10022</p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BookingConfirmation;
