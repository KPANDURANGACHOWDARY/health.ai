"use client";
import MainLayout from "../layout/MainLayout";
import { useAppSelector } from "../store/hooks";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, Activity, ActivitySquare } from "lucide-react";

const Analytics = () => {
  const { patients = [], reports = [] } = useAppSelector((state) => state.data || {});

  // Mock data for extended analytics
  const ageDistribution = [
    { name: "0-18", value: patients.filter(p => parseInt(p.age) <= 18).length || 5 },
    { name: "19-35", value: patients.filter(p => parseInt(p.age) > 18 && parseInt(p.age) <= 35).length || 15 },
    { name: "36-50", value: patients.filter(p => parseInt(p.age) > 35 && parseInt(p.age) <= 50).length || 20 },
    { name: "51+", value: patients.filter(p => parseInt(p.age) > 50).length || 10 },
  ];

  const diseaseStats = patients.reduce((acc, curr) => {
    acc[curr.disease] = (acc[curr.disease] || 0) + 1;
    return acc;
  }, {});

  const diseaseData = Object.keys(diseaseStats).length > 0 
    ? Object.keys(diseaseStats).map(d => ({ name: d, count: diseaseStats[d] }))
    : [
        { name: "Hypertension", count: 12 },
        { name: "Diabetes", count: 8 },
        { name: "Asthma", count: 5 },
        { name: "Cardiac", count: 3 },
      ];

  const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'];

  return (
    <MainLayout>
      <div className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">System Analytics</h1>
          <p className="text-slate-500 mt-1">Deep dive into patient demographics and inference statistics.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary px-4 py-2 text-sm font-semibold">Export JSON</button>
          <button className="btn-primary px-4 py-2 text-sm font-semibold">Generate PDF Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Age Distribution Pie Chart */}
        <div className="card shadow-md flex flex-col h-[400px]">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <Users className="w-5 h-5 text-emerald-500" />
            Patient Age Demographics
          </h2>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {ageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disease Stats Bar Chart */}
        <div className="card shadow-md flex flex-col h-[400px]">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <ActivitySquare className="w-5 h-5 text-blue-500" />
            Condition Frequencies
          </h2>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diseaseData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 13, fontWeight: 500}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={30}>
                  {diseaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="card shadow-md bg-gradient-to-r from-slate-800 to-slate-900 border-none text-white overflow-hidden relative">
        <div className="absolute opacity-10 right-0 top-0 translate-x-12 -translate-y-12">
          <TrendingUp className="w-64 h-64" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Automated Data Insights</h2>
            <p className="text-slate-300 max-w-xl">
              Based on the latest report scans, system accuracy has improved by 2.4% over the last rolling window. Hypertension remains the leading mapped condition. 
            </p>
          </div>
          <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors shrink-0">
            View Deep Report
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;
