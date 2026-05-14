"use client";
import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { editPatient, deletePatient, editReport, deleteReport } from "../features/dataSlice";
import { Activity, Users, FileText, Target, ActivitySquare, Edit2, Trash2, X } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { patients = [], reports = [] } = useAppSelector((state) => state.data || {});

  // List expansion states
  const [showAllPatients, setShowAllPatients] = useState(false);
  const [showAllReports, setShowAllReports] = useState(false);

  // Modal states
  const [editPatientModal, setEditPatientModal] = useState({ isOpen: false, index: null, data: null });
  const [editReportModal, setEditReportModal] = useState({ isOpen: false, index: null, data: null });

  const chartData = reports.length > 0 ? reports.map((r, i) => ({
    name: `Rpt ${i+1}`,
    accuracy: parseFloat(r.accuracy) || 0,
    patient: r.patient
  })) : [
    { name: "Mon", accuracy: 82 },
    { name: "Tue", accuracy: 85 },
    { name: "Wed", accuracy: 89 },
    { name: "Thu", accuracy: 94 },
    { name: "Fri", accuracy: 96 }
  ];

  const avgAccuracy = reports.length > 0 
    ? (reports.reduce((acc, curr) => acc + (parseFloat(curr.accuracy) || 0), 0) / reports.length).toFixed(1)
    : "0.0";

  const handlePatientUpdate = (e) => {
    e.preventDefault();
    dispatch(editPatient({ index: editPatientModal.index, updatedData: editPatientModal.data }));
    setEditPatientModal({ isOpen: false, index: null, data: null });
  };

  const handleReportUpdate = (e) => {
    e.preventDefault();
    dispatch(editReport({ index: editReportModal.index, updatedData: editReportModal.data }));
    setEditReportModal({ isOpen: false, index: null, data: null });
  };

  return (
    <MainLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Monitor your facility's health tracking and AI inferences.</p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Patients Card */}
        <div className="bg-gradient-to-br from-blue-500 to-primary-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-blue-100 font-medium">Total Registered Patients</p>
              <h2 className="text-4xl font-bold mt-1">{patients.length}</h2>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-sm font-medium text-blue-100 flex items-center mt-4">
            <span className="bg-white/20 px-2 py-0.5 rounded-full mr-2">+{(patients.length * 0.15).toFixed(0)} new</span> this week
          </div>
        </div>

        {/* Total Reports Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-indigo-100 font-medium">Reports Processed</p>
              <h2 className="text-4xl font-bold mt-1">{reports.length}</h2>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-sm font-medium text-indigo-100 flex items-center mt-4">
            <ActivitySquare className="w-4 h-4 mr-1" /> active processing
          </div>
        </div>

        {/* Avg Accuracy Card */}
        <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-emerald-100 font-medium">Avg AI Accuracy</p>
              <h2 className="text-4xl font-bold mt-1">{avgAccuracy}%</h2>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-sm font-medium text-emerald-100 flex items-center mt-4">
            <span className="bg-white/20 px-2 py-0.5 rounded-full mr-2">Top tier</span> model confidence
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="card shadow-lg mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary-500" />
          Model Inference Accuracy Trend
        </h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} domain={[0, 100]} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)' }}
                cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3' }}
              />
              <Area type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAccuracy)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* PATIENTS LIST */}
        <div className="card shadow-lg flex flex-col h-[500px]">
          <div className="flex items-center justify-between mb-4 flex-shrink-0 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-800">Patients Directory</h2>
            <span 
              onClick={() => setShowAllPatients(!showAllPatients)}
              className="text-sm text-primary-600 font-medium cursor-pointer hover:underline"
            >
              {showAllPatients ? "View less" : "View all"}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {patients.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-500">No patients registered.</div>
            ) : (showAllPatients ? patients : patients.slice(0, 4)).map((p, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-xl py-3 px-4 flex items-center justify-between group transition-all">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-md font-bold text-slate-800 truncate">{p.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>Age: {p.age}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md font-semibold truncate max-w-[120px]">
                        {p.disease}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                  <button
                    onClick={() => setEditPatientModal({ isOpen: true, index: i, data: { ...p } })}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Patient"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { if(confirm("Delete this patient?")) dispatch(deletePatient(i)); }}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Patient"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REPORTS LIST */}
        <div className="card shadow-lg flex flex-col h-[500px]">
          <div className="flex items-center justify-between mb-4 flex-shrink-0 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-800">Processing Reports</h2>
            <span 
              onClick={() => setShowAllReports(!showAllReports)}
              className="text-sm text-primary-600 font-medium cursor-pointer hover:underline"
            >
              {showAllReports ? "View less" : "View all"}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {reports.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-500">No reports submitted.</div>
            ) : (showAllReports ? reports : reports.slice(0, 4)).map((r, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-xl py-3 px-4 flex items-start justify-between group transition-all">
                <div className="flex flex-col flex-1 min-w-0 mr-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-md font-bold text-slate-800 truncate">{r.patient}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 ${parseFloat(r.accuracy) > 90 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      <Target className="w-3 h-3" /> {r.accuracy}%
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{r.result}</p>
                </div>
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => setEditReportModal({ isOpen: true, index: i, data: { ...r } })}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Report"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { if(confirm("Delete this report?")) dispatch(deleteReport(i)); }}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODALS */}
      {/* Edit Patient Modal */}
      {editPatientModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Edit Patient</h3>
              <button 
                onClick={() => setEditPatientModal({ isOpen: false, index: null, data: null })}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handlePatientUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  required type="text" className="input-field"
                  value={editPatientModal.data.name} 
                  onChange={(e) => setEditPatientModal({ ...editPatientModal, data: { ...editPatientModal.data, name: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                <input 
                  required type="number" className="input-field"
                  value={editPatientModal.data.age} 
                  onChange={(e) => setEditPatientModal({ ...editPatientModal, data: { ...editPatientModal.data, age: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Disease</label>
                <input 
                  required type="text" className="input-field"
                  value={editPatientModal.data.disease} 
                  onChange={(e) => setEditPatientModal({ ...editPatientModal, data: { ...editPatientModal.data, disease: e.target.value } })}
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setEditPatientModal({ isOpen: false, index: null, data: null })} className="btn-secondary py-2">Cancel</button>
                <button type="submit" className="btn-primary py-2 px-6">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Report Modal */}
      {editReportModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Edit Report</h3>
              <button 
                onClick={() => setEditReportModal({ isOpen: false, index: null, data: null })}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleReportUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                <input 
                  required type="text" className="input-field"
                  value={editReportModal.data.patient} 
                  onChange={(e) => setEditReportModal({ ...editReportModal, data: { ...editReportModal.data, patient: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Result</label>
                <textarea 
                  required rows={3} className="input-field"
                  value={editReportModal.data.result} 
                  onChange={(e) => setEditReportModal({ ...editReportModal, data: { ...editReportModal.data, result: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Accuracy (%)</label>
                <input 
                  required type="number" step="0.1" max="100" min="0" className="input-field"
                  value={editReportModal.data.accuracy} 
                  onChange={(e) => setEditReportModal({ ...editReportModal, data: { ...editReportModal.data, accuracy: e.target.value } })}
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setEditReportModal({ isOpen: false, index: null, data: null })} className="btn-secondary py-2">Cancel</button>
                <button type="submit" className="btn-primary py-2 px-6">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Dashboard;