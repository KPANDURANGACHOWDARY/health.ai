"use client";
import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { User, Bell, Shield, Sliders, Database, CreditCard, Download, Trash2, Edit2, LogOut } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { updateSettings, clearAllData } from "../features/dataSlice";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const dispatch = useAppDispatch();
  
  const { user } = useAppSelector((state) => state.auth);
  const settings = useAppSelector((state) => state.data.settings || { emailAlerts: true, smsAlerts: false, twoFactorAuth: false });
  const { patients = [], reports = [] } = useAppSelector((state) => state.data || {});

  const navTabs = [
    { id: "Profile", icon: User, label: "Account Profile" },
    { id: "Notifications", icon: Bell, label: "Notifications" },
    { id: "Security", icon: Shield, label: "Security" },
    { id: "API", icon: Sliders, label: "API Connections" },
    { id: "Data", icon: Database, label: "Data Management" },
    { id: "Billing", icon: CreditCard, label: "Billing" },
  ];

  const handleToggle = (key) => {
    dispatch(updateSettings({ [key]: !settings[key] }));
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify({ patients, reports, settings });
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "healthai_export.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div className="card animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-4">Personal Information</h2>
            <form className="space-y-4 max-w-2xl" onSubmit={(e) => { e.preventDefault(); alert("Profile updated successfully!"); }}>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-3xl shadow-inner">
                  {user?.username ? user.username.charAt(0).toUpperCase() : "A"}
                </div>
                <div>
                  <button type="button" className="btn-secondary py-1.5 px-4 text-sm mb-2"><Edit2 className="w-4 h-4 mr-2 inline" /> Change Avatar</button>
                  <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input type="text" className="input-field py-2" defaultValue={user?.username || "Admin"} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input type="text" className="input-field py-2" defaultValue="User" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input type="email" className="input-field py-2" defaultValue={`${user?.username?.toLowerCase() || 'admin'}@healthai.com`} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role / Job Title</label>
                <input type="text" className="input-field py-2" defaultValue="System Administrator" disabled />
              </div>
              
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button type="submit" className="btn-primary py-2 px-6">Save Changes</button>
              </div>
            </form>
          </div>
        );
      
      case "Notifications":
        return (
          <div className="card animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-4">Notification Preferences</h2>
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-800">Email Alerts</h4>
                  <p className="text-sm text-slate-500">Receive daily digest of system operations and new patients.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={settings.emailAlerts} onChange={() => handleToggle('emailAlerts')} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-800">SMS Notifications</h4>
                  <p className="text-sm text-slate-500">Get text messages for critical AI inference anomalies.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={settings.smsAlerts} onChange={() => handleToggle('smsAlerts')} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case "Security":
        return (
          <div className="card animate-in fade-in duration-300 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Password & Authentication</h2>
              <p className="text-slate-500 text-sm mb-4 pb-4 border-b border-slate-100">Ensure your account is using a long, random password to stay secure.</p>
              
              <form className="space-y-4 max-w-2xl" onSubmit={(e) => { e.preventDefault(); alert("Password updated successfully!"); }}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                  <input required type="password" className="input-field py-2" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                  <input required type="password" className="input-field py-2" placeholder="••••••••" />
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex justify-start">
                  <button type="submit" className="btn-secondary py-2 px-6">Update Password</button>
                </div>
              </form>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <h3 className="font-bold text-slate-800 mb-2">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between max-w-2xl">
                <p className="text-sm text-slate-500 mr-4">Add an extra layer of security to your account.</p>
                <button 
                  onClick={() => handleToggle('twoFactorAuth')}
                  className={`py-1.5 px-4 rounded-lg font-semibold text-sm transition-colors ${settings.twoFactorAuth ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-primary-50 text-primary-700 hover:bg-primary-100'}`}
                >
                  {settings.twoFactorAuth ? "Disable 2FA" : "Enable 2FA"}
                </button>
              </div>
            </div>
          </div>
        );

      case "Data":
        return (
          <div className="card animate-in fade-in duration-300">
             <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-4">Data Management</h2>
             <div className="space-y-6 max-w-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-200 rounded-xl">
                  <div>
                    <h4 className="font-bold text-slate-800 flex items-center gap-2"><Download className="w-4 h-4 text-emerald-500" /> Export System Data</h4>
                    <p className="text-sm text-slate-500 mt-1">Download all patient records and reporting history as JSON.</p>
                  </div>
                  <button onClick={handleExportData} className="btn-secondary shrink-0 whitespace-nowrap">Export Data</button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-red-200 bg-red-50 rounded-xl">
                  <div>
                    <h4 className="font-bold text-red-700 flex items-center gap-2"><Trash2 className="w-4 h-4 text-red-500" /> Factory Reset</h4>
                    <p className="text-sm text-red-600/80 mt-1">Permanently delete all data from local storage.</p>
                  </div>
                  <button 
                    onClick={() => {
                      if(confirm("Are you ALBSOLUTELY sure? This will delete all Patients, Reports, and Doctors.")) {
                        dispatch(clearAllData());
                        alert("Database wiped clean.");
                      }
                    }} 
                    className="bg-white border border-red-200 text-red-600 font-semibold py-2 px-4 rounded-xl hover:bg-red-100 transition-colors shrink-0"
                  >
                    Clear All Data
                  </button>
                </div>
             </div>
          </div>
        );
      
      default:
        return (
          <div className="card animate-in fade-in duration-300 flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-4">
              <Sliders className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Module Available in Pro Version</h3>
            <p className="text-slate-500 max-w-md mt-2">The {activeTab} section is reserved for Enterprise features like API webhooks or integrated billing platforms.</p>
          </div>
        );
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Platform Settings</h1>
        <p className="text-slate-500 mt-1">Configure your workspace and administrative preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full lg:w-64 shrink-0">
          <nav className="space-y-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 font-semibold rounded-xl text-left transition-colors ${
                    isActive 
                      ? "bg-primary-50 text-primary-700" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary-600" : "text-slate-400"}`} /> 
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 w-full min-w-0">
          {renderTabContent()}
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
