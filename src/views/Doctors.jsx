"use client";
import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { addDoctor, deleteDoctor } from "../features/dataSlice";
import { Mail, Phone, Search, Filter, Plus, X, Trash2 } from "lucide-react";

const Doctors = () => {
  const dispatch = useAppDispatch();
  const doctorsList = useAppSelector((state) => state.data.doctors || []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [form, setForm] = useState({ name: "", specialty: "", status: "Available", email: "", phone: "" });

  const getStatusColor = (status) => {
    switch(status) {
      case "Available": return "bg-green-100 text-green-700";
      case "On Leave": return "bg-amber-100 text-amber-700";
      case "In Surgery": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    dispatch(addDoctor({
      id: Date.now(),
      ...form,
      name: form.name.includes("Dr. ") ? form.name : `Dr. ${form.name}`
    }));
    setIsAddModalOpen(false);
    setForm({ name: "", specialty: "", status: "Available", email: "", phone: "" });
  };

  const filteredDoctors = doctorsList.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "All" || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Medical Staff</h1>
          <p className="text-slate-500 mt-1">Manage doctors and medical personnel.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search staff..." 
              className="input-field pl-9 py-2 rounded-lg text-sm w-full sm:w-64 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="btn-secondary h-10 px-4 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter: {filterStatus}</span>
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 z-20 py-1 animate-in fade-in zoom-in-95 duration-150">
                {["All", "Available", "In Surgery", "On Leave"].map(status => (
                  <div 
                    key={status}
                    onClick={() => { setFilterStatus(status); setIsFilterOpen(false); }}
                    className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm font-medium text-slate-700"
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary h-10 px-4 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Staff
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDoctors.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white/50 rounded-2xl border border-dashed border-slate-200">
            No medical staff found matching your criteria.
          </div>
        ) : filteredDoctors.map((doc, i) => (
          <div key={doc.id} className="card shadow-sm hover:shadow-lg flex flex-col group relative overflow-hidden transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => { if(confirm(`Remove ${doc.name} from directory?`)) dispatch(deleteDoctor(i)); }}
                className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                title="Remove Doctor"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-xl shadow-inner shrink-0">
                  {doc.name.includes("Dr. ") ? doc.name.charAt(4) : doc.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{doc.name}</h3>
                  <p className="text-primary-600 font-medium text-sm">{doc.specialty}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-2 text-sm text-slate-600 flex-1">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{doc.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{doc.phone}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(doc.status)}`}>
                {doc.status}
              </span>
              <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 hover:underline">View Profile</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Register New Staff</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  required type="text" className="input-field" placeholder="John Doe"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Medical Specialty</label>
                <input 
                  required type="text" className="input-field" placeholder="e.g. Surgery, Neurology"
                  value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select 
                    className="input-field py-2.5 bg-white" 
                    value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option>Available</option>
                    <option>In Surgery</option>
                    <option>On Leave</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input 
                    required type="tel" className="input-field" placeholder="+1 (555)..."
                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input 
                  required type="email" className="input-field" placeholder="doctor@healthai.com"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn-secondary py-2">Cancel</button>
                <button type="submit" className="btn-primary py-2 px-6">Register Staff</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Doctors;
