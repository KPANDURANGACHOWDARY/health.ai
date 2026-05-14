import { createSlice } from "@reduxjs/toolkit";

const loadData = (key, defaultVal) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
  }
  return defaultVal;
};

const initialState = {
  patients: loadData("patients", []),
  reports: loadData("reports", []),
  doctors: loadData("doctors", [
    { id: 1, name: "Dr. Sarah Jenkins", specialty: "Cardiology", status: "Available", email: "sarah.j@healthai.com", phone: "+1 (555) 123-4567" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Neurology", status: "On Leave", email: "m.chen@healthai.com", phone: "+1 (555) 987-6543" },
    { id: 3, name: "Dr. Emily Rodriguez", specialty: "Pediatrics", status: "In Surgery", email: "emily.r@healthai.com", phone: "+1 (555) 456-7890" },
    { id: 4, name: "Dr. James Wilson", specialty: "General Practice", status: "Available", email: "j.wilson@healthai.com", phone: "+1 (555) 234-5678" }
  ]),
  settings: loadData("settings", {
    emailAlerts: true,
    smsAlerts: false,
    twoFactorAuth: false,
  })
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addPatient: (state, action) => {
      state.patients.push(action.payload);
      localStorage.setItem("patients", JSON.stringify(state.patients));
    },
    editPatient: (state, action) => {
      const { index, updatedData } = action.payload;
      state.patients[index] = updatedData;
      localStorage.setItem("patients", JSON.stringify(state.patients));
    },
    deletePatient: (state, action) => {
      const index = action.payload;
      state.patients.splice(index, 1);
      localStorage.setItem("patients", JSON.stringify(state.patients));
    },


    addReport: (state, action) => {
      state.reports.push(action.payload);
      localStorage.setItem("reports", JSON.stringify(state.reports));
    },
    editReport: (state, action) => {
      const { index, updatedData } = action.payload;
      state.reports[index] = updatedData;
      localStorage.setItem("reports", JSON.stringify(state.reports));
    },
    deleteReport: (state, action) => {
      const index = action.payload;
      state.reports.splice(index, 1);
      localStorage.setItem("reports", JSON.stringify(state.reports));
    },
    
    addDoctor: (state, action) => {
      state.doctors.push(action.payload);
      localStorage.setItem("doctors", JSON.stringify(state.doctors));
    },
    deleteDoctor: (state, action) => {
      const index = action.payload;
      state.doctors.splice(index, 1);
      localStorage.setItem("doctors", JSON.stringify(state.doctors));
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
      localStorage.setItem("settings", JSON.stringify(state.settings));
    },
    clearAllData: (state) => {
      state.patients = [];
      state.reports = [];
      state.doctors = [];
      localStorage.removeItem("patients");
      localStorage.removeItem("reports");
      localStorage.removeItem("doctors");
    }
  },
});

export const { 
  addPatient, addReport, editPatient, editReport, deletePatient, deleteReport,
  addDoctor, deleteDoctor, updateSettings, clearAllData 
} = dataSlice.actions;
export default dataSlice.reducer;