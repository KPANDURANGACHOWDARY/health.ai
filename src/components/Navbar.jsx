"use client";
import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../features/auth/authSlice";
import { LogOut, Bell, Search, User, CheckCircle2, AlertCircle, X, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { patients = [], reports = [] } = useAppSelector((state) => state.data || {});
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) setIsSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    switch(pathname) {
      case "/dashboard": return "Dashboard";
      case "/analytics": return "Analytics";
      case "/doctors": return "Medical Staff";
      case "/add-patient": return "New Patient";
      case "/add-report": return "New Report";
      case "/settings": return "Settings";
      default: return "HealthAI";
    }
  };

  const filteredSearch = patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.disease.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);

  const notifications = [
    { id: 1, type: "success", title: "System Update Complete", time: "10m ago", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: 2, type: "alert", title: "High load detected in AI Inference cluster", time: "1h ago", icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50" },
    { id: 3, type: "info", title: `New patients registered (${patients.length} total)`, time: "3h ago", icon: User, color: "text-blue-500", bg: "bg-blue-50" },
  ];

  return (
    <div className="bg-white border-b border-slate-200 h-16 md:h-20 px-4 md:px-8 flex justify-between items-center sticky top-0 z-30 shadow-sm transition-all w-full">
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-primary-600 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-lg md:text-xl font-semibold text-slate-800 tracking-tight truncate max-w-[150px] sm:max-w-none">
          {getPageTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-2 md:gap-6 shrink-0">
        <div className="flex items-center gap-1 md:gap-4">
          
          {/* SEARCH COMPONENT */}
          <div className="relative static md:relative" ref={searchRef}>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-full transition-colors ${isSearchOpen ? 'bg-slate-100 text-primary-600' : 'text-slate-400 hover:text-primary-600 hover:bg-slate-50'}`}
            >
              <Search className="w-5 h-5" />
            </button>
            
            {isSearchOpen && (
              <div className="absolute right-0 md:right-0 top-16 md:top-auto md:mt-2 w-[calc(100vw-2rem)] sm:w-80 left-4 sm:left-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 md:slide-in-from-top-2 duration-200 z-50">
                <div className="p-3 border-b border-slate-100 relative bg-white">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search patients, conditions..." 
                    className="w-full pl-9 pr-8 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-6 top-1/2 -translate-y-1/2">
                      <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto bg-white">
                  {searchQuery ? (
                    filteredSearch.length > 0 ? (
                      <div className="p-2 space-y-1">
                        <div className="px-3 pb-1 pt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Patients</div>
                        {filteredSearch.map((p, i) => (
                          <div key={i} onClick={() => { setIsSearchOpen(false); router.push('/dashboard'); }} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group">
                            <div className="min-w-0 pr-2">
                              <p className="text-sm font-bold text-slate-700 truncate">{p.name}</p>
                              <p className="text-xs text-slate-500 mt-0.5 truncate">{p.disease}</p>
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity shrink-0">View</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-sm text-slate-500">No results found for "{searchQuery}"</div>
                    )
                  ) : (
                    <div className="p-6 text-center text-sm text-slate-400">Start typing to search the database.</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* NOTIFICATION COMPONENT */}
          <div className="relative static md:relative" ref={notifRef}>
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className={`p-2 rounded-full transition-colors relative ${isNotifOpen ? 'bg-slate-100 text-primary-600' : 'text-slate-400 hover:text-primary-600 hover:bg-slate-50'}`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border border-white rounded-full"></span>
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 md:right-0 top-16 md:top-auto md:mt-2 w-[calc(100vw-2rem)] sm:w-80 left-4 sm:left-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 md:slide-in-from-top-2 duration-200 z-50">
                <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-bold text-slate-800">Notifications</h3>
                  <button className="text-xs text-primary-600 font-semibold hover:text-primary-700">Mark all read</button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto p-2">
                  {notifications.map((notif) => {
                    const Icon = notif.icon;
                    return (
                      <div key={notif.id} className="flex gap-4 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.bg} ${notif.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700 leading-tight">{notif.title}</p>
                          <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="p-3 border-t border-slate-100 text-center bg-white border-b-0">
                  <button className="text-sm text-slate-500 font-medium hover:text-slate-800 w-full rounded py-1 hover:bg-slate-50 transition-colors">View All History</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end hidden md:flex">
            <span className="text-sm font-semibold text-slate-700">Hello, {user?.username}</span>
            <span className="text-xs text-slate-500 font-medium">Administrator</span>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-100 border-2 border-primary-200 flex items-center justify-center text-primary-700 font-bold shadow-sm text-sm md:text-base">
            {user?.username ? user.username.charAt(0).toUpperCase() : <User className="w-4 h-4 md:w-5 md:h-5" />}
          </div>

          <button
            onClick={() => dispatch(logout())}
            className="flex items-center gap-2 p-2 md:px-3 md:py-2 text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors ml-0 md:ml-1"
          >
            <LogOut className="w-5 h-5 md:w-4 md:h-4" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;