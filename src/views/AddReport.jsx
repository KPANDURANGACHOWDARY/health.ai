"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addReport } from "../features/dataSlice";
import MainLayout from "../layout/MainLayout";
import { FileText, ClipboardList, Target, User } from "lucide-react";

const AddReport = () => {
  const dispatch = useAppDispatch();
  const patients = useAppSelector((state) => state.data.patients || []);

  const [form, setForm] = useState({
    patient: "",
    result: "",
    accuracy: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patient || !form.result || !form.accuracy) return;

    dispatch(addReport({
      id: Date.now().toString(),
      ...form,
      dateAdded: new Date().toISOString()
    }));
    
    alert("Medical report submitted successfully!");
    setForm({ patient: "", result: "", accuracy: "" });
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary-100 p-3 rounded-xl">
            <FileText className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Submit Medical Report</h1>
            <p className="text-slate-500 text-sm">Add diagnostic results and AI accuracy scores for patients.</p>
          </div>
        </div>

        <div className="card shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Patient</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <select
                    required
                    className="input-field pl-10 appearance-none bg-no-repeat"
                    style={{ backgroundPosition: 'right 1rem center', backgroundSize: '1.5em 1.5em', backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")` }}
                    value={form.patient}
                    onChange={(e) => setForm({ ...form, patient: e.target.value })}
                  >
                    <option value="" disabled>Choose a patient register...</option>
                    {patients.map((p, idx) => (
                      <option key={p.id || idx} value={p.name}>{p.name} ({p.disease})</option>
                    ))}
                    {patients.length === 0 && <option value="Guest">Guest (No registered patients)</option>}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Diagnosis / AI Result</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <ClipboardList className="h-5 w-5 text-slate-400" />
                  </div>
                  <textarea
                    required
                    rows={4}
                    className="input-field pl-10"
                    placeholder="Enter the medical findings or model inference output..."
                    value={form.result}
                    onChange={(e) => setForm({ ...form, result: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Model Confidence / Accuracy (%)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Target className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    required
                    type="number"
                    min="0"
                    max="100"
                    className="input-field pl-10"
                    placeholder="e.g. 98.5"
                    value={form.accuracy}
                    onChange={(e) => setForm({ ...form, accuracy: e.target.value })}
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-medium">%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                className="btn-secondary mr-4"
                onClick={() => setForm({ patient: "", result: "", accuracy: "" })}
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddReport;