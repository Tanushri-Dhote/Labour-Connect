"use client";

import { cn } from "@/lib/utils";
import {
  AlertCircle,
  ArrowRight,
  Bookmark,
  Building2,
  CheckCircle,
  Clock,
  ExternalLink,
  Eye,
  Layers,
  Lock,
  LogOut,
  Search,
  ShieldCheck,
  TrendingUp,
  Unlock,
  UserCheck,
  Users,
  XCircle
} from "lucide-react";
import React, { useEffect, useState } from "react";

// --- Types ---
interface Stats {
  totalLabours: number;
  totalEmployers: number;
  activeEmployers: number;
  blockedEmployers: number;
  activeCategories: number;
  inactiveCategories: number;
  activeSkills: number;
  inactiveSkills: number;
  totalActiveUsers: number;
  totalSubscriptionPlans: number;
  activeSubscriptionPlans: number;
  inactiveSubscriptionPlans: number;
  totalLaboursUnlocked: number;
}

interface Labour {
  _id: string;
  userId?: {
    _id: string;
    mobile: string;
    status: "active" | "blocked" | "deleted";
  };
  mobile: string;
  fullName: string;
  age: number;
  gender: string;
  profileImage: string;
  homeAddress: string;
  currentLocation: string;
  preferredWorkLocation: string;
  categoryId?: {
    _id: string;
    name: string;
  };
  skills?: Array<{
    _id: string;
    name: string;
  }>;
  chargeAmount: number;
  chargeType: string;
  availability?: Record<string, boolean>;
  experience: string;
  workType: string;
  additionalInfo?: string;
  documentUrl: string;
  documentType: string;
  adminApprovalStatus: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface Employer {
  _id: string;
  userId?: {
    _id: string;
    mobile: string;
    status: "active" | "blocked" | "deleted";
  };
  companyName: string;
  contactPerson: string;
  mobile: string;
  email: string;
  companyType?: string;
  gstNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  status: string;
  contactCredits: number;
  createdAt: string;
}

interface AdminUser {
  _id: string;
  username: string;
  name: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  // --- Auth states ---
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // --- Active Tab State ---
  const [activeTab, setActiveTab] = useState<"overview" | "pending" | "labours" | "employers" | "admins">("overview");

  // --- Data states ---
  const [stats, setStats] = useState<Stats | null>(null);
  const [labours, setLabours] = useState<Labour[]>([]);
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // --- Filtering / Details Modal states ---
  const [labourSearch, setLabourSearch] = useState("");
  const [employerSearch, setEmployerSearch] = useState("");
  const [selectedLabour, setSelectedLabour] = useState<Labour | null>(null);
  const [selectedDocUrl, setSelectedDocUrl] = useState<string | null>(null);

  // --- Language state ---
  const [lang, setLang] = useState<"hi" | "en">("en");

  // --- Bilingual Translations ---
  const t = {
    hi: {
      title: "एडमिन कंट्रोल डैशबोर्ड",
      subtitle: "पंजीकरण, लेबर और नियोक्ताओं को प्रबंधित करें",
      loginTitle: "एडमिन लॉगिन",
      loginSubtitle: "डैशबोर्ड का उपयोग करने के लिए लॉगिन करें",
      usernameLabel: "यूज़रनेम",
      passwordLabel: "पासवर्ड",
      loginBtn: "लॉगिन करें",
      logoutBtn: "लॉगआउट",
      overview: "अवलोकन (Stats)",
      pendingApprovals: "लंबित स्वीकृतियां",
      manageLabours: "लेबर प्रबंधन",
      manageEmployers: "नियोक्ता प्रबंधन",
      manageAdmins: "एडमिन सूची",
      
      // Overview stats
      totalLabours: "कुल लेबर",
      totalEmployers: "कुल नियोक्ता",
      activeEmployers: "सक्रिय नियोक्ता",
      blockedEmployers: "ब्लॉक नियोक्ता",
      totalUnlocks: "संपर्क अनलॉक",
      activeCats: "सक्रिय श्रेणियां",
      activeSkills: "सक्रिय कौशल",
      usersCount: "कुल सक्रिय यूज़र्स",

      // Table & Details
      photo: "फ़ोटो",
      name: "नाम",
      mobile: "मोबाइल",
      status: "स्थिति",
      actions: "कार्रवाई",
      noPending: "कोई लंबित पंजीकरण नहीं है।",
      noRecords: "कोई रिकॉर्ड नहीं मिला।",
      approve: "मंजूर करें",
      reject: "अस्वीकार करें",
      block: "ब्लॉक",
      unblock: "अनब्लॉक",
      experience: "अनुभव",
      rates: "चार्ज रेट",
      location: "लोकेशन",
      document: "दस्तावेज़",
      viewDoc: "दस्तावेज़ देखें",
      preferredWork: "पसंदीदा कार्य क्षेत्र",
      availability: "उपलब्धता",
      additionalInfo: "अतिरिक्त विवरण",
      close: "बंद करें",
      loading: "लोड हो रहा है...",
      errorFetch: "डेटा लोड करने में असमर्थ",
      approvedSuccess: "रजिस्ट्रेशन मंजूर कर दिया गया!",
      rejectedSuccess: "रजिस्ट्रेशन अस्वीकार कर दिया गया!",
      statusSuccess: "यूज़र की स्थिति अपडेट की गई!",
    },
    en: {
      title: "Admin Control Dashboard",
      subtitle: "Manage registrations, labours, and employers",
      loginTitle: "Admin Login",
      loginSubtitle: "Sign in to access control panel",
      usernameLabel: "Username",
      passwordLabel: "Password",
      loginBtn: "Login",
      logoutBtn: "Logout",
      overview: "Overview Statistics",
      pendingApprovals: "Pending Approvals",
      manageLabours: "Manage Labours",
      manageEmployers: "Manage Employers",
      manageAdmins: "Admin List",

      // Overview stats
      totalLabours: "Total Labours",
      totalEmployers: "Total Employers",
      activeEmployers: "Active Employers",
      blockedEmployers: "Blocked Employers",
      totalUnlocks: "Contact Unlocks",
      activeCats: "Active Categories",
      activeSkills: "Active Skills",
      usersCount: "Active Users",

      // Table & Details
      photo: "Photo",
      name: "Name",
      mobile: "Mobile",
      status: "Status",
      actions: "Actions",
      noPending: "No pending registrations found.",
      noRecords: "No records found.",
      approve: "Approve",
      reject: "Reject",
      block: "Block",
      unblock: "Unblock",
      experience: "Experience",
      rates: "Expected Rates",
      location: "Location",
      document: "Document",
      viewDoc: "View Doc",
      preferredWork: "Preferred Area",
      availability: "Availability",
      additionalInfo: "Additional Info",
      close: "Close",
      loading: "Loading data...",
      errorFetch: "Failed to load data",
      approvedSuccess: "Registration approved successfully!",
      rejectedSuccess: "Registration rejected successfully!",
      statusSuccess: "User status updated successfully!",
    }
  };

  // --- Initial Check on Mount ---
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (storedToken) {
      setToken(storedToken);
      fetchData(storedToken);
    }
  }, []);

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(null), 4000);
    } else {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  // --- Fetch Dashboard Stats, Labours & Employers ---
  const fetchData = async (authToken: string) => {
    setLoading(true);
    try {
      // 1. Stats
      const statsRes = await fetch("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      // 2. Labours
      const laboursRes = await fetch("/api/admin/labours", {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const laboursData = await laboursRes.json();
      if (laboursData.success) {
        setLabours(laboursData.data);
      }

      // 3. Employers
      const employersRes = await fetch("/api/admin/employers", {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const employersData = await employersRes.json();
      if (employersData.success) {
        setEmployers(employersData.data);
      }

      // 4. Admins
      const adminsRes = await fetch("/api/admin/admins", {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const adminsData = await adminsRes.json();
      if (adminsData.success) {
        setAdmins(adminsData.data);
      }
    } catch (err) {
      console.error(err);
      showNotification(t[lang].errorFetch, true);
    } finally {
      setLoading(false);
    }
  };

  // --- Admin Login ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const resData = await res.json();
      if (resData.success && resData.data.token) {
        const receivedToken = resData.data.token;
        localStorage.setItem("adminToken", receivedToken);
        setToken(receivedToken);
        fetchData(receivedToken);
      } else {
        setAuthError(resData.message || "Invalid login credentials");
      }
    } catch (err) {
      setAuthError("Failed to connect to backend server");
    } finally {
      setLoading(false);
    }
  };

  // --- Logout ---
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setStats(null);
    setLabours([]);
    setEmployers([]);
    setAdmins([]);
    setActiveTab("overview");
  };

  // --- Approve / Reject Labour ---
  const handleApprovalAction = async (labourId: string, approvalStatus: "approved" | "rejected") => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/labours/${labourId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ adminApprovalStatus: approvalStatus })
      });
      const data = await res.json();
      if (data.success) {
        showNotification(approvalStatus === "approved" ? t[lang].approvedSuccess : t[lang].rejectedSuccess);
        setSelectedLabour(null);
        // Refresh
        await fetchData(token);
      } else {
        showNotification(data.message || "Failed to update approval status", true);
      }
    } catch (err) {
      showNotification("Error submitting action to server", true);
    }
  };

  // --- Block / Unblock User (Labour or Employer) ---
  const handleBlockUserAction = async (userId: string, currentStatus: string, type: "labour" | "employer", entityId: string) => {
    if (!token) return;
    const newStatus = currentStatus === "blocked" ? "active" : "blocked";
    const endpoint = type === "labour" 
      ? `/api/admin/labours/${entityId}/${newStatus === "blocked" ? "block" : "unblock"}`
      : `/api/admin/employers/${entityId}/${newStatus === "blocked" ? "block" : "unblock"}`;

    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        showNotification(t[lang].statusSuccess);
        await fetchData(token);
      } else {
        showNotification(data.message || "Action failed", true);
      }
    } catch (err) {
      showNotification("Network error occurred", true);
    }
  };

  // --- Render Login View ---
  if (!token) {
    return (
      <div className="min-h-screen bg-[#F6F4EE] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green text-white border-2 border-black mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="text-2xl font-black tracking-tight">{t[lang].loginTitle}</h1>
            <p className="text-sm font-bold text-zinc-500 mt-1">{t[lang].loginSubtitle}</p>
          </div>

          {authError && (
            <div className="mb-6 rounded-2xl border-2 border-black bg-rose-50 p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 text-rose-700">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-xs font-bold">{authError}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-zinc-600 mb-1.5">{t[lang].usernameLabel}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-black rounded-2xl bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white font-bold"
                placeholder="e.g. admin"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-zinc-600 mb-1.5">{t[lang].passwordLabel}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-black rounded-2xl bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white font-bold"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center items-center gap-2 py-4 rounded-2xl border-2 border-black bg-brand-green text-white font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? t[lang].loading : t[lang].loginBtn}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t-2 border-dashed border-zinc-200 text-center">
            <button
              onClick={() => setLang(prev => prev === "hi" ? "en" : "hi")}
              className="px-3.5 py-1.5 border-2 border-black rounded-2xl bg-zinc-50 text-xs font-black active:translate-y-0.5"
            >
              {lang === "hi" ? "Switch to English" : "हिन्दी में बदलें"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Filter lists ---
  const pendingLabours = labours.filter(l => l.adminApprovalStatus === "pending");
  const filteredLabours = labours.filter(l => 
    l.fullName?.toLowerCase().includes(labourSearch.toLowerCase()) || 
    l.mobile?.includes(labourSearch) || 
    (l.categoryId?.name && l.categoryId.name.toLowerCase().includes(labourSearch.toLowerCase()))
  );
  const filteredEmployers = employers.filter(e => 
    e.companyName?.toLowerCase().includes(employerSearch.toLowerCase()) || 
    e.contactPerson?.toLowerCase().includes(employerSearch.toLowerCase()) || 
    e.mobile?.includes(employerSearch)
  );

  return (
    <div className="min-h-screen bg-[#F6F4EE] text-zinc-900 font-sans selection:bg-brand-green/20 pb-16">
      
      {/* Top navbar */}
      <header className="bg-white border-b-4 border-black py-4 sticky top-0 z-10 shadow-[0_4px_0_0_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-zinc-950 block leading-none">
                Labour<span className="text-brand-green">Connect</span> <span className="text-xs bg-yellow-400 border border-black px-1.5 py-0.5 rounded ml-1 uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">Admin</span>
              </span>
              <span className="text-[10px] font-bold text-zinc-400">{t[lang].subtitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(prev => prev === "hi" ? "en" : "hi")}
              className="inline-flex items-center gap-1 border-2 border-black bg-zinc-50 px-3 py-1.5 text-xs font-black rounded-xl hover:bg-zinc-100 active:translate-y-[1px]"
            >
              <span>{lang === "hi" ? "English" : "हिन्दी"}</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 border-2 border-black bg-rose-50 px-3 py-1.5 text-xs font-black text-rose-700 rounded-xl hover:bg-rose-100 active:translate-y-[1px]"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>{t[lang].logoutBtn}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Alerts / Notifications */}
        {errorMsg && (
          <div className="mb-6 rounded-2xl border-2 border-black bg-rose-50 p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 text-rose-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-bold">{errorMsg}</p>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 rounded-2xl border-2 border-black bg-emerald-50 p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 text-emerald-700">
            <CheckCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-bold">{successMsg}</p>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2.5 mb-8 border-b-2 border-dashed border-zinc-350 pb-4">
          {[
            { id: "overview", label: t[lang].overview, icon: Layers, badge: null },
            { id: "pending", label: t[lang].pendingApprovals, icon: ShieldCheck, badge: pendingLabours.length },
            { id: "labours", label: t[lang].manageLabours, icon: Users, badge: labours.length },
            { id: "employers", label: t[lang].manageEmployers, icon: Building2, badge: employers.length },
            { id: "admins", label: t[lang].manageAdmins, icon: UserCheck, badge: admins.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-3 border-2 border-black rounded-2xl text-sm font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer",
                  isActive
                    ? "bg-brand-green text-white"
                    : "bg-white hover:bg-zinc-50 text-zinc-800"
                )}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{tab.label}</span>
                {tab.badge !== null && (
                  <span className={cn(
                    "ml-1.5 px-2 py-0.5 rounded-full text-xs border border-black",
                    isActive ? "bg-yellow-400 text-black font-black" : "bg-zinc-100 text-zinc-600"
                  )}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* LOADING INDICATOR */}
        {loading && (
          <div className="flex items-center justify-center p-12 bg-white border-2 border-black rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-center font-bold text-zinc-500">
              <Clock className="h-8 w-8 animate-spin mx-auto text-brand-green mb-3" />
              <span>{t[lang].loading}</span>
            </div>
          </div>
        )}

        {/* TAB 1: OVERVIEW STATISTICS */}
        {!loading && activeTab === "overview" && stats && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Labours Count */}
              <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                <div className="absolute right-4 top-4 h-12 w-12 bg-brand-green-light rounded-xl flex items-center justify-center border border-black">
                  <Users className="h-6 w-6 text-brand-green" />
                </div>
                <span className="text-xs font-black text-zinc-400 uppercase tracking-wider">{t[lang].totalLabours}</span>
                <h2 className="text-4xl font-black mt-2 text-zinc-955">{stats.totalLabours}</h2>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-brand-green font-bold">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Onboarded users</span>
                </div>
              </div>

              {/* Employers Count */}
              <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                <div className="absolute right-4 top-4 h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center border border-black">
                  <Building2 className="h-6 w-6 text-blue-700" />
                </div>
                <span className="text-xs font-black text-zinc-400 uppercase tracking-wider">{t[lang].totalEmployers}</span>
                <h2 className="text-4xl font-black mt-2 text-zinc-955">{stats.totalEmployers}</h2>
                <div className="mt-4 text-xs text-zinc-500 font-bold flex gap-3">
                  <span className="text-emerald-700">Active: {stats.activeEmployers}</span>
                  <span className="text-rose-700">Blocked: {stats.blockedEmployers}</span>
                </div>
              </div>

              {/* Total Unlocks */}
              <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                <div className="absolute right-4 top-4 h-12 w-12 bg-yellow-50 rounded-xl flex items-center justify-center border border-black">
                  <Unlock className="h-6 w-6 text-yellow-600" />
                </div>
                <span className="text-xs font-black text-zinc-400 uppercase tracking-wider">{t[lang].totalUnlocks}</span>
                <h2 className="text-4xl font-black mt-2 text-zinc-955">{stats.totalLaboursUnlocked}</h2>
                <div className="mt-4 flex items-center gap-1 text-xs text-zinc-500 font-bold">
                  <span>Employer connections created</span>
                </div>
              </div>

              {/* Categories/Skills */}
              <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                <div className="absolute right-4 top-4 h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center border border-black">
                  <Bookmark className="h-6 w-6 text-purple-700" />
                </div>
                <span className="text-xs font-black text-zinc-400 uppercase tracking-wider">System Setup</span>
                <h2 className="text-4xl font-black mt-2 text-zinc-955">{stats.activeCategories} <span className="text-xs text-zinc-400 font-bold">Categories</span></h2>
                <div className="mt-4 text-xs text-zinc-500 font-bold flex gap-3">
                  <span>Active Skills: {stats.activeSkills}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions / Shortcuts card */}
            <div className="bg-yellow-100 border-2 border-black rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-heading font-black text-lg text-zinc-955">Pending Approvals Alert!</h3>
                <p className="text-sm text-zinc-700 font-bold mt-1">There are currently <span className="underline font-black text-brand-green">{pendingLabours.length} labour profiles</span> waiting to be vetted and approved.</p>
              </div>
              {pendingLabours.length > 0 && (
                <button
                  onClick={() => setActiveTab("pending")}
                  className="inline-flex items-center gap-1.5 px-4.5 py-2.5 border-2 border-black rounded-xl bg-white font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 cursor-pointer"
                >
                  <span>Review Profiles Now</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PENDING APPROVALS LIST */}
        {!loading && activeTab === "pending" && (
          <div className="space-y-6">
            {pendingLabours.length === 0 ? (
              <div className="bg-white border-2 border-black rounded-3xl p-12 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CheckCircle className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
                <p className="text-base font-black text-zinc-800">{t[lang].noPending}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pendingLabours.map((labour) => (
                  <div key={labour._id} className="bg-white border-2 border-black rounded-3xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                    <div>
                      {/* Header block with avatar */}
                      <div className="flex gap-4 items-start pb-4 border-b-2 border-dashed border-zinc-200">
                        <div className="h-16 w-16 rounded-full border-2 border-black overflow-hidden bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0">
                          {labour.profileImage ? (
                            <img src={labour.profileImage} alt={labour.fullName} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center font-black text-zinc-400">?</div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-heading font-black text-lg text-zinc-950">{labour.fullName}</h4>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1">
                            <span className="px-2 py-0.5 border border-black rounded bg-zinc-50 text-[10px] font-black">{labour.categoryId?.name}</span>
                            <span className="px-2 py-0.5 border border-black rounded bg-yellow-100 text-[10px] font-black">Age: {labour.age}</span>
                            <span className="px-2 py-0.5 border border-black rounded bg-zinc-50 text-[10px] font-black capitalize">{labour.gender}</span>
                          </div>
                          <span className="text-[10px] font-black text-zinc-400 block mt-1.5">Registered: {new Date(labour.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Details Area */}
                      <div className="py-4 space-y-3.5 text-xs">
                        {/* Mobile and coordinates */}
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-zinc-500">{t[lang].mobile}:</span>
                          <span className="font-black text-zinc-950 bg-zinc-150 border border-black px-2 py-0.5 rounded">{labour.mobile}</span>
                        </div>

                        {/* Location */}
                        <div>
                          <span className="font-bold text-zinc-500 block mb-1">{t[lang].location}:</span>
                          <div className="bg-zinc-50 border border-black p-2.5 rounded-xl space-y-1">
                            <p className="font-bold"><span className="text-zinc-400">Home:</span> {labour.homeAddress}</p>
                            <p className="font-bold"><span className="text-zinc-400">Current:</span> {labour.currentLocation}</p>
                            <p className="font-bold text-brand-green"><span className="text-zinc-400">Preferred Work:</span> {labour.preferredWorkLocation}</p>
                          </div>
                        </div>

                        {/* Rate and Work Type */}
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-zinc-500">Employment Type:</span>
                          <span className="font-black text-zinc-800">{labour.workType}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="font-bold text-zinc-500">{t[lang].rates}:</span>
                          <span className="font-black text-brand-green text-sm">₹{labour.chargeAmount} / {labour.chargeType}</span>
                        </div>

                        {/* Skills chips */}
                        {labour.skills && labour.skills.length > 0 && (
                          <div>
                            <span className="font-bold text-zinc-500 block mb-1">Skills:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {labour.skills.map((skill) => (
                                <span key={skill._id} className="px-2 py-0.5 bg-zinc-100 border border-black rounded-full text-[10px] font-bold">
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Experience description */}
                        <div>
                          <span className="font-bold text-zinc-500 block mb-1">{t[lang].experience}:</span>
                          <p className="p-3 bg-amber-50 border border-black rounded-2xl italic font-bold text-zinc-700 leading-normal">{selectedLabour?._id === labour._id ? selectedLabour.experience : labour.experience}</p>
                        </div>

                        {/* Document review */}
                        {labour.documentUrl && (
                          <div className="flex items-center justify-between p-3 border-2 border-black border-dashed bg-blue-50/50 rounded-2xl mt-2">
                            <div>
                              <span className="font-bold text-zinc-500 block text-[10px]">DOCUMENT TYPE</span>
                              <span className="font-black text-zinc-800 text-xs">{labour.documentType}</span>
                            </div>
                            <button
                              onClick={() => setSelectedDocUrl(labour.documentUrl)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 border border-black rounded-xl bg-white text-[10px] font-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
                            >
                              <Eye className="h-3 w-3" />
                              <span>{t[lang].viewDoc}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Approval CTA buttons */}
                    <div className="mt-4 pt-4 border-t border-dashed border-zinc-200 flex gap-3">
                      <button
                        onClick={() => handleApprovalAction(labour._id, "rejected")}
                        className="w-1/3 py-3 border-2 border-black rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-black text-xs shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] cursor-pointer inline-flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="h-4.5 w-4.5" />
                        <span>{t[lang].reject}</span>
                      </button>

                      <button
                        onClick={() => handleApprovalAction(labour._id, "approved")}
                        className="w-2/3 py-3 border-2 border-black rounded-2xl bg-brand-green text-white font-black text-xs shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] cursor-pointer inline-flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle className="h-4.5 w-4.5" />
                        <span>{t[lang].approve}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MANAGE LABOURS LIST */}
        {!loading && activeTab === "labours" && (
          <div className="space-y-6">
            {/* Search filter input */}
            <div className="flex items-center gap-3 w-full max-w-md bg-white border-2 border-black rounded-2xl px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Search className="h-5 w-5 text-zinc-400 shrink-0" />
              <input
                type="text"
                placeholder="Search labours by name, mobile, category..."
                value={labourSearch}
                onChange={(e) => setLabourSearch(e.target.value)}
                className="w-full bg-transparent focus:outline-none font-bold text-sm"
              />
            </div>

            {/* Table layout (Neobrutalist cards or clean responsive table) */}
            <div className="bg-white border-2 border-black rounded-3xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-zinc-100 border-b-2 border-black text-xs font-black uppercase text-zinc-650">
                      <th className="p-4">{t[lang].photo}</th>
                      <th className="p-4">{t[lang].name}</th>
                      <th className="p-4">{t[lang].mobile}</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Approval Status</th>
                      <th className="p-4">Block Status</th>
                      <th className="p-4 text-right">{t[lang].actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLabours.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-zinc-400 font-bold italic">{t[lang].noRecords}</td>
                      </tr>
                    ) : (
                      filteredLabours.map((labour) => {
                        const userStatus = labour.userId?.status || "active";
                        const isBlocked = userStatus === "blocked";
                        
                        return (
                          <tr key={labour._id} className="border-b border-zinc-200 hover:bg-zinc-50 font-bold text-zinc-800 transition-colors">
                            <td className="p-4">
                              <div className="h-10 w-10 rounded-full border border-black overflow-hidden bg-zinc-100">
                                {labour.profileImage ? (
                                  <img src={labour.profileImage} alt={labour.fullName} className="h-full w-full object-cover" />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center text-xs text-zinc-400">?</div>
                                )}
                              </div>
                            </td>
                            <td className="p-4 font-black text-zinc-955">
                              <span>{labour.fullName}</span>
                              <span className="text-[10px] text-zinc-400 block font-bold mt-0.5">Age: {labour.age} | {labour.gender}</span>
                            </td>
                            <td className="p-4">{labour.mobile}</td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 border border-black rounded text-[10px] bg-zinc-50">{labour.categoryId?.name || "N/A"}</span>
                            </td>
                            <td className="p-4">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[10px] font-black border border-black",
                                labour.adminApprovalStatus === "approved" && "bg-emerald-100 text-emerald-850",
                                labour.adminApprovalStatus === "pending" && "bg-orange-100 text-orange-850",
                                labour.adminApprovalStatus === "rejected" && "bg-rose-100 text-rose-850"
                              )}>
                                {labour.adminApprovalStatus.toUpperCase()}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[10px] font-black border border-black",
                                isBlocked ? "bg-rose-100 text-rose-850" : "bg-emerald-100 text-emerald-850"
                              )}>
                                {userStatus.toUpperCase()}
                              </span>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => setSelectedLabour(labour)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 border border-black rounded-lg bg-zinc-50 text-[10px] font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
                              >
                                <Eye className="h-3 w-3" />
                                <span>Details</span>
                              </button>

                              <button
                                onClick={() => handleBlockUserAction(labour.userId?._id || "", userStatus, "labour", labour._id)}
                                className={cn(
                                  "inline-flex items-center gap-1 px-2.5 py-1 border border-black rounded-lg text-[10px] font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 cursor-pointer",
                                  isBlocked ? "bg-emerald-100 text-emerald-850" : "bg-rose-50 text-rose-700"
                                )}
                              >
                                {isBlocked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                                <span>{isBlocked ? t[lang].unblock : t[lang].block}</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MANAGE EMPLOYERS LIST */}
        {!loading && activeTab === "employers" && (
          <div className="space-y-6">
            {/* Search filter input */}
            <div className="flex items-center gap-3 w-full max-w-md bg-white border-2 border-black rounded-2xl px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Search className="h-5 w-5 text-zinc-400 shrink-0" />
              <input
                type="text"
                placeholder="Search employers by company, contact person, mobile..."
                value={employerSearch}
                onChange={(e) => setEmployerSearch(e.target.value)}
                className="w-full bg-transparent focus:outline-none font-bold text-sm"
              />
            </div>

            {/* Table list */}
            <div className="bg-white border-2 border-black rounded-3xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-zinc-100 border-b-2 border-black text-xs font-black uppercase text-zinc-650">
                      <th className="p-4">Company Name</th>
                      <th className="p-4">Contact Person</th>
                      <th className="p-4">{t[lang].mobile}</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Credits</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">{t[lang].actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-zinc-400 font-bold italic">{t[lang].noRecords}</td>
                      </tr>
                    ) : (
                      filteredEmployers.map((employer) => {
                        const userStatus = employer.userId?.status || employer.status || "active";
                        const isBlocked = userStatus === "blocked";
                        
                        return (
                          <tr key={employer._id} className="border-b border-zinc-200 hover:bg-zinc-50 font-bold text-zinc-800 transition-colors">
                            <td className="p-4 font-black text-zinc-955">
                              <span>{employer.companyName}</span>
                              {employer.companyType && (
                                <span className="text-[9px] text-zinc-400 block font-bold">{employer.companyType}</span>
                              )}
                            </td>
                            <td className="p-4">{employer.contactPerson}</td>
                            <td className="p-4">{employer.mobile}</td>
                            <td className="p-4">{employer.email || "N/A"}</td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 border border-black rounded text-[10px] bg-yellow-50">{employer.contactCredits}</span>
                            </td>
                            <td className="p-4">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[10px] font-black border border-black",
                                isBlocked ? "bg-rose-100 text-rose-850" : "bg-emerald-100 text-emerald-850"
                              )}>
                                {userStatus.toUpperCase()}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleBlockUserAction(employer.userId?._id || "", userStatus, "employer", employer._id)}
                                className={cn(
                                  "inline-flex items-center gap-1 px-2.5 py-1 border border-black rounded-lg text-[10px] font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 cursor-pointer",
                                  isBlocked ? "bg-emerald-100 text-emerald-850" : "bg-rose-50 text-rose-700"
                                )}
                              >
                                {isBlocked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                                <span>{isBlocked ? t[lang].unblock : t[lang].block}</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MANAGE ADMINS LIST */}
        {!loading && activeTab === "admins" && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-3xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-zinc-100 border-b-2 border-black text-xs font-black uppercase text-zinc-650">
                      <th className="p-4">Name</th>
                      <th className="p-4">Username</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-zinc-400 font-bold italic">{t[lang].noRecords}</td>
                      </tr>
                    ) : (
                      admins.map((adminItem) => {
                        const isActive = adminItem.status === "active";
                        return (
                          <tr key={adminItem._id} className="border-b border-zinc-200 hover:bg-zinc-50 font-bold text-zinc-800 transition-colors">
                            <td className="p-4 font-black text-zinc-955">{adminItem.name}</td>
                            <td className="p-4">{adminItem.username}</td>
                            <td className="p-4">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[10px] font-black border border-black",
                                isActive ? "bg-emerald-100 text-emerald-850" : "bg-rose-100 text-rose-850"
                              )}>
                                {adminItem.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="p-4 text-zinc-500 text-xs">
                              {new Date(adminItem.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* --- MODAL 1: LABOUR DETAIL VIEW (OVERLAY) --- */}
      {selectedLabour && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black rounded-3xl w-full max-w-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto animate-zoom-in">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b-2 border-dashed border-zinc-200 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full border-2 border-black overflow-hidden">
                  <img src={selectedLabour.profileImage} alt={selectedLabour.fullName} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl text-zinc-955">{selectedLabour.fullName}</h3>
                  <span className="text-xs text-zinc-400 font-bold">{selectedLabour.categoryId?.name}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedLabour(null)}
                className="px-3.5 py-1 border-2 border-black rounded-xl bg-zinc-50 font-black text-xs active:translate-y-0.5 cursor-pointer"
              >
                {t[lang].close}
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-bold text-zinc-700">
              <div className="space-y-3">
                <p><span className="text-zinc-400">Mobile:</span> {selectedLabour.mobile}</p>
                <p><span className="text-zinc-400">Age / Gender:</span> {selectedLabour.age} / {selectedLabour.gender}</p>
                <p><span className="text-zinc-400">Expected Rate:</span> <span className="text-brand-green text-sm font-black">₹{selectedLabour.chargeAmount} / {selectedLabour.chargeType}</span></p>
                <p><span className="text-zinc-400">Employment Type:</span> {selectedLabour.workType}</p>
                
                <div>
                  <span className="text-zinc-400 block mb-1">Weekly Availability:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLabour.availability && Object.entries(selectedLabour.availability).map(([day, val]) => (
                      <span key={day} className={cn(
                        "px-2 py-0.5 border border-black rounded-sm capitalize text-[9px]",
                        val ? "bg-brand-green text-white" : "bg-zinc-50 text-zinc-400"
                      )}>
                        {day.substring(0, 3)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p><span className="text-zinc-400 block mb-0.5">Permanent Address:</span> <span className="text-zinc-950 block bg-zinc-50 p-2 border border-black rounded-lg">{selectedLabour.homeAddress}</span></p>
                <p><span className="text-zinc-400 block mb-0.5">Current Address:</span> <span className="text-zinc-950 block bg-zinc-50 p-2 border border-black rounded-lg">{selectedLabour.currentLocation}</span></p>
                <p><span className="text-zinc-400 block mb-0.5">Preferred Work Location:</span> <span className="text-brand-green block bg-zinc-50 p-2 border border-black rounded-lg">{selectedLabour.preferredWorkLocation}</span></p>
              </div>

              <div className="sm:col-span-2 space-y-2 border-t-2 border-dashed border-zinc-150 pt-4">
                <span className="text-zinc-400 block">{t[lang].experience}:</span>
                <p className="p-3 bg-amber-50 border border-black rounded-2xl italic text-zinc-800 leading-normal">{selectedLabour.experience}</p>
                {selectedLabour.additionalInfo && (
                  <p className="text-xs"><span className="text-zinc-400">Additional Info:</span> {selectedLabour.additionalInfo}</p>
                )}
              </div>

              {selectedLabour.documentUrl && (
                <div className="sm:col-span-2 border-t-2 border-dashed border-zinc-150 pt-4">
                  <div className="flex items-center justify-between p-3 border-2 border-black border-dashed bg-blue-50/50 rounded-2xl">
                    <div>
                      <span className="text-zinc-400 block text-[9px]">ID DOCUMENT ({selectedLabour.documentType})</span>
                      <span className="text-zinc-800 text-xs">Identity document uploaded</span>
                    </div>
                    <button
                      onClick={() => setSelectedDocUrl(selectedLabour.documentUrl)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 border border-black rounded-xl bg-white text-[10px] font-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
                    >
                      <Eye className="h-3 w-3" />
                      <span>{t[lang].viewDoc}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick approval toggles in modal */}
            {selectedLabour.adminApprovalStatus === "pending" && (
              <div className="mt-6 pt-4 border-t-2 border-black flex gap-3">
                <button
                  onClick={() => handleApprovalAction(selectedLabour._id, "rejected")}
                  className="w-1/3 py-3 border-2 border-black rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 cursor-pointer"
                >
                  {t[lang].reject}
                </button>

                <button
                  onClick={() => handleApprovalAction(selectedLabour._id, "approved")}
                  className="w-2/3 py-3 border-2 border-black rounded-2xl bg-brand-green text-white font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 cursor-pointer"
                >
                  {t[lang].approve}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- MODAL 2: DOCUMENT PREVIEW MODAL --- */}
      {selectedDocUrl && (
        <div className="fixed inset-0 z-55 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black rounded-3xl w-full max-w-4xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between max-h-[90vh]">
            <div className="flex justify-between items-center pb-3 border-b-2 border-black mb-4">
              <span className="font-heading font-black text-base text-zinc-955">Registration Identity Document Review</span>
              <button
                onClick={() => setSelectedDocUrl(null)}
                className="px-3.5 py-1.5 border-2 border-black rounded-xl bg-zinc-50 font-black text-xs active:translate-y-0.5 cursor-pointer"
              >
                {t[lang].close}
              </button>
            </div>

            <div className="flex-grow overflow-auto flex justify-center items-center bg-zinc-100 border-2 border-black rounded-2xl p-4 min-h-[50vh]">
              {selectedDocUrl.toLowerCase().endsWith(".pdf") ? (
                <iframe src={selectedDocUrl} className="w-full h-full min-h-[55vh]" title="Document PDF Viewer" />
              ) : (
                <img src={selectedDocUrl} alt="Labour ID Document" className="max-h-[60vh] object-contain border border-zinc-300 shadow" />
              )}
            </div>

            <div className="mt-4 pt-3 flex justify-between items-center text-xs font-bold text-zinc-400">
              <a
                href={selectedDocUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 underline text-brand-green hover:text-brand-green-hover"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <span>Review image clarity and details carefully.</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
