import React from 'react';

const GuestDirectory: React.FC = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col z-50 bg-white dark:bg-slate-950 w-64 border-r border-slate-200 dark:border-slate-800 shadow-sm font-manrope text-sm font-medium">
        <div className="px-6 py-8 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>bed</span>
            </div>
            <div>
              <h1 className="font-extrabold tracking-tight text-[#102A43] dark:text-white text-lg">LuxStay Management</h1>
              <p className="text-xs text-slate-500">Corporate Admin</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/rooms">
            <span className="material-symbols-outlined">bed</span>
            Room Management
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all scale-98 active:scale-95 duration-200" href="/calendar">
            <span className="material-symbols-outlined">calendar_month</span>
            Booking Calendar
          </a>
          <a className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-4 border-blue-700 px-4 py-3 flex items-center gap-3 scale-98 active:scale-95 duration-200" href="/guests">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            Guest Directory
          </a>
        </nav>
        <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800">
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all" href="#support">
            <span className="material-symbols-outlined">contact_support</span>
            Support
          </a>
          <a className="text-slate-600 dark:text-slate-400 px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all" href="/sign-in">
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </a>
        </div>
      </aside>

      <div className="ml-64 flex flex-col min-h-screen w-full">
        {/* TopNavBar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-2 w-full bg-white dark:bg-slate-950 text-[#102A43] dark:text-slate-100 font-manrope antialiased border-b border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-body-md focus:ring-2 focus:ring-blue-700/20" placeholder="Search guests, bookings, or rooms..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors opacity-80 duration-150">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors opacity-80 duration-150">
              <span className="material-symbols-outlined">help</span>
            </button>
            <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors opacity-80 duration-150 border border-slate-100 dark:border-slate-800">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-[#102A43] dark:text-white">Admin User</p>
                <p className="text-xs text-slate-500">Property Manager</p>
              </div>
              <img alt="Administrator Profile Avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" data-alt="A professional headshot of a corporate property manager in a well-lit modern office environment. The subject is wearing a crisp navy suit and has a friendly, confident expression. The lighting is soft and professional, creating a high-end business aesthetic. The background is slightly blurred, showing a clean glass-partitioned workspace with corporate blue accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw-qnRCH048fkU1kJWLGfv8VVjsAvPjA3OtXCPsGkQhqHDVcHQW-q9r4kmv1lK-budmm5fBQu0e_iK22nijuWE3ssY1h6Db385IkqO3OklwpkRQO8dl8GV_NVRlsad8IjFG0m8r__Q1ULQn43AWdl6kxulSe3uxo21jijjhQ5iDnoVrpwOxQgNGOx-2eaqOwa0icaq0ckD5MCeMDKQChlxajdG_ppjD-C-P_TdzufHyBKzSPEWPAkzimajjV-5r5_KPAHonpG0cxo" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8 w-full">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-h1 text-h1 text-primary">Guest Directory</h2>
              <p className="text-body-md text-secondary mt-1">Manage guest information and loyalty history across all properties.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant text-primary rounded-lg font-data-tabular hover:bg-surface-container transition-all shadow-sm">
                <span className="material-symbols-outlined text-[20px]">download</span>
                Export List
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-lg font-data-tabular hover:bg-primary-container transition-all shadow-md">
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                Add New Guest
              </button>
            </div>
          </div>

          {/* Bento Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col gap-2">
              <span className="text-label-bold text-secondary-fixed-variant uppercase tracking-widest">Total Guests</span>
              <div className="flex items-end justify-between">
                <span className="text-h1 font-h1 text-primary">2,842</span>
                <span className="text-body-sm text-green-600 font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  12%
                </span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col gap-2">
              <span className="text-label-bold text-secondary-fixed-variant uppercase tracking-widest">Active Bookings</span>
              <div className="flex items-end justify-between">
                <span className="text-h1 font-h1 text-primary">156</span>
                <span className="text-body-sm text-secondary">Currently In</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col gap-2">
              <span className="text-label-bold text-secondary-fixed-variant uppercase tracking-widest">Repeat Customers</span>
              <div className="flex items-end justify-between">
                <span className="text-h1 font-h1 text-primary">42%</span>
                <span className="text-body-sm text-blue-600 font-bold">Loyalty Level</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col gap-2">
              <span className="text-label-bold text-secondary-fixed-variant uppercase tracking-widest">Avg. Spend</span>
              <div className="flex items-end justify-between">
                <span className="text-h1 font-h1 text-primary">$1,240</span>
                <span className="text-body-sm text-secondary">Per Guest</span>
              </div>
            </div>
          </div>

          {/* Data Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-surface-container-high overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-container-high flex items-center justify-between bg-surface-container-lowest">
              <div className="flex items-center gap-4">
                <span className="text-label-bold text-primary">Filter By:</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-body-sm font-bold flex items-center gap-1">
                    Status: All <span className="material-symbols-outlined text-sm">close</span>
                  </span>
                  <span className="px-3 py-1 bg-surface-container text-secondary rounded-full text-body-sm hover:bg-surface-container-high cursor-pointer">
                    Tier: VIP
                  </span>
                </div>
              </div>
              <div className="text-body-sm text-secondary">
                Showing 1-10 of 2,842 guests
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-surface-container-high">
                    <th className="px-6 py-4 font-label-bold text-secondary uppercase tracking-wider text-[11px]">Guest Name</th>
                    <th className="px-6 py-4 font-label-bold text-secondary uppercase tracking-wider text-[11px]">Contact Details</th>
                    <th className="px-6 py-4 font-label-bold text-secondary uppercase tracking-wider text-[11px]">Status</th>
                    <th className="px-6 py-4 font-label-bold text-secondary uppercase tracking-wider text-[11px]">Last Stay</th>
                    <th className="px-6 py-4 font-label-bold text-secondary uppercase tracking-wider text-[11px]">Total Spend</th>
                    <th className="px-6 py-4 font-label-bold text-secondary uppercase tracking-wider text-[11px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {/* Row 1 */}
                  <tr className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img alt="Guest" className="w-10 h-10 rounded-full border border-surface-container-highest" data-alt="A portrait of a elegant woman with a warm, professional smile, set against a soft-focus minimalist background. The lighting is natural and bright, echoing a light-mode high-end aesthetic. She represents a premium corporate client, with the image styled in a modern, clean digital format suitable for a luxury stay property management system." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnOeFal1ZKIXoi2C0qbl_jPafbPxG5hBfMS1aOu2ApgjNotGtwCxsYnukDfNEDYwkfjJ8fl_L--_eMzTkbcUdB0dT0BqvQ4TKRuqzA7zplqrncexORvFo8k8HAQDz4E-v34dx23pjDxegjtEB3ctFAVrkOB20Tl2LBZFRRyuZfq77omZ4lQNE8-oks56C-g0DbuEFbH-32yj_1iQHdtFOaiQmsSu_cUhy6N5ovWUZUQJlC8ZEv497QDDqJoikSAXrxCvSLAnwzP8w" />
                        <div>
                          <p className="font-data-tabular text-primary font-bold">Alexandra Sterling</p>
                          <p className="text-body-sm text-blue-600 font-medium">VIP Gold Member</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-body-md text-primary">a.sterling@corporate.com</span>
                        <span className="text-body-sm text-secondary">+1 (555) 012-3456</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-secondary">
                      Oct 12, 2023
                    </td>
                    <td className="px-6 py-4 font-data-tabular text-primary font-bold">
                      $14,250.00
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-4 py-1.5 text-blue-700 border border-blue-700 rounded-lg text-body-sm font-bold hover:bg-blue-700 hover:text-white transition-all">
                        View Profile
                      </button>
                    </td>
                  </tr>
                  
                  {/* Row 2 */}
                  <tr className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img alt="Guest" className="w-10 h-10 rounded-full border border-surface-container-highest" data-alt="A portrait of a professional man in a tailored charcoal sweater, looking towards the camera with a friendly and reliable expression. The background is a blurred high-end interior with soft architectural lighting that complements the clean, corporate design system. The overall mood is sophisticated and modern, reflecting the reliability of the property management brand." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ50VRh6tbaLw2A0PoS7kiOFHvv3ZZ7OwJ84iQdekn8W6K3poZE9LyhHIQEeRlQqryw8_MqQGtE8E_0EnegOmhvZVgZci0joznFovy0fG3E3fwj2I3kqmec5jJADdc4b9vVpYwlROOjR2hPMDkc-I2d8qRI56U_zXsYztWdnLuSHA7aA7fZhaPfrY7r6BJOPBxUZX0VNz2NkF3w4M17nfYLiGaoVJj4hI2Wl5Ue3HOuZAP7JCBhX_tLcPUrnE249ANA01Q3tjN7cg" />
                        <div>
                          <p className="font-data-tabular text-primary font-bold">Marcus Thorne</p>
                          <p className="text-body-sm text-secondary">Regular Guest</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-body-md text-primary">m.thorne@techflow.io</span>
                        <span className="text-body-sm text-secondary">+1 (555) 987-6543</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                        Checked Out
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-secondary">
                      Nov 02, 2023
                    </td>
                    <td className="px-6 py-4 font-data-tabular text-primary font-bold">
                      $4,820.00
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-4 py-1.5 text-blue-700 border border-blue-700 rounded-lg text-body-sm font-bold hover:bg-blue-700 hover:text-white transition-all">
                        View Profile
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img alt="Guest" className="w-10 h-10 rounded-full border border-surface-container-highest" data-alt="A close-up studio portrait of a woman with a confident, serene expression. She is wearing a modern silk blouse in a soft pastel tone. The image is bathed in high-key, even lighting that matches a light-mode UI aesthetic perfectly. The background is a solid, neutral grey, maintaining a clean and premium corporate profile look for a luxury digital interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwRXXFxgbUNXpp0zrGprPiBm4_YZOHq-yvZhIVzpRbiHDiU6oQNWLlTSot1igb4cNd8vl4Ta2Cm-K-hSQZ4OUwaEhYhsBdHRXwRes6JYGMna5Vh0rBwO1aT71qre9OhcE0c4JgRtagbBVFUScIB8oWYT_UvyFTvWz2po-YtMvG3yEuXw3uUSFWdf8Tuu1Q8GvBho9wyE5uRWO5h5bAtUPSuYt4RxZllYPtGRm6OYXqhQQVWsGjrYsiJiZrKFUGWaKBgUY1zs9oTDQ" />
                        <div>
                          <p className="font-data-tabular text-primary font-bold">Elena Rodriguez</p>
                          <p className="text-body-sm text-blue-600 font-medium">VIP Silver Member</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-body-md text-primary">elena.rod@globalres.com</span>
                        <span className="text-body-sm text-secondary">+34 912 345 678</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                        Reserved
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-secondary">
                      Aug 24, 2023
                    </td>
                    <td className="px-6 py-4 font-data-tabular text-primary font-bold">
                      $8,150.00
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-4 py-1.5 text-blue-700 border border-blue-700 rounded-lg text-body-sm font-bold hover:bg-blue-700 hover:text-white transition-all">
                        View Profile
                      </button>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img alt="Guest" className="w-10 h-10 rounded-full border border-surface-container-highest" data-alt="A portrait of a male professional with short hair and a neat beard, wearing a high-quality light blue shirt. He has a neutral, authoritative yet approachable expression. The lighting is diffused and bright, creating a crisp, clean light-mode aesthetic. The background is a minimalist blurred office hallway with soft blue and white tones, ensuring visual consistency with the modern corporate UI." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-dbd4tUjlOQA6-jRcv4Wx9q2HTBy7CtA5unEo0890fRSlqDybHePN3kAi5C3lEkIbq3wsVJiIWW1FIrAJBest_LbAI8Xgf5RGW_teu_Z1bJvfMds-nzyIXOQ-oseOLvcdkpnTRRUF9CQLxrdjLjDuD_QeHRKPw6OWSdWTSZYFMdF4OUIc-8W9vxvHaJv-lhFsOrCLMWcTmXcDBRwiZEBy1nZtbxlvfbvX1WCq_FZNa0X6E6sEpOjLEv32MC1V18WU0swRengBSMQ" />
                        <div>
                          <p className="font-data-tabular text-primary font-bold">Julian Vane</p>
                          <p className="text-body-sm text-secondary">New Guest</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-body-md text-primary">j.vane@creative.studio</span>
                        <span className="text-body-sm text-secondary">+1 (555) 444-3322</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-secondary">
                      Nov 15, 2023
                    </td>
                    <td className="px-6 py-4 font-data-tabular text-primary font-bold">
                      $2,100.00
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-4 py-1.5 text-blue-700 border border-blue-700 rounded-lg text-body-sm font-bold hover:bg-blue-700 hover:text-white transition-all">
                        View Profile
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-surface-container-high bg-surface-container-lowest flex items-center justify-between">
              <button className="px-4 py-2 text-body-sm font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1 disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span> Previous
              </button>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded-lg bg-primary text-on-primary text-body-sm font-bold">1</button>
                <button className="w-8 h-8 rounded-lg hover:bg-surface-container text-body-sm font-bold">2</button>
                <button className="w-8 h-8 rounded-lg hover:bg-surface-container text-body-sm font-bold">3</button>
                <span className="px-2 self-center">...</span>
                <button className="w-8 h-8 rounded-lg hover:bg-surface-container text-body-sm font-bold">284</button>
              </div>
              <button className="px-4 py-2 text-body-sm font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1">
                Next <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GuestDirectory;
