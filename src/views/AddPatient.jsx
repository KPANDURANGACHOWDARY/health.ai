"use client";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addPatient } from "../features/dataSlice";
import MainLayout from "../layout/MainLayout";
import { UserPlus, Activity, MapPin, Hash } from "lucide-react";

const AddPatient = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    name: "",
    age: "",
    disease: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.disease) return;
    
    dispatch(addPatient({
      id: Date.now().toString(),
      ...form,
      dateAdded: new Date().toISOString()
    }));
    
    alert("Patient registered successfully!");
    setForm({ name: "", age: "", disease: "" });
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary-100 p-3 rounded-xl">
            <UserPlus className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Register New Patient</h1>
            <p className="text-slate-500 text-sm">Fill in the information below to add a patient to the system.</p>
          </div>
        </div>

        <div className="card shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserPlus className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      required
                      type="text"
                      className="input-field pl-10"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Hash className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      required
                      type="number"
                      className="input-field pl-10"
                      placeholder="e.g. 45"
                      value={form.age}
                      onChange={(e) => setForm({ ...form, age: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Primary Condition / Disease</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Activity className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    required
                    type="text"
                    className="input-field pl-10"
                    placeholder="e.g. Hypertension"
                    value={form.disease}
                    onChange={(e) => setForm({ ...form, disease: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                className="btn-secondary mr-4"
                onClick={() => setForm({ name: "", age: "", disease: "" })}
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Register Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddPatient;