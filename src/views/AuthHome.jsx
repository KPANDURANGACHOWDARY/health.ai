"use client";
import { useRouter } from "next/navigation";
import { Activity, ArrowRight, ShieldCheck } from "lucide-react";

const AuthHome = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans relative overflow-hidden px-4">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="z-10 bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="bg-primary-600 p-4 rounded-2xl shadow-lg shadow-primary-200">
            <Activity className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
          HealthAI
        </h1>
        <p className="text-slate-500 mb-10 text-lg">
          The next generation healthcare management system. Intelligent, secure, and modern.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/login")}
            className="w-full btn-primary group text-lg h-14"
          >
            <span>Log In to Dashboard</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="w-full btn-secondary text-lg h-14"
          >
            Create an Account
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span>Enterprise-grade security</span>
        </div>
      </div>
    </div>
  );
};

export default AuthHome;